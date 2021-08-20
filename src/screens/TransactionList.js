import React from 'react';
import {
  Alert,
  Button,
  Modal,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const TransactionList = ({navigation}) => {
  const [modalVisible, setModalVisible] = React.useState(false);
  return (
    <View>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <Text>Transaction List</Text>
      <Button
        onPress={() => navigation.navigate('TransactionDetail')}
        title="Navigate"
        color="#841584"
        accessibilityLabel="Navigate"
      />
      <Button
        onPress={() => setModalVisible(true)}
        title="Modal"
        color="green"
        accessibilityLabel="Modal"
      />
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <Pressable
          style={{
            ...StyleSheet.absoluteFill,
            backgroundColor: 'rgba(0,0,0,0.5)',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => setModalVisible(!modalVisible)}>
          <View>
            <Text>Hello World!</Text>
            <Pressable onPress={() => setModalVisible(!modalVisible)}>
              <Text>Hide Modal</Text>
            </Pressable>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

export default TransactionList;

const styles = StyleSheet.create({});
