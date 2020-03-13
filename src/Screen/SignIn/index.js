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

function SignInScreen({navigation}) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');
  const [hidePassword, setHidePassword] = React.useState(true);

  const {signIn, buttonLoading} = React.useContext(AuthContext);

  const setPasswordVisibility = () => {
    setHidePassword(state => !state);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.arrow}
        onPress={() => navigation.goBack()}>
        <Icon name="arrow-left" color="#a0a0a0" size={30} />
      </TouchableOpacity>

      <View style={styles.headerContainer}>
        <Text style={styles.greeting}>Hello, Welcome back!</Text>
      </View>

      <View style={styles.errorMessage}>
        {!!errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
      </View>
      <View style={styles.form}>
        <View>
          <Text style={styles.inputTitle}>Email Address</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
          />
        </View>
        <View style={styles.marginTop}>
          <Text style={styles.inputTitle}>Password</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={hidePassword}
            autoCapitalize="none"
          />
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.touchableButton}
            onPress={setPasswordVisibility}>
            {hidePassword ? (
              <Icon
                name="eye-off"
                color="#a0a0a0"
                size={24}
                style={styles.hidePasswordIcon}
              />
            ) : (
              <Icon
                name="eye"
                color="#a0a0a0"
                size={24}
                style={styles.hidePasswordIcon}
              />
            )}
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => signIn({email, password, setErrorMessage})}>
          <Text style={styles.signIn}>{buttonLoading ? '' : 'Sign In'}</Text>
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
      </View>
      <TouchableOpacity
        style={styles.signUpButton}
        onPress={() => navigation.navigate('SignUp')}>
        <Text style={styles.signUpText}>
          New to GasSensorApp? <Text style={styles.signUpLink}>Sign Up</Text>
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.forgotPasswordButton}
        onPress={() => navigation.navigate('ForgotPassword')}>
        <Text style={styles.signUpText}>
          <Text style={styles.forgotPasswordLink}>Forgot your password?</Text>
        </Text>
      </TouchableOpacity>

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
  arrow: {
    marginHorizontal: 26,
    marginTop: 60,
  },
  loadingButton: {
    position: 'absolute',
    top: 8,
    right: 0,
    left: 0,
  },
  imageFooter: {
    resizeMode: 'stretch',
    height: 250,
    marginLeft: -50,
  },
  headerContainer: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 0,
    marginHorizontal: 30,
  },
  greeting: {
    marginTop: 32,
    fontSize: 18,
    fontWeight: '400',
    textAlign: 'center',
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
    marginBottom: 48,
    marginHorizontal: 30,
  },
  inputTitle: {
    color: '#8A8F9E',
    fontSize: 10,
    textTransform: 'uppercase',
  },
  input: {
    borderBottomColor: '#8A8F9E',
    borderBottomWidth: StyleSheet.hairlineWidth,
    height: 40,
    fontSize: 15,
    color: '#161F3D',
  },
  button: {
    marginHorizontal: 30,
    backgroundColor: '#5588EE',
    borderRadius: 4,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
  },
  marginTop: {
    marginTop: 32,
  },
  signIn: {
    color: '#FFF',
    fontWeight: '500',
  },
  signUpButton: {
    alignSelf: 'center',
    marginTop: 32,
  },
  forgotPasswordButton: {
    alignSelf: 'center',
    marginTop: -20,
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
  forgotPasswordLink: {
    fontWeight: '400',
    color: '#5588EE',
  },
  touchableButton: {
    position: 'absolute',
    right: 3,
    height: 40,
    width: 35,
    padding: 2,
  },
  hidePasswordIcon: {
    marginTop: 12,
  },
});

export default SignInScreen;
