import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  containerTrans: {
    alignItems: 'center',
    padding: 20,
  },
  counterContainerTrans: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonTrans: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  buttonTextTrans: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  quantityTrans: {
    marginHorizontal: 15,
    fontSize: 18,
    fontWeight: 'bold',
  },
  priceTrans: {
    fontSize: 16,
    color: '#ff5c5c',
    fontWeight: 'bold',
  },
  icon: {
    fontSize: 24,
    color: 'black',
    marginRight: 15,
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  menuOption: {
    padding: 10,
    fontSize: 16,
  },
  homeMenu: {
    height: 50,
    backgroundColor:'#EF506B'
  },
  transactionId: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: 8,
  },
  TransactionDetailPrice: {
    fontWeight: 'bold',
    fontSize: 12,
  },
  Loyalty: {
    alignItems: 'center',
    paddingRight: 15,
  },
  TransactionDetailInf: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  TransactionDetailTotal: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#F4F4F4',
  },
  transactionContent: {
    fontSize: 10,
    fontWeight: 'normal',
    overflow: 'hidden',
    paddingTop: 5,
  },
  transactionPrice: {
    color: 'red',
    fontSize: 12,
  },
  transactionDetailContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    margin: 10,
    padding: 10,
  },
  transactionDetail: {
    color: 'grey',
    fontWeight: 'bold',
    fontSize: 12,
  },
  transactionDetailTitle: {
    color: '#EF506B',
    fontSize: 15,
    fontWeight: 'bold',
  },
  transactionDetailPrice: {
    fontWeight: 'bold',
  },
  transactionDetailTotal: {
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 48,
  },
  header: {
    marginTop: '3%',
    marginLeft: '75%',
  },
  detailContainer: {
    flex: 1,
    padding:5
  },
  addButtonOther: {
    backgroundColor: '#EF506B',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    width: '12%',
    height: '8%',
    position: 'absolute',
    bottom: 20,
    right: 20,
    zIndex: 1000,
  },
  addButtonTextOther: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
  },
  accountIcon: {
    marginRight: 15,
    backgroundColor: 'white',
    padding: 5,
    borderRadius: 20,
    color: '#EF506B',
  },
  home: {
    justifyContent: 'center',
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#EF506B',
    marginBottom: 24,
    marginTop: 72,
  },
  input: {
    borderColor: '#EF506B',
    borderWidth: 1,
    width: '100%',
    marginTop: 12,
    borderRadius: 10,
    paddingLeft: 12,
  },
  button: {
    backgroundColor: '#EF506B',
    borderRadius: 10,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
    marginTop: 16,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
  },
  titleContainer: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  addButton: {
    backgroundColor: '#EF506B',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    width: '10%',
    marginLeft: '50%',
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  menuItem: {
    paddingLeft: 10,
    fontSize: 16,
    color: 'red',
  },
  menuTrigger: {
    position: 'absolute',
    top: 10,
    right: 100,
  },
  Detail: {
    flexDirection: 'row',
    marginLeft: 10,
  },
  DetailContent: {
    marginTop: 10,
  },
  listTitle: {
    fontWeight: 'bold',
    marginTop: 10,
  },
  productContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    margin: 10,
  },
  productName: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  price: {
    fontSize: 14,
    color: '#888',
  },
});
export default styles;
