import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import styles from './Style';
import {useState} from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EditScreen = ({navigation}) => {
  const [service, setService] = useState('');
  const [price, setPrice] = useState(0);
  const editdata = async (name, price) => {
    const postData = {
      name: name,
      price: price,
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
  const change = (newtoken, data, id) => {
    axios
      .put('https://kami-backend-5rs0.onrender.com/services/' + id, data, {
        headers: {
          Authorization: `Bearer ${newtoken}`,
          'Content-Type': 'application/json',
        },
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };
  return (
    <View style={styles.container}>
      <Text style={styles.listTitle}>Service name *</Text>
      <TextInput
        style={styles.input}
        value={service}
        placeholder="Input a service name"
        onChangeText={text => setService(text)}
      />
      <Text style={styles.listTitle}>Price *</Text>
      <TextInput
        style={styles.input}
        placeholder="0"
        value={price}
        onChangeText={text => setPrice(text)}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => editdata(service, price)}>
        <Text style={styles.buttonText}>Update</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EditScreen;
