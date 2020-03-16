/* eslint-disable eslint-comments/no-unlimited-disable */
import React from 'react';
import {TextInput, Text, View, StyleSheet, Image} from 'react-native';

import BackIcon from '~/component/BackIcon';
import ErrorMessage from '~/component/ErrorMessage';
import Button from '~/component/Button';
import LinkText from '~/component/LinkText';
import ArrayMap from '~/component/ArrayMap';

import {AuthContext} from '~/App';

const initialCodeState = {1: '', 2: '', 3: '', 4: '', 5: '', 6: ''};

function PhoneVerificationScreen({navigation}) {
  const [code, setCode] = React.useState(initialCodeState);
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
    if (Object.values(code).filter(x => x !== '').length === 6) {
      phoneVerification({code, setErrorMessage, phone});
    }
    // eslint-disable-next-line
  }, [code]);

  const onPressButton = () => phoneVerification({code, setErrorMessage, phone});
  const onPressLink = () => navigation.navigate('SignIn');
  const onKeyPress = (e, i) => {
    if (e.nativeEvent.key === 'Backspace') {
      setCode(state => ({...state, [i + 1]: ''}));
      mapInputCode[i].back.current.focus();
    }
  };
  const onChangeText = (e, i) => {
    setCode(state => ({...state, [i + 1]: e}));
    if (e) {
      mapInputCode[i].next.current.focus();
    }
  };

  const mapInputCode = [
    {
      ref: first,
      back: first,
      next: second,
    },
    {
      ref: second,
      back: first,
      next: third,
    },
    {
      ref: third,
      back: second,
      next: fourth,
    },
    {
      ref: fourth,
      back: third,
      next: fifth,
    },
    {
      ref: fifth,
      back: fourth,
      next: sixth,
    },
    {
      ref: sixth,
      back: fifth,
      next: sixth,
    },
  ];

  return (
    <View style={styles.container}>
      <BackIcon onPress={() => navigation.goBack()} />
      <View style={styles.headerContainer}>
        <Text style={styles.greeting}>Phone Verification</Text>
      </View>
      <View style={styles.descriptionContainer}>
        <Text style={styles.description}>
          Enter 6 digit code sent to your phone
        </Text>
      </View>

      <ErrorMessage
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
      />

      <View style={styles.form}>
        <View>
          <Text style={styles.inputTitle}>Verification Code</Text>
          <View style={styles.phoneContainer}>
            <ArrayMap data={mapInputCode}>
              {(x, i) => (
                <TextInput
                  ref={x.ref}
                  style={styles.inputCode}
                  value={code[i + 1]}
                  maxLength={1}
                  keyboardType={'numeric'}
                  onKeyPress={e => onKeyPress(e, i)}
                  onChangeText={e => onChangeText(e, i)}
                />
              )}
            </ArrayMap>
          </View>
        </View>
      </View>
      <Button onPress={onPressButton} loading={buttonLoading} text="Verify" />
      <LinkText
        onPress={onPressLink}
        description="Already have an account?"
        linkText="Sign In"
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
    marginBottom: 70,
    marginHorizontal: 30,
  },
  inputTitle: {
    color: '#8A8F9E',
    fontSize: 10,
    textTransform: 'uppercase',
    marginBottom: 12,
  },
  phoneContainer: {
    flexDirection: 'row',
  },
  inputCode: {
    flex: 1,
    borderBottomColor: '#8A8F9E',
    borderBottomWidth: StyleSheet.hairlineWidth,
    height: 40,
    fontSize: 18,
    color: '#161F3D',
    marginRight: 10,
    textAlign: 'center',
  },
  imageFooter: {
    marginLeft: -50,
  },
});

export default PhoneVerificationScreen;
