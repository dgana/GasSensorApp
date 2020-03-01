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

function SignUpScreen({navigation}) {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');

  const {signUp} = React.useContext(AuthContext);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.greeting}>Hello, Sign up to get started!</Text>
      </View>
      <View style={styles.errorMessage}>
        {!!errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
      </View>
      <View style={styles.form}>
        <View>
          <Text style={styles.inputTitle}>Full Name</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            autoCapitalize="none"
          />
        </View>
        <View style={styles.marginTop}>
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
        onPress={() => signUp({name, email, password, setErrorMessage})}>
        <Text style={styles.buttonLink}>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.linkButton}
        onPress={() => navigation.goBack()}>
        <Text style={styles.linkText}>
          Already have an account? <Text style={styles.link}>Login</Text>
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
  imageFooter: {
    resizeMode: 'stretch',
    height: 280,
    marginLeft: -50,
    position: 'relative',
  },
  headerContainer: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 35,
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
    backgroundColor: '#E9446A',
    borderRadius: 4,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
  },
  marginTop: {
    marginTop: 32,
  },
  buttonLink: {
    color: '#FFF',
    fontWeight: '500',
  },
  linkButton: {
    alignSelf: 'center',
    marginTop: 32,
  },
  linkText: {
    color: '#414959',
    fontSize: 13,
  },
  link: {
    fontWeight: '500',
    color: '#E9446A',
  },
});

export default SignUpScreen;
