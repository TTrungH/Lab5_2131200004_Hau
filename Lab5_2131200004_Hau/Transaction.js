import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import styles from './Style';
import {useCallback, useEffect, useState} from 'react';
import axios from 'axios';
import {useFocusEffect} from '@react-navigation/native';
const TransactionScreen = ({navigation}) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get('https://kami-backend-5rs0.onrender.com/transactions')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);
  useFocusEffect(
    useCallback(() => {
      axios
        .get('https://kami-backend-5rs0.onrender.com/transactions')
        .then(response => {
          setData(response.data);
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }, []),
  );

  return (
    <View style={styles.home}>
      <TouchableOpacity
        style={styles.addButtonOther}
        onPress={() => navigation.navigate('')}>
        <Text style={styles.addButtonTextOther}>+</Text>
      </TouchableOpacity>
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              onPress={() => navigation.navigate('TransactionDetail', {id: item._id})}
              style={styles.productContainer}>
              <Text style={styles.transactionId}>
                {item.id} - {item.createdAt} -
                <Text style={{color: 'red', fontSize: 9}}>
                   {item.status}
                  {'\n'}
                </Text>
                <FlatList
                  data={item.services}
                  keyExtractor={item => item._id}
                  renderItem={({item}) => {
                    return (
                      <Text style={styles.transactionContent} ellipsizeMode='tail' numberOfLines={1}>- {item.name}</Text>
                      
                    );
                  }}
                />
                <Text style={{color: 'grey', fontSize: 10}}>
                  {'\n'}
                  Customer: {item.customer.name}
                </Text>
              </Text>

              <Text style={styles.transactionPrice}>{item.price}đ</Text>
            </TouchableOpacity>
          );
        }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default TransactionScreen;
