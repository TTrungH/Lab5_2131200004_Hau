import {View, Text, TouchableOpacity, Image, FlatList} from 'react-native';
import styles from './Style';
import {useCallback, useEffect, useState} from 'react';
import axios from 'axios';
import {useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const HomeScreen = ({navigation}) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get('https://kami-backend-5rs0.onrender.com/services')
      .then(response => {
        setData(response.data);
        
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);
  useFocusEffect(
    useCallback(() => {
      // Giả sử đây là dữ liệu được lấy từ API
      axios
        .get('https://kami-backend-5rs0.onrender.com/services')
        .then(response => {
          
          setData(response.data);
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }, []),
  );
  const setId = async (id) => {
    try {
      await AsyncStorage.setItem('id', id);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  return (
    <View style={styles.home}>
      <Image source={require('./Logo.png')} style={styles.image} />
      <View style={styles.titleContainer}>
        <Text style={styles.listTitle}>Danh sách dịch vụ</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('Add')}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>
      
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              style={styles.productContainer}
              onPress={() => navigation.navigate('Detail',setId(item._id))}>
              <Text style={styles.productName} numberOfLines={1} ellipsizeMode="tail">{item.name}</Text>
              <Text style={styles.price}>{item.price}</Text>
            </TouchableOpacity>
          );
        }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default HomeScreen;
