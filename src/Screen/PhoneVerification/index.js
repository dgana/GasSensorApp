/* eslint-disable eslint-comments/no-unlimited-disable */
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

function PhoneVerificationScreen({navigation}) {
  const [code, setCode] = React.useState({
    1: undefined,
    2: undefined,
    3: undefined,
    4: undefined,
    5: undefined,
    6: undefined,
  });
  const [errorMessage, setErrorMessage] = React.useState('');

  const {phoneVerification, buttonLoading, phone} = React.useContext(
    AuthContext,
  );

  const first = React.useRef(null);
  const second = React.useRef(null);
  const third = React.useRef(null);
  const fourth = React.useRef(null);
  const fifth = React.useRef(null);
  const sixth = React.useRef(null);

  React.useEffect(() => {
    if (Object.values(code).filter(x => x >= 0).length === 6) {
      phoneVerification({code, setErrorMessage, phone});
    }
    // eslint-disable-next-line
  }, [code]);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.arrow}
        onPress={() => navigation.goBack()}>
        <Icon name="arrow-left" color="#a0a0a0" size={30} />
      </TouchableOpacity>
      <View style={styles.headerContainer}>
        <Text style={styles.greeting}>Phone Verification</Text>
      </View>
      <View style={styles.descriptionContainer}>
        <Text style={styles.description}>
          Enter 6 digit code sent to your phone
        </Text>
      </View>

      <View style={styles.errorMessage}>
        {!!errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
      </View>
      <View style={styles.form}>
        <View>
          <Text style={styles.inputTitle}>Verification Code</Text>
          <View style={styles.phoneContainer}>
            <TextInput
              ref={first}
              style={styles.inputCode}
              value={code[1]}
              maxLength={1}
              onChangeText={e => {
                if (e) {
                  second.current.focus();
                } else {
                  first.current.focus();
                }
                setCode(state => ({...state, 1: e}));
              }}
              keyboardType={'numeric'}
            />
            <TextInput
              ref={second}
              style={styles.inputCode}
              value={code[2]}
              maxLength={1}
              onChangeText={e => {
                if (e) {
                  third.current.focus();
                } else {
                  first.current.focus();
                }
                setCode(state => ({...state, 2: e}));
              }}
              keyboardType={'numeric'}
            />
            <TextInput
              ref={third}
              style={styles.inputCode}
              value={code[3]}
              maxLength={1}
              onChangeText={e => {
                if (e) {
                  fourth.current.focus();
                } else {
                  second.current.focus();
                }
                setCode(state => ({...state, 3: e}));
              }}
              keyboardType={'numeric'}
            />
            <TextInput
              ref={fourth}
              style={styles.inputCode}
              value={code[4]}
              maxLength={1}
              onChangeText={e => {
                if (e) {
                  fifth.current.focus();
                } else {
                  third.current.focus();
                }
                setCode(state => ({...state, 4: e}));
              }}
              keyboardType={'numeric'}
            />
            <TextInput
              ref={fifth}
              style={styles.inputCode}
              value={code[5]}
              maxLength={1}
              onChangeText={e => {
                if (e) {
                  sixth.current.focus();
                } else {
                  fourth.current.focus();
                }
                setCode(state => ({...state, 5: e}));
              }}
              keyboardType={'numeric'}
            />
            <TextInput
              ref={sixth}
              style={styles.inputCode}
              value={code[6]}
              maxLength={1}
              onChangeText={async e => {
                if (e) {
                  // sixth.current.focus();
                } else {
                  fifth.current.focus();
                }
                setCode(state => ({...state, 6: e}));
              }}
              keyboardType={'numeric'}
            />
          </View>
        </View>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => phoneVerification({code, setErrorMessage, phone})}>
        <Text style={styles.signIn}>{buttonLoading ? '' : 'Verify'}</Text>
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
    marginTop: 120,
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
  inputCode: {
    flex: 1,
    borderBottomColor: '#8A8F9E',
    borderBottomWidth: StyleSheet.hairlineWidth,
    height: 40,
    fontSize: 18,
    color: '#161F3D',
    marginRight: 12,
    textAlign: 'center',
  },
  button: {
    marginHorizontal: 30,
    backgroundColor: '#E9446A',
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

export default PhoneVerificationScreen;
