import Clipboard from '@react-native-clipboard/clipboard';
import React from 'react';
import {Pressable, StatusBar, StyleSheet, Text, View} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors} from '../static';

const TransactionDetail = ({route}) => {
  const {
    id,
    sender_bank,
    beneficiary_name,
    account_number,
    beneficiary_bank,
    amount,
    remark,
    unique_code,
    created_at,
  } = route.params.item;

  const copyToClipboard = () => {
    Clipboard.setString(id);
  };

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <View style={{marginTop: 20, backgroundColor: colors.white}}>
        <View style={{padding: 16, flexDirection: 'row'}}>
          <Text style={{fontWeight: 'bold', fontSize: 12, marginRight: 8}}>
            ID TRANSAKSI: #{id}
          </Text>
          <Pressable
            android_ripple={{color: colors.grey, borderless: true}}
            hitSlop={{bottom: 8, top: 8, left: 8, right: 8}}
            onPress={copyToClipboard}>
            <MaterialIcon
              name="content-copy"
              size={15}
              color={colors.orange}
              style={{transform: [{scaleX: -1}]}}
            />
          </Pressable>
        </View>
        <View style={{height: 0.5, backgroundColor: colors.grey}} />
        <View
          style={{
            padding: 16,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text style={{fontWeight: 'bold', fontSize: 12}}>
            DETAIL TRANSAKSI
          </Text>
          <Pressable
            android_ripple={{color: colors.grey, borderless: true}}
            hitSlop={{bottom: 8, top: 8, left: 8, right: 8}}
            onPress={() => {}}>
            <Text
              style={{fontSize: 12, color: colors.orange, fontWeight: '500'}}>
              Tutup
            </Text>
          </Pressable>
        </View>
      </View>
    </>
  );
};

export default TransactionDetail;

const styles = StyleSheet.create({});
