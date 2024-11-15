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

const AddScreen = () => {
  const [service, setService] = useState('');
  const [price, setPrice] = useState(0);
  let token = '';
  const adddata = async (name, price) => {
    const postData = {
      name: name,
      price: price,
    };

    try {
      token = await AsyncStorage.getItem('token');
      if (token !== null) {
        add();
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const add = async () => {
    await axios
      .post('https://kami-backend-5rs0.onrender.com/services', postData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
      .then(response => {
        console.log('Response:', response.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
    //   const config = {
    //     method: 'post',
    //     maxBodyLength: Infinity,
    //     url: 'https://kami-backend-5rs0.onrender.com/services',
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //       'Content-Type': 'application/json',
    //     },
    //     data: postData,
    //   };
    //   try {
    //     const response = await axios(config);
    //     console.log(response.data);
    //   } catch (err) {
    //     console.error('Error:', err);
    //   }
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
        onPress={() => adddata(service, price)}>
        <Text style={styles.buttonText}>Add</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddScreen;
