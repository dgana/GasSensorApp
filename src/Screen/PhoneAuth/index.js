import React from 'react';
import {
  TextInput,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {AuthContext} from '~/App';

function PhoneAuthScreen({navigation}) {
  const [countryCode] = React.useState('+62');
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');

  const {phoneLogin, buttonLoading} = React.useContext(AuthContext);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.arrow}
        onPress={() => navigation.goBack()}>
        <Icon name="arrow-left" color="#a0a0a0" size={30} />
      </TouchableOpacity>
      <View style={styles.headerContainer}>
        <Text style={styles.greeting}>Sign in with phone number</Text>
      </View>
      <View style={styles.descriptionContainer}>
        <Text style={styles.description}>Enter your phone number</Text>
      </View>

      <View style={styles.errorMessage}>
        {!!errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
      </View>
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
      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          phoneLogin({
            phoneNumber: countryCode + phoneNumber,
            setErrorMessage,
            navigation,
          })
        }>
        <Text style={styles.signIn}>
          {buttonLoading ? '' : 'Get verification code'}
        </Text>
      </TouchableOpacity>
      {buttonLoading && (
        <View style={styles.loadingButton}>
          <ActivityIndicator
            animating={buttonLoading}
            size="large"
            color="white"
          />
        </View>
      )}
      <TouchableOpacity
        style={styles.signUpButton}
        onPress={() => navigation.navigate('SignIn')}>
        <Text style={styles.signUpText}>
          Already have an account?{' '}
          <Text style={styles.signUpLink}>Sign In</Text>
        </Text>
      </TouchableOpacity>

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
  arrow: {
    marginHorizontal: 26,
    marginTop: 60,
  },
  loadingButton: {
    position: 'absolute',
    top: '59%',
    right: 0,
    left: 0,
  },
  imageFooter: {
    resizeMode: 'stretch',
    height: 210,
    marginLeft: -50,
  },
  headerContainer: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 130,
    marginHorizontal: 30,
  },
  descriptionContainer: {
    paddingTop: 12,
    marginHorizontal: 30,
  },
  greeting: {
    marginTop: 32,
    fontSize: 18,
    fontWeight: '400',
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
  },
  errorMessage: {
    height: 72,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 30,
  },
  error: {
    color: '#E9446A',
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center',
  },
  form: {
    marginBottom: 70,
    marginHorizontal: 30,
  },
  inputTitle: {
    color: '#8A8F9E',
    fontSize: 10,
    textTransform: 'uppercase',
    marginBottom: 12,
  },
  inputCountryCode: {
    flex: 1,
    borderBottomColor: '#8A8F9E',
    borderBottomWidth: StyleSheet.hairlineWidth,
    height: 40,
    fontSize: 15,
    color: '#161F3D',
    marginRight: 12,
    backgroundColor: '#fafafa',
    textAlign: 'center',
  },
  inputNumber: {
    flex: 3,
    borderBottomColor: '#8A8F9E',
    borderBottomWidth: StyleSheet.hairlineWidth,
    height: 40,
    fontSize: 15,
    color: '#161F3D',
  },
  button: {
    marginHorizontal: 30,
    backgroundColor: '#4286F4',
    borderRadius: 4,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
  },
  signIn: {
    color: '#FFF',
    fontWeight: '500',
  },
  signUpButton: {
    alignSelf: 'center',
    marginTop: 32,
  },
  signUpText: {
    color: '#414959',
    fontSize: 13,
    marginBottom: 30,
  },
  signUpLink: {
    fontWeight: '500',
    color: '#5588EE',
  },
  phoneContainer: {
    flex: 1,
    flexDirection: 'row',
  },
});

export default PhoneAuthScreen;
