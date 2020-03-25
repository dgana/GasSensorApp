import React from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';

import BackIcon from '~/component/BackIcon';
import ErrorMessage from '~/component/ErrorMessage';
import TextInput from '~/component/TextInput';
import Button from '~/component/Button';
import LinkText from '~/component/LinkText';

import {AuthContext} from '~/App';

function SignUpScreen({navigation}) {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');
  const [hidePassword, setHidePassword] = React.useState(true);

  const {signUp, buttonLoading} = React.useContext(AuthContext);

  const setPasswordVisibility = () => {
    setHidePassword(state => !state);
  };

  const onPressButton = () =>
    signUp({name, email, password, setErrorMessage, navigation});

  const onPressLinkText = () => navigation.navigate('SignIn');

  return (
    <View style={styles.container}>
      <BackIcon onPress={() => navigation.goBack()} />
      <View style={styles.headerContainer}>
        <Text style={styles.greeting}>Hello, Sign up to get started!</Text>
      </View>
      <ErrorMessage
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
      />
      <View style={styles.form}>
        <TextInput label="full name" value={name} onChangeText={setName} />
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
      <Button
        onPress={onPressButton}
        isLoading={buttonLoading}
        text="Sign Up"
      />
      <LinkText
        onPress={onPressLinkText}
        description="Already have an account?"
        linkText="Log In"
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
    marginHorizontal: 30,
  },
  greeting: {
    marginTop: 32,
    fontSize: 18,
  },
  form: {
    marginHorizontal: 30,
  },
  imageFooter: {
    marginLeft: -50,
  },
});

export default SignUpScreen;
