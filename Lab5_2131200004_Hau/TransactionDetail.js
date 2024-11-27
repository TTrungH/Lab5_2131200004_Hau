import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  FlatList,
} from 'react-native';
import styles from './Style';
import {useState} from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import {MenuProvider} from 'react-native-popup-menu';
// import {
//   Menu,
//   MenuOptions,
//   MenuOption,
//   MenuTrigger,
// } from 'react-native-popup-menu';
const TransactionScreen = ({route, navigation}) => {
  const [code, setCode] = useState('');
  const [customer, setCustomer] = useState('');
  const [creation, setCreation] = useState('');
  const [service, setService] = useState([]);
  const [money, setMoney] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [payment, setPayment] = useState(0);
  const {id} = route.params;
  ///////////////////////////////////////////////////////////////////////////////////////////////
  const deleteData = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token !== null) {
        console.log(token);
        deletedata(token);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const deletedata = token => {
    axios
      .delete(
        'https://kami-backend-5rs0.onrender.com/services/' + id,

        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      )
      .then(response => {
        console.log('Response:', response.data);
        navigation.goBack();
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };
  const handleDelete = () => {
    Alert.alert(
      'Warning',
      'Are you sure you want to remove this service? This operation cannot be returned.',
      [
        {
          text: 'CANCEL',
          style: 'cancel',
        },
        {
          text: 'DELETE',
          onPress: deleteData,
          style: 'destructive',
        },
      ],
    );
  };
  ///////////////////////////////////////////////////////////////////////////////////////////////
  axios
    .get('https://kami-backend-5rs0.onrender.com/transactions/' + id)
    .then(response => {
      setCode(response.data.id);
      setPayment(response.data.price);
      setCustomer(
        response.data.customer.name + ' - ' + response.data.customer.phone,
      );
      setDiscount(response.data.price - response.data.priceBeforePromotion);
      setMoney(response.data.priceBeforePromotion);
      setCreation(response.data.createdAt);
      setService(response.data.services);
    })
    .catch(error => {
      console.error('Error:', error);
    });

  return (
    <View style={styles.detailContainer}>
      <View style={styles.transactionDetailContainer}>
        <Text style={styles.transactionDetailTitle}>General information</Text>
        <View style={styles.TransactionDetailInf}>
          <View>
            <Text style={styles.transactionDetail}>Transaction code </Text>
            <Text style={styles.transactionDetail}>Customer </Text>
            <Text style={styles.transactionDetail}>Creation time </Text>
          </View>
          <View style={{alignItems: 'flex-end'}}>
            <Text style={styles.TransactionDetailPrice}>{code} </Text>
            <Text style={styles.TransactionDetailPrice}>{customer} </Text>
            <Text style={styles.TransactionDetailPrice}>{creation} </Text>
          </View>
        </View>
      </View>
      <View style={styles.transactionDetailContainer}>
        <Text style={styles.transactionDetailTitle}>Services list</Text>
        <FlatList
          data={service}
          keyExtractor={item => item._id}
          renderItem={({item}) => {
            return (
              <View style={styles.TransactionDetailInf}>
                <Text style={styles.transactionDetail}>{item.name}</Text>
                <Text style={{fontSize: 12, color: 'grey'}}>
                  x{item.quantity}
                </Text>
                <Text style={styles.TransactionDetailPrice}>
                  {item.price} đ
                </Text>
              </View>
            );
          }}
        />
        <View style={styles.TransactionDetailTotal}>
          <Text style={styles.transactionDetail}>Total</Text>
          <Text style={styles.TransactionDetailPrice}>{money} đ</Text>
        </View>
      </View>
      <View style={styles.transactionDetailContainer}>
        <Text style={styles.transactionDetailTitle}>Cost</Text>
        <View style={styles.TransactionDetailInf}>
          <View>
            <Text style={styles.transactionDetail}>Transaction code </Text>
            <Text style={styles.transactionDetail}>Customer </Text>
          </View>
          <View style={{alignItems: 'flex-end'}}>
            <Text style={styles.TransactionDetailPrice}>{money} đ</Text>
            <Text style={styles.TransactionDetailPrice}>{discount} đ</Text>
          </View>
        </View>
        <View style={styles.TransactionDetailTotal}>
          <Text style={styles.transactionDetail}>Total</Text>
          <Text style={styles.TransactionDetailPrice}>{money} đ</Text>
        </View>
      </View>
    </View>
  );
};

export default TransactionScreen;