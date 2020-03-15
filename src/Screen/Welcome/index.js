import React from 'react';
import {Text, View, StyleSheet, Image, Dimensions} from 'react-native';
import {AuthContext} from '~/App';

import LinkText from '~/component/LinkText';
import Button from '~/component/Button';

import theme from '~/utils/theme';

const window = Dimensions.get('window');

function WelcomeScreen({navigation}) {
  const {googleLogin} = React.useContext(AuthContext);
  return (
    <View style={styles.container}>
      <Image
        style={styles.backgroundImage}
        source={require('~/assets/images/industry.png')}
      />
      <View style={styles.headerContainer}>
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerText}>Welcome to,</Text>
          <Text style={styles.headerText}>Gas Sensor App</Text>
        </View>
        <View style={styles.headerImageContainer}>
          <Image
            style={styles.headerImage}
            source={require('~/assets/images/GasSensorLogo.png')}
          />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          style={[styles.button, styles.googleColor]}
          onPress={() => googleLogin({navigation})}
          text="Connect with Google"
          icon={{name: 'google', color: 'white', size: 18}}
        />
        <Button
          style={[styles.button, styles.phoneColor]}
          onPress={() => navigation.navigate('PhoneAuth')}
          text="Connect with Phone"
          icon={{name: 'phone-in-talk', color: 'white', size: 20}}
        />
        <Button
          style={styles.button}
          onPress={() => navigation.navigate('SignIn')}
          text="Log In"
        />
        <LinkText
          onPress={() => navigation.navigate('SignUp')}
          description="Dont't have an account?"
          linkText="Sign Up"
          style={styles.linkText}
        />
      </View>
      <View style={styles.opacityContainer} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    width: window.width + 24,
    position: 'absolute',
  },
  headerContainer: {
    flex: 1,
    alignItems: 'center',
  },
  headerTextContainer: {
    flex: 0.5,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 30,
    fontWeight: '900',
    fontFamily: 'Avenir',
    color: '#323232',
  },
  headerImageContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  headerImage: {
    resizeMode: 'contain',
    opacity: 0.85,
    width: 150,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    zIndex: 1,
    width: '100%',
  },
  button: {
    marginTop: 12,
    backgroundColor: theme.primary,
  },
  googleColor: {
    backgroundColor: '#FF3E30',
  },
  phoneColor: {
    backgroundColor: '#34C758',
  },
  linkText: {
    marginBottom: 36,
    marginTop: 24,
  },
  opacityContainer: {
    position: 'relative',
    height: 300,
    backgroundColor: 'white',
    opacity: 0.95,
    bottom: 0,
  },
});

export default WelcomeScreen;
