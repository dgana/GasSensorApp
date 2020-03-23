import React from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import firestore from '@react-native-firebase/firestore';
import {useAsyncStorage} from '~/utils';

const DashboardScreen = ({navigation}) => {
  const [data, setData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const {getItem} = useAsyncStorage('userToken');

  React.useEffect(() => {
    const callUserDevices = async () => {
      const userId = await getItem();
      const userPayload = await firestore()
        .collection('users')
        .doc(userId)
        .get();
      const getDevices = await userPayload.get('devices');
      setData(getDevices);
      setIsLoading(false);
    };
    callUserDevices();
  }, [getItem, setData]);

  const loadingStyle = isLoading
    ? {alignItems: 'center', justifyContent: 'center'}
    : {};

  return (
    <View style={[styles.container, loadingStyle]}>
      {isLoading ? (
        <ActivityIndicator animating={isLoading} size="large" color="black" />
      ) : (
        <FlatList
          data={data}
          renderItem={({item}) => (
            <RenderItem navigation={navigation} name={item.name} id={item.id} />
          )}
        />
      )}
      <TouchableOpacity
        onPress={() => navigation.navigate('AddDevice')}
        style={styles.addButton}>
        <Icon name="plus" size={30} color="#5588EE" />
      </TouchableOpacity>
    </View>
  );
};

const RenderItem = ({name, id, navigation}) => {
  const params = {deviceName: name, deviceId: id};
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Details', params)}
      style={styles.item}>
      <Text style={styles.text}>{name}</Text>
      <Text style={styles.subtext}>{id}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    padding: 12,
    borderWidth: 1,
    borderColor: 'rgb(230,230,230)',
  },
  text: {
    fontSize: 18,
    marginBottom: 6,
  },
  subtext: {
    fontSize: 16,
    color: 'rgb(150,150,150)',
  },
  addButton: {
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
    position: 'absolute',
    bottom: 16,
    right: 16,
    height: 70,
    backgroundColor: '#fff',
    borderRadius: 100,
  },
  addText: {
    color: '#FFF',
    fontWeight: '500',
  },
});

export default DashboardScreen;
