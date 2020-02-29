import React from 'react';
import {FlatList, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {AppContext} from '~/App';

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
];

const HomeScreen = ({navigation}) => (
  <View>
    <FlatList
      data={DUMMY_DATA}
      renderItem={({item}) => (
        <RenderItem navigation={navigation} name={item.name} id={item.id} />
      )}
    />
  </View>
);

const RenderItem = ({name, id, navigation}) => {
  const {setTitle} = React.useContext(AppContext);
  return (
    <TouchableOpacity
      onPress={() => {
        setTitle(name);
        navigation.navigate('Details');
      }}
      style={styles.item}>
      <Text style={styles.text}>{name}</Text>
      <Text style={styles.subtext}>{id}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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
});

export default HomeScreen;
