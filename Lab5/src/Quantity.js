import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import styles from './Style';
import {useState, useEffect} from 'react';

const AddQuantity = ({pricePerItem, isChecked}) => {
  const [quantity, setQuantity] = useState(1);

  const increment = () => {
    setQuantity(prev => prev + 1);
  };

  const decrement = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };
  if (isChecked) {
    return (
      <View style={styles.containerTrans}>
        <View style={styles.counterContainerTrans}>
          <TouchableOpacity style={styles.buttonTrans} onPress={decrement}>
            <Text style={styles.buttonTextTrans}>-</Text>
          </TouchableOpacity>

          <Text style={styles.quantityTrans}>{quantity}</Text>

          <TouchableOpacity style={styles.buttonTrans} onPress={increment}>
            <Text style={styles.buttonTextTrans}>+</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.priceTrans}>
          Price:{' '}
          {new Intl.NumberFormat('vi-VN').format(quantity * pricePerItem)} đ
        </Text>
      </View>
    );
  }
};
export default AddQuantity;
