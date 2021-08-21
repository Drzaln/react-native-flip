import React from 'react';
import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import EvilIcon from 'react-native-vector-icons/EvilIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import {TransactionContext} from '../../provider/TransactionProvider';
import {colors} from '../../static';

const SearchBar = () => {
  const {_openModal, filterChoosen, searchTerm, _searchHandler} =
    React.useContext(TransactionContext);
  return (
    <View style={styles.container}>
      <View style={styles.leftFlex}>
        <EvilIcon
          name="search"
          size={24}
          color={colors.grey}
          style={styles.search}
        />
        <TextInput
          style={styles.textInput}
          onChangeText={_searchHandler}
          value={searchTerm}
          placeholder="Cari nama, bank, atau nominal"
        />
      </View>
      <Pressable
        android_ripple={{color: colors.grey, borderless: true}}
        style={styles.rightFlex}
        onPress={() => _openModal()}>
        <Text style={styles.chooserText}>{filterChoosen}</Text>
        <Entypo
          name="chevron-small-down"
          size={20}
          color={colors.orangePale}
          style={styles.chevronDown}
        />
      </Pressable>
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginBottom: 16,
    marginTop: 20,
    marginHorizontal: 20,
  },
  leftFlex: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 2,
  },
  search: {marginRight: 4},
  textInput: {height: 40, width: '90%'},
  rightFlex: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-end',
  },
  chooserText: {color: colors.orangePale, fontWeight: 'bold', fontSize: 10},
  chevronDown: {marginLeft: 4},
});
