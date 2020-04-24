import React from 'react';
import {
  FlatList,
  StyleSheet,
  Image,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import firestore from '@react-native-firebase/firestore';
import {useRealtimeDatabase} from '~/hooks';
import {useAsyncStorage} from '~/utils';
import theme from '~/utils/theme';

const DashboardScreen = ({navigation}) => {
  const [data, setData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const {getItem} = useAsyncStorage('userToken');

  React.useEffect(() => {
    let isCancelled = false;

    const callUserDevices = async () => {
      try {
        const userId = await getItem();
        const userPayload = await firestore()
          .collection('users')
          .doc(userId)
          .get();
        const getDevices = await userPayload.get('devices');
        setData(getDevices);
        setIsLoading(false);
      } catch (e) {
        if (!isCancelled) {
          throw e;
        }
      }
    };
    callUserDevices();

    return () => {
      isCancelled = true;
    };
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
  const {PPM, color} = useRealtimeDatabase(id);
  const params = {deviceName: name, deviceId: id};

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Details', params)}
      style={styles.item}>
      <View style={styles.flexRow}>
        <Image
          style={styles.image}
          source={require('~/assets/images/GasSensorLogo.png')}
        />
        <View style={styles.deviceText}>
          <Text style={styles.text}>{name}</Text>
          <Text style={styles.subtext}>{id}</Text>
        </View>
      </View>
      <View style={styles.box}>
        <Icon name="arrow-right" size={24} color="#5588EE" />
        <View style={[styles.badge, {backgroundColor: color}]}>
          <Text style={styles.badgeText}>{PPM.toLocaleString('id')}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.lightGray,
  },
  item: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: 12,
    paddingLeft: 0,
    borderBottomColor: theme.lightWhite,
    borderBottomWidth: 1.5,
    marginVertical: 4,
    marginHorizontal: 12,
  },
  text: {
    color: 'rgb(70,70,70)',
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
  image: {
    marginRight: 8,
    resizeMode: 'contain',
    opacity: 0.85,
    width: 45,
    height: 45,
  },
  deviceText: {
    flexDirection: 'column',
  },
  flexRow: {
    flexDirection: 'row',
  },
  box: {
    alignItems: 'center',
  },
  badge: {
    width: 50,
    marginTop: 6,
    paddingVertical: 3,
    paddingHorizontal: 6,
    borderRadius: 5,
  },
  badgeText: {
    color: theme.white,
    fontSize: 13,
    textAlign: 'center',
  },
});

export default DashboardScreen;
