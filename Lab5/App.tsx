import React from 'react';
import LoginScreen from './src/Login';
import DisplayScreen from './src/Display';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {MenuProvider} from 'react-native-popup-menu';
const Stack = createStackNavigator();

const App = () => {
  return (
    <MenuProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{header: () => null}}
          />
          <Stack.Screen
            name="Display"
            component={DisplayScreen}
            options={{header: () => null}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </MenuProvider>
  );
};
export default App;
