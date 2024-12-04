import {View, Text, FlatList, TouchableOpacity, ScrollView} from 'react-native';
import styles from './Style';
import {useState} from 'react';
import axios from 'axios';

const CustomerDetail = ({route}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState(0);
  const [totalSpent, setTotalSpent] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const {id} = route.params;
  axios
    .get('https://kami-backend-5rs0.onrender.com/Customers/' + id)
    .then(response => {
      setName(response.data.name);
      setPhone(response.data.phone);
      setTotalSpent(response.data.totalSpent);
      setTransactions(response.data.transactions);
    })
    .catch(error => {
      console.error('Error:', error);
    });

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.transactionDetailContainer}>
        <Text style={styles.transactionDetailTitle}>General information</Text>
        <View style={styles.TransactionDetailInf}>
          <View>
            <Text style={styles.transactionDetail}>
              Name <Text>{name}</Text>
            </Text>
            <Text style={styles.transactionDetail}>
              Phone <Text>{phone}</Text>
            </Text>
            <Text style={styles.transactionDetail}>
              Total spent <Text>{totalSpent}</Text>
            </Text>
            <Text style={styles.transactionDetail}>Time </Text>
            <Text style={styles.transactionDetail}>Last update </Text>
          </View>
        </View>
      </View>
      <View style={styles.transactionDetailContainer}>
        <Text style={styles.transactionDetailTitle}>Transaction history</Text>
        <FlatList
          data={transactions}
          keyExtractor={item => item._id}
          scrollEnabled={true}
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                onPress={() => navigation.navigate('')}
                style={styles.productContainer}>
                <Text style={styles.transactionId}>
                  {item.id} - {item.createdAt}
                  <FlatList
                    data={item.services}
                    scrollEnabled={false}
                    keyExtractor={item => item._id}
                    renderItem={({item}) => {
                      return (
                        <Text
                          style={styles.transactionContent}
                          ellipsizeMode="tail"
                          numberOfLines={1}>
                          - {item.name}
                        </Text>
                      );
                    }}
                  />
                </Text>
                <Text style={styles.transactionPrice}>{item.price}đ</Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </ScrollView>
  );
};
export default CustomerDetail;
