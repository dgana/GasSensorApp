import React from 'react';
import {Text, View, TouchableOpacity, StyleSheet, Image} from 'react-native';
import IconAnt from 'react-native-vector-icons/AntDesign';
import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons';
import {AuthContext} from '~/App';

function WelcomeScreen({navigation}) {
  const {googleLogin} = React.useContext(AuthContext);
  return (
    <View style={styles.container}>
      <Image
        style={styles.imageContainer}
        source={require('~/assets/images/industry.png')}
      />
      <View style={styles.header}>
        <Image
          style={styles.imageHeader}
          source={require('~/assets/images/GasSensorLogo.png')}
        />
        <Text style={styles.newText}>Welcome to,</Text>
        <Text style={styles.newText}>Gas Sensor App</Text>
      </View>
      <View style={styles.opacityContainer} />
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          // disabled={true}
          style={{...styles.button, ...styles.googleColor}}
          onPress={() => googleLogin({navigation})}>
          <View style={styles.buttonView}>
            <IconAnt
              name="google"
              color="white"
              size={20}
              style={styles.icon}
            />
            <Text style={styles.text}>Connect with Google</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{...styles.button, ...styles.phoneColor}}
          onPress={() => navigation.navigate('PhoneAuth')}>
          <View style={styles.buttonView}>
            <IconMaterial
              name="phone-in-talk"
              color="white"
              size={20}
              style={styles.icon}
            />
            <Text style={styles.text}>Connect with Phone</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{...styles.button, ...styles.loginColor}}
          onPress={() => navigation.navigate('SignIn')}>
          <Text style={styles.text}>Log In</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.signUpButton}
          onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.signUpText}>
            Dont't have an account?{' '}
            <Text style={styles.signUpLink}>Sign Up</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 100,
    backgroundColor: 'white',
  },
  opacityContainer: {
    position: 'relative',
    height: 280,
    backgroundColor: 'white',
    opacity: 0.85,
    bottom: -330,
  },
  buttonContainer: {
    position: 'relative',
    height: 270,
  },
  imageContainer: {
    position: 'absolute',
    opacity: 0.8,
    top: 100,
    right: -20,
  },
  header: {
    flex: 1,
    alignItems: 'center',
  },
  newText: {
    fontSize: 30,
    top: -80,
    fontWeight: '900',
    fontFamily: 'Avenir',
    color: '#323232',
  },
  icon: {
    marginRight: 8,
  },
  buttonView: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  imageHeader: {
    flex: 1,
    alignSelf: 'center',
    resizeMode: 'contain',
    opacity: 0.8,
    position: 'relative',
    top: 180,
    width: 150,
  },
  button: {
    marginTop: 12,
    marginHorizontal: 30,
    borderRadius: 8,
    height: 52,
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
  },
  googleColor: {
    backgroundColor: '#176BEF',
  },
  phoneColor: {
    backgroundColor: '#4286F4',
  },
  loginColor: {
    backgroundColor: '#db4537',
  },
  text: {
    color: '#FFF',
    fontWeight: '800',
    fontFamily: 'Avenir',
  },
  signUpButton: {
    alignSelf: 'center',
    marginTop: 26,
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

export default WelcomeScreen;
