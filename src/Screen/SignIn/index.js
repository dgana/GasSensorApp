import React from 'react';
import {
  TextInput,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import {AuthContext} from '~/App';

function SignInScreen({navigation}) {
  const navigationOptions = {
    header: null,
  };
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');

  const {signIn} = React.useContext(AuthContext);

  return (
    <View style={styles.container}>
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
            secureTextEntry
            autoCapitalize="none"
          />
        </View>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => signIn({email, password, setErrorMessage})}>
        <Text style={styles.signIn}>Sign In</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.signUpButton}
        onPress={() => navigation.navigate('SignUp')}>
        <Text style={styles.signUpText}>
          New to GasSensorApp? <Text style={styles.signUpLink}>Sign Up</Text>
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
  imageFooter: {
    resizeMode: 'stretch',
    height: 280,
    marginLeft: -50,
  },
  headerContainer: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 90,
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
  signUpText: {
    color: '#414959',
    fontSize: 13,
    marginBottom: 30,
  },
  signUpLink: {
    fontWeight: '500',
    color: '#5588EE',
  },
});

export default SignInScreen;
