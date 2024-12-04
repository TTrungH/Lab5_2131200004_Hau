import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import styles from './Style';
import {useState} from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CustomerEdit = ({navigation}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState(0);
  const editdata = async (name, phone) => {
    const postData = {
      name: name,
      phone: phone,
    };

    try {
      const token = await AsyncStorage.getItem('token');
      const id = await AsyncStorage.getItem('id');
      if (token !== null && id !== null) {
        
        change(token, postData, id);
      }
      navigation.pop(2);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const change = (token, data, id) => {
    axios
      .put('https://kami-backend-5rs0.onrender.com/Customers/' + id, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };
  return (
    <View style={styles.container}>
      <Text style={styles.listTitle}>Customer name *</Text>
      <TextInput
        style={styles.input}
        value={name}
        placeholder="Input a new name"
        onChangeText={text => setName(text)}
      />
      <Text style={styles.listTitle}>Phone *</Text>
      <TextInput
        style={styles.input}
        placeholder="0"
        value={phone}
        onChangeText={text => setPhone(text)}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => editdata(name, phone)}>
        <Text style={styles.buttonText}>Update</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CustomerEdit;
