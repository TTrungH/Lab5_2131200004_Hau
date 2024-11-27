import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './Style';
import {View, Text, TouchableOpacity, Alert} from 'react-native';
import axios from 'axios';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import AsyncStorage from '@react-native-async-storage/async-storage';
let id = '';
const detail = async () => {
  try {
    id = await AsyncStorage.getItem('id');
  } catch (error) {
    console.error('Error:', error);
  }
};
detail();

const HomeMenu = ({navigation}) => {
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
  const deleteData = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const id = await AsyncStorage.getItem('id');
      if (token !== null && id !== null) {
        deletedata(token,id);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const deletedata = (token, id) => {
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
  return (
    <Menu style={{marginRight: 20}}>
      <MenuTrigger>
        <Icon name="dots-vertical" size={30} color={'white'} />
      </MenuTrigger>
      <MenuOptions
        customStyles={{
          optionsContainer: {
            width: 120,
            padding: 5,
            marginTop: 30,
          },
        }}>
        <MenuOption onSelect={() => navigation.navigate('Edit')}>
          <Text style={styles.menuItem}>
            <Icon name="pencil" size={15} color={'black'} /> Edit
          </Text>
        </MenuOption>
        <MenuOption onSelect={handleDelete}>
          <Text style={styles.menuItem}>
            <Icon name="trash-can" size={15} color={'black'} /> Delete
          </Text>
        </MenuOption>
      </MenuOptions>
    </Menu>
  );
};

export default HomeMenu;
