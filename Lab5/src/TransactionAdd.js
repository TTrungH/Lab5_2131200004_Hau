import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import styles from './Style';
import {useState, useEffect} from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {Dropdown} from 'react-native-element-dropdown';
import {FlatList} from 'react-native-gesture-handler';
import AddQuantity from './Quantity';
const TransactionAdd = ({navigation}) => {
  const [total, setTotal] = useState(0);
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [check, setCheck] = useState(false);
  const [data, setData] = useState([]);
  const [service, setService] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  useEffect(() => {
    axios
      .get('https://kami-backend-5rs0.onrender.com/services')
      .then(response => {
        setService(response.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);
  useEffect(() => {
    const fetchDropdownData = async () => {
      try {
        const response = await axios.get(
          'https://kami-backend-5rs0.onrender.com/customers',
        );
        const jsonData =
          typeof response.data === 'string'
            ? JSON.parse(response.data)
            : response.data;

        const dropdownOptions = jsonData.map(item => ({
          label: item.name,
          value: item._id,
        }));
        setData(dropdownOptions);
        return dropdownOptions;
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchDropdownData();
  }, []);
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////
  const adddata = async (value, selectedItems) => {
    const postData = {
      customerId: value,
      Services: selectedItems,
    };
    console.log(postData);
    try {
      const token = await AsyncStorage.getItem('token');
      if (token !== null) {
        add(token, postData);
      }
      navigation.goBack();
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const add = (newtoken, data) => {
    axios
      .post('https://kami-backend-5rs0.onrender.com/transactions', data, {
        headers: {
          Authorization: `Bearer ${newtoken}`,
          'Content-Type': 'application/json',
        },
      })
      .then(response => {
        console.log('Response:', response.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };
  ////////////////////////////////////////////////////////////////////////////////////////////////////
  const handleCheckboxChange = async (_id, quantity, isChecked) => {
    try {
      const userID = await AsyncStorage.getItem('id');
      if (userID !== null) {
        if (isChecked) {
          // Thêm giá trị vào mảng khi check
          setSelectedItems(prevState => [
            ...prevState,
            {_id, quantity, userID},
          ]);
          console.log(selectedItems);
        } else {
          // Xóa giá trị khỏi mảng khi uncheck
          setSelectedItems(prevState =>
            prevState.filter(item => item._id !== _id),
          );
        }
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  ///////////////////////////////////////////////////////////////////////////////////////////////
  const AddQuantityfunction = isChecked => {
    try {
      if (isChecked) {
        <AddQuantity />;
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  /////////////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <View style={styles.detailContainer}>
      <Text style={styles.listTitle}>Customer *</Text>

      <Dropdown
        style={[styles.dropdown]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        search
        maxHeight={200}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? 'Select item' : '...'}
        searchPlaceholder="Search..."
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          setValue(item.value);
          setIsFocus(false);
        }}
      />
      <FlatList
        data={service}
        keyExtractor={item => item._id}
        renderItem={({item}) => {
          return (
            <View>
              <BouncyCheckbox
                size={20}
                fillColor="orange"
                unFillColor="white"
                text={item.name}
                style={{marginTop: 10}}
                textStyle={{
                  textDecorationLine: 'none',
                }}
                innerIconStyle={{borderWidth: 2, borderColor: 'orange'}}
                onPress={isChecked => {
                  handleCheckboxChange(item._id, "1", isChecked);
                  setCheck(isChecked);
                }}
              />
              <AddQuantity pricePerItem={item.price} isChecked={check}/>
            </View>
          );
        }}
        showsVerticalScrollIndicator={false}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() => adddata(value, selectedItems)}>
        <Text style={styles.buttonText}>See summary: ({total})</Text>
      </TouchableOpacity>
    </View>
  );
};
export default TransactionAdd;
