import React from 'react';
import {Modal, Pressable, StyleSheet, Text, View} from 'react-native';
import {TransactionContext} from '../../provider/TransactionProvider';
import {colors, filterList} from '../../static';

const CustomModal = () => {
  const {isModalVisible, _closeModal, filterChoosen, _setFilter} =
    React.useContext(TransactionContext);
  let modalItem;

  modalItem = filterList.map(item => (
    <ModalItem
      key={item.id}
      item={item}
      itemChoosed={filterChoosen}
      onPress={() => _setFilter(item.title)}
    />
  ));

  return (
    <Modal animationType="fade" transparent={true} visible={isModalVisible}>
      <Pressable style={styles.backdrop} onPress={() => _closeModal()}>
        <View style={styles.container}>{modalItem}</View>
      </Pressable>
    </Modal>
  );
};

export default CustomModal;

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    width: '80%',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  outerRound: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 18,
    height: 18,
    borderWidth: 3,
    borderColor: colors.orange,
    borderRadius: 100,
    marginRight: 8,
  },
  insideRound: {
    width: 8,
    height: 8,
    borderRadius: 100,
  },
  text600: {fontWeight: '600'},
});

const ModalItem = ({item, itemChoosed, onPress}) => {
  return (
    <Pressable onPress={onPress} style={styles.itemContainer}>
      <View style={styles.outerRound}>
        <View
          style={[
            styles.insideRound,
            {backgroundColor: item.title === itemChoosed ? colors.orange : colors.white},
          ]}
        />
      </View>
      <Text style={styles.text600}>{item.title}</Text>
    </Pressable>
  );
};
