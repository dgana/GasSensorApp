import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {clearAll} from '~/utils';
import {AuthContext} from '~/App';

const Profile = () => {
  const {signOut, userInfo} = React.useContext(AuthContext);
  const {name, email} = userInfo;

  return (
    <View style={styles.container}>
      <Text>Hi, {name}</Text>
      <Text>{email}</Text>
      <TouchableOpacity
        onPress={() => {
          clearAll();
          signOut();
        }}>
        <Text>Log out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Profile;
