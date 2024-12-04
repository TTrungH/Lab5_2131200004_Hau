import {View, Text, TouchableOpacity, Image, FlatList} from 'react-native';
import styles from './Style';
import {useCallback, useEffect, useState} from 'react';
import axios from 'axios';
import {useFocusEffect} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
const CustomerScreen = ({navigation}) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get('https://kami-backend-5rs0.onrender.com/customers')
      .then(response => {
        setData(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);
  useFocusEffect(
    useCallback(() => {
      axios
        .get('https://kami-backend-5rs0.onrender.com/customers')
        .then(response => {
          setData(response.data);
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }, []),
  );
  const setId = async id => {
    try {
      await AsyncStorage.setItem('id', id);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  return (
    <View style={styles.home}>
      <TouchableOpacity
        style={styles.addButtonOther}
        onPress={() => navigation.navigate('AddCustomer')}>
        <Text style={styles.addButtonTextOther}>+</Text>
      </TouchableOpacity>
      <FlatList
        data={data}
        keyExtractor={item => item._id}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              style={styles.transactionDetailContainer}
              onPress={() =>
                navigation.navigate(
                  'CustomerDetail',
                  {id: item._id},
                  setId(item._id),
                )
              }>
              <View style={styles.TransactionDetailInf}>
                <View>
                  <Text style={styles.transactionDetail}>
                    Customer: {item.name}
                  </Text>
                  <Text style={styles.transactionDetail}>
                    Phone: {item.phone}
                  </Text>
                  <Text style={styles.transactionDetail}>
                    Total money:{'  '}
                    <Text style={{color: '#EF506B'}}>{item.totalSpent} đ</Text>
                  </Text>
                </View>
                <View style={styles.Loyalty}>
                  <Icon name="crown" size={30} color={'#EF506B'} />
                  <Text style={{color: '#EF506B', fontWeight: 'bold'}}>
                    {item.loyalty}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default CustomerScreen;
