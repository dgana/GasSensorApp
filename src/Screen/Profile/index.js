import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {clearAll} from '~/utils';
import {AuthContext} from '~/App';

const Profile = () => {
  const {signOut} = React.useContext(AuthContext);

  return (
    <View style={styles.container}>
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
