import {View, Text, } from 'react-native';
import styles from './Style';
import {useState} from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


const DetailScreen = ({}) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [creator, setCreator] = useState('');
  const [time, setTime] = useState('');
  const [FinalUpdate, setFinalUpdate] = useState('');
  const detail = async () => {
    try {
      const id = await AsyncStorage.getItem('id');
      if (id !== null) {
        getDetail(id);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const getDetail = id => {
    axios
      .get('https://kami-backend-5rs0.onrender.com/services/' + id)
      .then(response => {
        setName(response.data.name);
        setPrice(response.data.price);
        setTime(response.data.createdAt);
        setCreator(response.data.user.name);
        setFinalUpdate(response.data.updatedAt);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };
  detail();
  return (
    <View style={styles.detailContainer}>
      <View style={styles.Detail}>
        <Text style={styles.listTitle}>Service name: </Text>
        <Text style={styles.DetailContent}> {name}</Text>
      </View>
      <View style={styles.Detail}>
        <Text style={styles.listTitle}>Price: </Text>
        <Text style={styles.DetailContent}> {price}</Text>
      </View>
      <View style={styles.Detail}>
        <Text style={styles.listTitle}>Creator: </Text>
        <Text style={styles.DetailContent}> {creator}</Text>
      </View>
      <View style={styles.Detail}>
        <Text style={styles.listTitle}>Time: </Text>
        <Text style={styles.DetailContent}> {time}</Text>
      </View>
      <View style={styles.Detail}>
        <Text style={styles.listTitle}>Final update: </Text>
        <Text style={styles.DetailContent}> {FinalUpdate}</Text>
      </View>
    </View>
  );
};

export default DetailScreen;
