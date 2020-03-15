import React from 'react';
import {FlatList, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const DUMMY_DATA = [
  {
    name: 'Sensor A',
    id: 'F6JFY8F-ASIFHSFO-ASFHSFOI',
  },
  {
    name: 'Sensor B',
    id: 'ASD2HK9-A8JDH1S2-OIU83HF',
  },
  {
    name: 'Sensor C',
    id: 'GA2JS01-0DAK1J21-LS8JSN1',
  },
  {
    name: 'Sensor D',
    id: 'F6JFY1F-KZIFHSFO-AFHSFO8',
  },
  {
    name: 'Sensor E',
    id: 'ALP2HT9-A8JDH1S2-OIZ83OF',
  },
];

const DashboardScreen = ({navigation}) => (
  <View style={styles.container}>
    <FlatList
      data={DUMMY_DATA}
      renderItem={({item}) => (
        <RenderItem navigation={navigation} name={item.name} id={item.id} />
      )}
    />
    <TouchableOpacity
      onPress={() => navigation.navigate('AddDevice')}
      style={styles.addButton}>
      <Icon name="plus" size={30} color="#5588EE" />
    </TouchableOpacity>
  </View>
);

const RenderItem = ({name, id, navigation}) => {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Details', {name})}
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
