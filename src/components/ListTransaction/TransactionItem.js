import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/native';
import {
  changeToProperCase,
  changeToUpperCase,
  currencyFormatter,
  formatDateToDMY,
} from '../../utils';
import {colors} from '../../static';

const TransactionItem = ({item}) => {
  const navigation = useNavigation();
  const {
    amount,
    status,
    sender_bank,
    beneficiary_bank,
    beneficiary_name,
    created_at,
  } = item;
  return (
    <Pressable
      android_ripple={{color: colors.grey}}
      onPress={() => navigation.navigate('Transaction Detail', {item})}
      style={styles.itemContainer}>
      <View style={styles.leftFlex}>
        <View
          style={[
            styles.decorator,
            {
              backgroundColor:
                status === 'SUCCESS' ? colors.green : colors.orange,
            },
          ]}
        />
      </View>
      <View style={styles.centerFlex}>
        <View style={styles.row}>
          <Text style={styles.boldText}>
            {sender_bank.length === 3
              ? changeToUpperCase(sender_bank)
              : changeToProperCase(sender_bank)}
          </Text>
          <Entypo
            name="arrow-right"
            size={20}
            color="black"
            style={styles.arrowRight}
          />
          <Text style={styles.boldText}>
            {beneficiary_bank.length <= 4
              ? changeToUpperCase(beneficiary_bank)
              : changeToProperCase(beneficiary_bank)}
          </Text>
        </View>
        <Text style={styles.text500}>{beneficiary_name}</Text>
        <View style={styles.row}>
          <Text style={styles.text500}>{currencyFormatter(amount)}</Text>
          <Entypo name="dot-single" size={20} color="black" />
          <Text style={styles.text500}>{formatDateToDMY(created_at)}</Text>
        </View>
      </View>
      <View style={styles.rightFlex}>
        <View
          style={[
            styles.statusBadge,
            {
              backgroundColor:
                status === 'SUCCESS' ? colors.green : colors.white,
              borderColor: status === 'SUCCESS' ? colors.white : colors.orange,
            },
          ]}>
          <Text
            style={[
              styles.text600,
              {
                color: status === 'SUCCESS' ? colors.white : 'black',
              },
            ]}>
            {status === 'SUCCESS' ? 'Berhasil' : 'Pengecekan'}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

export default TransactionItem;

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: colors.white,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
    height: 80,
  },
  leftFlex: {flex: 0.05},
  decorator: {
    width: 5,
    height: '100%',
  },
  centerFlex: {flex: 0.65},
  row: {flexDirection: 'row'},
  boldText: {fontWeight: 'bold'},
  arrowRight: {marginHorizontal: 4},
  text500: {fontWeight: '500'},
  rightFlex: {flex: 0.3, alignItems: 'flex-end', paddingRight: 12},
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    borderWidth: 2,
  },
  text600: {fontWeight: '600'},
});
