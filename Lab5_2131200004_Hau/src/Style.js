import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 48,
  },
  header: {
    marginTop: 20,
    marginLeft: '80%',
    position: 'absolute',
    zIndex: 1000
  },
  detailContainer: {
    flex: 1,
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
  },
  DetailContent: {
    marginTop: 10,
  },
  listTitle: {
    fontWeight: 'bold',
    marginTop: 10,
  },
  productContainer: {
    flexDirection: 'row', // Căn các phần tử theo chiều ngang
    alignItems: 'center', // Căn giữa theo chiều dọc
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    margin: 10,
  },
  productName: {
    flex: 1, // Cho phép tên sản phẩm chiếm phần lớn không gian
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
