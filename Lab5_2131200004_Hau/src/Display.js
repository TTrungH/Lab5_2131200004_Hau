import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import Home from './Home';
import Edit from './Edit';
import Add from './Add';
import Detail from './Detail';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './Style';

const Stack = createStackNavigator();

function HomeScreen({navigation}) {
  const [screenName, setScreenName] = useState('Home');
  useEffect(() => {
    const fetchScreenName = async () => {
      try {
        const storedName = await AsyncStorage.getItem('name');
        if (storedName) {
          setScreenName(storedName);
        }
      } catch (error) {
        console.error('Error fetching screen name:', error);
      }
    };

    fetchScreenName();
  }, []);
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: '#EF506B',
        },
        headerTintColor: '#fff',
      }}>
      <Stack.Screen
        name={screenName}
        component={Home}
        options={{
          headerLeft: () => null,
          headerRight: () => (
            <Icon
              name="account"
              size={24}
              color="black"
              style={styles.accountIcon}
            />
          ),
        }}
      />

      <Stack.Screen name="Edit" component={Edit} options={{title: 'Edit'}} />
      <Stack.Screen name="Add" component={Add} options={{title: 'Add'}} />
      <Stack.Screen
        name="Detail"
        component={Detail}
        options={{
          title: 'Detail',
        }}
      />
    </Stack.Navigator>
  );
}

const Tab = createBottomTabNavigator();
const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      barStyle={{backgroundColor: 'red'}}
      labeled={false}
      headerShown={false}
      activeColor="red"
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color}) => {
          let iconName = '';

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home';
          } else if (route.name === 'Transaction') {
            iconName = focused ? 'cash-multiple' : 'cash-multiple';
          } else if (route.name === 'Customer') {
            iconName = focused ? 'account-multiple' : 'account-multiple';
          } else if (route.name === 'Setting') {
            iconName = focused ? 'cog' : 'cog';
          }
          return <Icon name={iconName} size={30} color={color} />;
        },
        headerShown: false,
        tabBarActiveTintColor: '#EF506B',
      })}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Transaction" component={HomeScreen} />
      <Tab.Screen name="Customer" component={HomeScreen} />
      <Tab.Screen name="Setting" component={HomeScreen} />
    </Tab.Navigator>
  );
};
const DisplayScreen = () => {
  return <TabNavigator />;
};
export default DisplayScreen;
