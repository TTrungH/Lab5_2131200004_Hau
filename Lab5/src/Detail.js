import {View, Text, TextInput, TouchableOpacity, Alert} from 'react-native';
import styles from './Style';
import {useState} from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {MenuProvider} from 'react-native-popup-menu';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const DetailScreen = ({route, navigation}) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [creator, setCreator] = useState('');
  const [time, setTime] = useState('');
  const [FinalUpdate, setFinalUpdate] = useState('');
  const {id} = route.params;
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
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };
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
    const handleDelete = () => {
      Alert.alert(
        "Warning", // Tiêu đề
        "Are you sure you want to remove this service? This operation cannot be returned.", // Nội dung
        [
          {
            text: "CANCEL",
            style: "cancel", // Tạo nút Cancel có style đặc biệt
          },
          { 
            text: "DELETE", 
            onPress: deleteData, 
            style: "destructive" // Style làm nút Delete nổi bật hơn
          }
        ]
      );
    };
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
      <MenuProvider style={styles.header}>
        <Menu >
          <MenuTrigger>
            <Icon name="menu" size={50} color="red" />
          </MenuTrigger>
          <MenuOptions
            customStyles={{
              optionsContainer: {
                width: 150,
              },
            }}>
            <MenuOption
              onSelect={() => navigation.navigate('Edit', {newid: id})}>
              <Text style={styles.menuItem}>Edit</Text>
            </MenuOption>
            <MenuOption onSelect={handleDelete}>
              <Text style={styles.menuItem}>Delete</Text>
            </MenuOption>
          </MenuOptions>
        </Menu>
      </MenuProvider>
    </View>
  );
};

export default DetailScreen;
