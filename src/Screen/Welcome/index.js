import React from 'react';
import {Text, View, TouchableOpacity, StyleSheet, Image} from 'react-native';
import IconAnt from 'react-native-vector-icons/AntDesign';
import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons';
import {AuthContext} from '~/App';

import LinkText from '~/component/LinkText';
import Button from '~/component/Button';

import theme from '~/utils/theme';

function WelcomeScreen({navigation}) {
  const {googleLogin} = React.useContext(AuthContext);
  return (
    <View style={styles.container}>
      <Image
        style={styles.imageContainer}
        source={require('~/assets/images/industry.png')}
      />
      <View style={styles.header}>
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
        </Button>
        <Button
          style={[styles.button, styles.phoneColor]}
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
        </Button>
        <Button
          style={styles.button}
          onPress={() => navigation.navigate('SignIn')}>
          <Text style={styles.text}>Log In</Text>
        </Button>
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
  imageContainer: {
    position: 'absolute',
  },
  opacityContainer: {
    position: 'relative',
    height: 300,
    backgroundColor: 'white',
    opacity: 0.7,
    bottom: 0,
  },
  header: {
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
    justifyContent: 'flex-end',
  },
  headerImage: {
    resizeMode: 'contain',
    opacity: 0.8,
    width: 150,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    zIndex: 1,
    width: '100%',
  },
  icon: {
    marginRight: 8,
  },
  buttonView: {
    alignItems: 'center',
    flexDirection: 'row',
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
  loginColor: {
    backgroundColor: '#4286F4',
  },
  text: {
    color: '#FFF',
    fontWeight: '800',
    fontFamily: 'Avenir',
  },
  linkText: {
    marginBottom: 30,
  },
});

export default WelcomeScreen;
