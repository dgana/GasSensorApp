import React from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';

import BackIcon from '~/component/BackIcon';
import ErrorMessage from '~/component/ErrorMessage';
import TextInput from '~/component/TextInput';
import Button from '~/component/Button';
import LinkText from '~/component/LinkText';

import {AuthContext} from '~/App';

function SignInScreen({navigation}) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');
  const [hidePassword, setHidePassword] = React.useState(true);

  const {signIn, buttonLoading} = React.useContext(AuthContext);

  const setPasswordVisibility = () => {
    setHidePassword(state => !state);
  };

  const onPressButton = () => signIn({email, password, setErrorMessage});

  return (
    <View style={styles.container}>
      <BackIcon onPress={() => navigation.goBack()} />

      <View style={styles.headerContainer}>
        <Text style={styles.greeting}>Hello, Welcome back!</Text>
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
        <TextInput
          label="password"
          value={password}
          onChangeText={setPassword}
          isPassword
          isHidden={hidePassword}
          onPressHide={setPasswordVisibility}
        />
      </View>
      <Button onPress={onPressButton} loading={buttonLoading} text="Sign In" />
      <LinkText
        onPress={() => navigation.navigate('SignUp')}
        description="New to GasSensorApp?"
        linkText="Sign Up"
      />
      <LinkText
        style={styles.linkText}
        onPress={() => navigation.navigate('ForgotPassword')}
        linkText="Forgot your password?"
      />
      <Image
        style={styles.imageFooter}
        source={require('~/assets/images/factory3.png')}
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
    marginHorizontal: 30,
  },
  greeting: {
    marginTop: 32,
    fontSize: 18,
  },
  form: {
    marginBottom: 48,
    marginHorizontal: 30,
  },
  imageFooter: {
    position: 'absolute',
    bottom: 0,
    marginLeft: -50,
  },
  linkText: {
    marginTop: 8,
  },
});

export default SignInScreen;
