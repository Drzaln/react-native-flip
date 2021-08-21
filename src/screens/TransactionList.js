import React from 'react';
import {
  FlatList,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import EvilIcon from 'react-native-vector-icons/EvilIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import {TransactionContext} from '../provider/TransactionProvider';
import {
  changeToProperCase,
  changeToUpperCase,
  currencyFormatter,
  formatDateToDMY,
  formatRupiah,
  formatter,
} from '../utils';

const Item = ({item}) => {
  const {
    id,
    amount,
    status,
    sender_bank,
    beneficiary_bank,
    beneficiary_name,
    created_at,
  } = item;
  return (
    <Pressable
      onPress={() => {}}
      style={{
        backgroundColor: 'white',
        borderRadius: 4,
        flexDirection: 'row',
        alignItems: 'center',
        overflow: 'hidden',
      }}>
      <View style={{flex: 0.05}}>
        <View
          style={{
            width: 5,
            height: 55,
            backgroundColor: status === 'SUCCESS' ? '#58b485' : '#fb6544',
          }}
        />
      </View>
      <View style={{flex: 0.65, paddingVertical: 16}}>
        <View style={{flexDirection: 'row'}}>
          <Text style={{fontWeight: 'bold'}}>
            {sender_bank.length === 3
              ? changeToUpperCase(sender_bank)
              : changeToProperCase(sender_bank)}
          </Text>
          <Entypo
            name="arrow-right"
            size={20}
            color="black"
            style={{marginHorizontal: 4}}
          />
          <Text style={{fontWeight: 'bold'}}>
            {beneficiary_bank.length <= 4
              ? changeToUpperCase(beneficiary_bank)
              : changeToProperCase(beneficiary_bank)}
          </Text>
        </View>
        <Text style={{fontWeight: '500'}}>{beneficiary_name}</Text>
        <View style={{flexDirection: 'row'}}>
          <Text style={{fontWeight: '500'}}>{currencyFormatter(amount)}</Text>
          <Entypo
            name="dot-single"
            size={20}
            color="black"
          />
          <Text style={{fontWeight: '500'}}>{formatDateToDMY(created_at)}</Text>
        </View>
      </View>
      <View style={{flex: 0.3, alignItems: 'flex-end', paddingRight: 12}}>
        <View
          style={{
            paddingHorizontal: 8,
            paddingVertical: 3,
            borderRadius: 8,
            backgroundColor: status === 'SUCCESS' ? '#58b485' : 'white',
            borderWidth: 2,
            borderColor: status === 'SUCCESS' ? 'white' : '#fb6544',
          }}>
          <Text
            style={{
              fontWeight: '600',
              color: status === 'SUCCESS' ? 'white' : 'black',
            }}>
            {status === 'SUCCESS' ? 'Berhasil' : 'Pengecekan'}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

const TransactionList = ({navigation}) => {
  const {transactions} = React.useContext(TransactionContext);
  const renderItem = ({item}) => <Item item={item} />;
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <SearchBar />
      <FlatList
        data={transactions}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={() => <View style={{height: 12}} />}
        contentContainerStyle={{paddingHorizontal: 20, paddingBottom: 20}}
        showsVerticalScrollIndicator={false}
      />
    </>
  );
};

export default TransactionList;

const styles = StyleSheet.create({});

const SearchBar = () => {
  const [text, onChangeText] = React.useState('');
  return (
    <View
      style={{
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
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          flex: 2,
        }}>
        <EvilIcon
          name="search"
          size={24}
          color="#cbcbcb"
          style={{marginRight: 4}}
        />
        <TextInput
          style={{height: 40, width: '90%'}}
          onChangeText={onChangeText}
          value={text}
          placeholder="Cari nama, bank, atau nominal"
        />
      </View>
      <Pressable
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          flex: 0.9,
          justifyContent: 'flex-end',
        }}>
        <Text style={{color: '#f47c61', fontWeight: 'bold'}}>URUTKAN</Text>
        <Entypo
          name="chevron-small-down"
          size={24}
          color="#f47c61"
          style={{marginLeft: 4}}
        />
      </Pressable>
    </View>
  );
};
