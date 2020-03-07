import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import {AuthContext} from '~/App';

const Profile = () => {
  const {signOut, userInfo} = React.useContext(AuthContext);
  const {name, email, phoneNumber, photoURL} = userInfo;

  const uri = photoURL || 'https://bootdey.com/img/Content/avatar/avatar6.png';

  return (
    <View style={styles.container}>
      <View style={styles.header} />
      <Image style={styles.avatar} source={{uri}} />
      <View style={styles.body}>
        <View style={styles.bodyContent}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.info}>{email}</Text>
          <Text style={styles.info}>{phoneNumber}</Text>

          <TouchableOpacity onPress={signOut} style={styles.buttonContainer}>
            <Text style={styles.logoutText}>Log Out</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 150,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: 'white',
    marginBottom: 10,
    alignSelf: 'center',
    position: 'absolute',
    marginTop: 130,
  },
  body: {
    marginTop: 40,
    height: '100%',
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 50,
    paddingHorizontal: 26,
  },
  name: {
    fontSize: 22,
    color: '#696969',
    fontWeight: '600',
  },
  info: {
    fontSize: 16,
    color: '#4286F4',
    marginTop: 10,
  },
  buttonContainer: {
    marginTop: 30,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
    backgroundColor: '#4286F4',
  },
  logoutText: {
    color: '#FFF',
  },
});

export default Profile;
