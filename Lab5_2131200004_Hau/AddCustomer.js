import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import styles from './Style';
import {useState} from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddCustomerScreen = ({navigation}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState(0);

  const adddata = async (name, phone) => {
    const postData = {
      name: name,
      phone: phone,
    };

    try {
      const token = await AsyncStorage.getItem('token');
      if (token !== null) {
        add(token, postData);
      }
      navigation.goBack();
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const add = (newtoken, data) => {
    axios
      .post('https://kami-backend-5rs0.onrender.com/customers', data, {
        headers: {
          Authorization: `Bearer ${newtoken}`,
          'Content-Type': 'application/json',
        },
      })
      .then(response => {
        console.log('Response:', response.data);
        
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
        placeholder="Input your customer's name"
        onChangeText={text => setName(text)}
      />
      <Text style={styles.listTitle}>Phone *</Text>
      <TextInput
        style={styles.input}
        placeholder="input phone number"
        value={phone}
        onChangeText={text => setPhone(text)}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => adddata(name, phone)}>
        <Text style={styles.buttonText}>Add</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddCustomerScreen;
