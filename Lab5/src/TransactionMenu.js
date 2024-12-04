import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './Style';
import { Text, Alert} from 'react-native';
import axios from 'axios';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import AsyncStorage from '@react-native-async-storage/async-storage';
const TransactionMenu = () => {
  const handleDelete = () => {
    Alert.alert(
      'Warning',
      'Are you sure you want to cancel this transaction? This will affect the customer transaction information.',
      [
        {
          text: 'YES',
          onPress: deleteData,
          style: 'destructive',
        },
        {
          text: 'CANCEL',
          style: 'cancel',
        },
      ],
    );
  };
  const deleteData = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const id = await AsyncStorage.getItem('id');
      if (token !== null && id !== null) {
        deletedata(token, id);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const deletedata = (token, id) => {
    axios
      .delete(
        'https://kami-backend-5rs0.onrender.com/transactions/' + id,

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
            width: 180,
            padding: 5,
            marginTop: 30,
          },
        }}>
        <MenuOption onSelect={() => navigation.navigate('')}>
          <Text style={styles.menuItem}>See more details</Text>
        </MenuOption>
        <MenuOption onSelect={handleDelete}>
          <Text style={styles.menuItem}>Cancel transaction</Text>
        </MenuOption>
      </MenuOptions>
    </Menu>
  );
};
export default TransactionMenu;
