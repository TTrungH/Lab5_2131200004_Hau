import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import styles from './Style';
import {useState} from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const handleLogin =()=>{
    gettoken(user, pass);
    navigation.navigate('Display');
  }
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>
        <TextInput
          style={styles.input}
          placeholder="Phone"
          value={user}
          onChangeText={text => setUser(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={pass}
          onChangeText={text => setPass(text)}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const gettoken = (user, pass) => {
  // '0373007856','123'
  const postData = {
    phone: user,
    password: pass,
  };

  axios
    .post('https://kami-backend-5rs0.onrender.com/auth', postData)
    .then(response => {
      console.log(response.data);
      setToken(response.data.token);
      setName(response.data.name);
    })
    .catch(error => {
      console.error('Error:', error);
    });
};
const setToken = async (token) => {
  try {
    await AsyncStorage.setItem('token', token);
  } catch (error) {
    console.error('Error:', error);
  }
};
const setName = async (name) => {
  try {
    await AsyncStorage.setItem('name', name);
  } catch (error) {
    console.error('Error:', error);
  }
};





export default LoginScreen;
