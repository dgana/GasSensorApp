import React from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';

import BackIcon from '~/component/BackIcon';
import ErrorMessage from '~/component/ErrorMessage';
import TextInput from '~/component/TextInput';
import Button from '~/component/Button';
import LinkText from '~/component/LinkText';
import theme from '~/utils/theme';

import {AuthContext} from '~/App';

function ForgotPasswordScreen({navigation}) {
  const [email, setEmail] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');

  const {resetPassword, buttonLoading} = React.useContext(AuthContext);

  const onPressButton = () =>
    resetPassword({email, setErrorMessage, navigation});

  return (
    <View style={styles.container}>
      <BackIcon onPress={() => navigation.goBack()} />
      <View style={styles.headerContainer}>
        <Text style={styles.greeting}>Forgot your password?</Text>
      </View>
      <View style={styles.descriptionContainer}>
        <Text style={styles.description}>
          Enter your email address to reset password
        </Text>
      </View>
      <ErrorMessage
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
      />
      <View style={styles.form}>
        <TextInput
          label="email address"
          value={email}
          onChangeText={setEmail}
        />
      </View>
      <Button
        style={styles.button}
        onPress={onPressButton}
        loading={buttonLoading}
        text="Reset Password"
      />
      <LinkText
        onPress={() => navigation.navigate('SignIn')}
        description="Remember your password?"
        linkText="Sign In"
      />
      <Image
        style={styles.imageFooter}
        source={require('~/assets/images/factory2.png')}
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
    marginTop: 80,
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
    marginBottom: 48,
    marginHorizontal: 30,
  },
  button: {
    backgroundColor: theme.secondary,
  },
  imageFooter: {
    marginLeft: -50,
  },
});

export default ForgotPasswordScreen;
