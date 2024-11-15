import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import styles from './Style';
import {useEffect, useState} from 'react';
import axios from 'axios';

const HomeScreen = () => {
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

  return (
    <ScrollView >
      <Image source={require('./Logo.png')} style={styles.image} />
      <View style={styles.titleContainer}>
        <Text style={styles.listTitle}>Danh sách dịch vụ</Text>
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={({item}) => {
          return (
            <TouchableOpacity style={styles.productContainer}>
              <Text style={styles.productName}>{item.name}</Text>
              <Text style={styles.price}>{item.price}</Text>
            </TouchableOpacity>
          );
        }}
      />
    </ScrollView>
  );
};

export default HomeScreen;
