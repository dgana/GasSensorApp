import React from 'react';
import {FlatList, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const Tab = createBottomTabNavigator();

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

const HomeScreen = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => (
            <Icon name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({color, size}) => (
            <Icon name="account" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const Dashboard = ({navigation}) => (
  <View>
    <FlatList
      data={DUMMY_DATA}
      renderItem={({item}) => (
        <RenderItem navigation={navigation} name={item.name} id={item.id} />
      )}
    />
  </View>
);

const Profile = () => (
  <View style={styles.container}>
    <TouchableOpacity onPress={() => alert('haha')}>
      <Text>Log out</Text>
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
    alignItems: 'center',
    justifyContent: 'center',
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
});

export default HomeScreen;
