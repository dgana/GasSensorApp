import React from 'react';
import {TextInput, Text, View, StyleSheet, Image} from 'react-native';

import BackIcon from '~/component/BackIcon';
import ErrorMessage from '~/component/ErrorMessage';
import Button from '~/component/Button';
import LinkText from '~/component/LinkText';
import theme from '~/utils/theme';

import {AuthContext} from '~/App';

function PhoneAuthScreen({navigation}) {
  const [countryCode] = React.useState('+62');
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');

  const {phoneLogin, buttonLoading} = React.useContext(AuthContext);

  const onPressButton = () =>
    phoneLogin({
      phoneNumber: countryCode + phoneNumber,
      setErrorMessage,
      navigation,
    });

  return (
    <View style={styles.container}>
      <BackIcon onPress={() => navigation.goBack()} />

      <View style={styles.headerContainer}>
        <Text style={styles.greeting}>Sign in with phone number</Text>
      </View>
      <View style={styles.descriptionContainer}>
        <Text style={styles.description}>Enter your phone number</Text>
      </View>

      <ErrorMessage
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
      />
      <View style={styles.form}>
        <View>
          <Text style={styles.inputTitle}>Phone Number</Text>
          <View style={styles.phoneContainer}>
            <TextInput
              style={styles.inputCountryCode}
              value={countryCode}
              editable={false}
              selectTextOnFocus={false}
            />
            <TextInput
              style={styles.inputNumber}
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              placeholder="8125051234"
              keyboardType={'phone-pad'}
            />
          </View>
        </View>
      </View>
      <Button
        onPress={onPressButton}
        loading={buttonLoading}
        text="Get Verification Code"
      />
      <LinkText
        onPress={() => navigation.navigate('SignIn')}
        description="Already have an account?"
        linkText="Sign In"
      />
      <Image
        style={styles.imageFooter}
        source={require('~/assets/images/factory1.png')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    flexDirection: 'row',
    marginTop: 120,
    marginHorizontal: 30,
  },
  greeting: {
    fontSize: 18,
  },
  descriptionContainer: {
    paddingTop: 12,
    marginHorizontal: 30,
  },
  description: {
    fontSize: 14,
  },
  form: {
    marginBottom: 70,
    marginHorizontal: 30,
  },
  inputTitle: {
    color: theme.gray,
    fontSize: 10,
    textTransform: 'uppercase',
    marginBottom: 12,
  },
  inputCountryCode: {
    flex: 1,
    borderBottomColor: theme.gray,
    borderBottomWidth: StyleSheet.hairlineWidth,
    height: 40,
    fontSize: 15,
    color: theme.black,
    marginRight: 12,
    backgroundColor: theme.lightGray,
    textAlign: 'center',
  },
  inputNumber: {
    flex: 3,
    borderBottomColor: theme.gray,
    borderBottomWidth: StyleSheet.hairlineWidth,
    fontSize: 15,
    color: theme.black,
  },
  phoneContainer: {
    flexDirection: 'row',
  },
  imageFooter: {
    position: 'absolute',
    bottom: 0,
    marginLeft: -50,
  },
});

export default PhoneAuthScreen;
