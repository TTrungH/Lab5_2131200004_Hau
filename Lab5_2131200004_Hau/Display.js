import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import Home from './Home';
import Edit from './Edit';
import Add from './Add';
import Detail from './Detail';
import Customer from './Customer';
import AddCustomer from './AddCustomer';
import Transaction from './Transaction';
import TransactionDetail from './TransactionDetail';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './Style';
import {View, Text, TouchableOpacity, } from 'react-native';
import HomeMenu from './HomeMenu';


const Stack = createStackNavigator();

function HomeScreen({navigation}) {
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
        name={'Home'}
        component={TabNavigator}
        options={{
          title: 'Home',
          headerShown: false,
        }}
      />

      <Stack.Screen name="Edit" component={Edit} options={{title: 'Edit'}} />
      <Stack.Screen name="Add" component={Add} options={{title: 'Add'}} />
      <Stack.Screen
        name="Detail"
        component={Detail}
        options={({navigation}) => ({
          title: 'Detail',
          headerRight: () => <HomeMenu navigation={navigation} />,
        })}
      />
    </Stack.Navigator>
  );
}
function Setting({navigation}) {
  return (
    <View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Login')}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}
//////////////////////////////////////////////////////////////////////////////////////////////
function TransactionScreen({}) {
  return (
    <Stack.Navigator
      initialRouteName="Transaction"
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: '#EF506B',
        },
        headerTintColor: '#fff',
      }}>
      <Stack.Screen
        name={'Transaction'}
        component={Transaction}
        options={{
          title: 'Transaction',
        }}
      />
      <Stack.Screen
        name="TransactionDetail"
        component={TransactionDetail}
        options={{title: 'TransactionDetail'}}
      />
    </Stack.Navigator>
  );
}
///////////////////////////////////////////////////////////////////////////////////////////////
function CustomerScreen({}) {
  return (
    <Stack.Navigator
      initialRouteName="Customer"
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: '#EF506B',
        },
        headerTintColor: '#fff',
      }}>
      <Stack.Screen
        name={'Customer'}
        component={Customer}
        options={{
          title: 'Customer',
        }}
      />
      <Stack.Screen
        name="AddCustomer"
        component={AddCustomer}
        options={{title: 'AddCustomer'}}
      />
    </Stack.Navigator>
  );
}
////////////////////////////////////////////////////////////////////////////////////////////////////

const Tab = createBottomTabNavigator();
const TabNavigator = ({}) => {
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
    <Tab.Navigator
      initialRouteName="Home"
      barStyle={{backgroundColor: 'red'}}
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

        tabBarActiveTintColor: '#EF506B',
      })}>
      <Tab.Screen
        name="Home"
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
          headerTitle: screenName,
          headerStyle: {backgroundColor: '#EF506B'},
          headerTintColor: '#fff',
        }}
      />
      <Tab.Screen
        name="Transaction"
        component={TransactionScreen}
        options={{
          headerStyle: {backgroundColor: '#EF506B'},
          headerTintColor: '#fff',
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Customer"
        component={CustomerScreen}
        options={{
          headerStyle: {backgroundColor: '#EF506B'},
          headerTintColor: '#fff',
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Setting"
        component={Setting}
        options={{
          headerStyle: {backgroundColor: '#EF506B'},
          headerTintColor: '#fff',
        }}
      />
    </Tab.Navigator>
  );
};
////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////
const DisplayScreen = () => {
  return <HomeScreen />;
};
export default DisplayScreen;
