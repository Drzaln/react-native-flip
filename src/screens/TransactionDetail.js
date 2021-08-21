import Clipboard from '@react-native-clipboard/clipboard';
import React from 'react';
import {
  Animated,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import {useRoute} from '@react-navigation/native';
import {colors} from '../static';
import {
  changeToProperCase,
  changeToUpperCase,
  currencyFormatter,
  formatDateToDMY,
} from '../utils';

const TransactionDetail = ({route}) => {
  const {id} = route.params.item;
  const translateY = React.useRef(new Animated.Value(0)).current;
  const animateBadge = React.useRef(new Animated.Value(500)).current;
  const [isOpen, setIsOpen] = React.useState(true);

  const copyToClipboard = () => {
    Clipboard.setString(id);
    Animated.timing(animateBadge, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      Animated.timing(animateBadge, {
        delay: 500,
        toValue: 500,
        duration: 500,
        useNativeDriver: true,
      }).start();
    });
  };

  const handleCloseOpen = () => {
    Animated.timing(translateY, {
      toValue: translateY._value === 0 ? -500 : 0,
      duration: 500,
      useNativeDriver: false,
    }).start(({finished}) => {
      if (finished) {
        setIsOpen(!isOpen);
      }
    });
  };

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <View style={styles.topContainer}>
        <View style={styles.idContainer}>
          <Text style={styles.textId}>ID TRANSAKSI: #{id}</Text>
          <Pressable
            android_ripple={{color: colors.grey, borderless: true}}
            hitSlop={{bottom: 8, top: 8, left: 8, right: 8}}
            onPress={copyToClipboard}>
            <MaterialIcon
              name="content-copy"
              size={15}
              color={colors.orange}
              style={styles.mirror}
            />
          </Pressable>
        </View>
        <View style={styles.detailContainer}>
          <Text style={styles.textDetail}>DETAIL TRANSAKSI</Text>
          <Pressable
            android_ripple={{color: colors.grey, borderless: true}}
            hitSlop={{bottom: 8, top: 8, left: 8, right: 8}}
            onPress={handleCloseOpen}>
            <Text style={styles.textButton}>{isOpen ? 'Tutup' : 'Buka'}</Text>
          </Pressable>
        </View>
      </View>
      <AnimateSection animation={translateY} />
      <Animated.View
        style={[styles.copyBadge, {transform: [{translateY: animateBadge}]}]}>
        <Text style={styles.textCopy}>Copied!</Text>
      </Animated.View>
    </>
  );
};

export default TransactionDetail;

const styles = StyleSheet.create({
  row: {flexDirection: 'row'},
  boldText: {fontWeight: 'bold'},
  arrowRight: {marginHorizontal: 4},
  topContainer: {marginTop: 20, backgroundColor: colors.white},
  idContainer: {padding: 20, flexDirection: 'row'},
  textId: {fontWeight: 'bold', fontSize: 12, marginRight: 8},
  mirror: {transform: [{scaleX: -1}]},
  detailContainer: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopColor: colors.grey,
    borderTopWidth: 0.5,
  },
  textDetail: {fontWeight: 'bold', fontSize: 12},
  textButton: {fontSize: 12, color: colors.orange, fontWeight: '500'},
  copyBadge: {
    position: 'absolute',
    bottom: 100,
    backgroundColor: colors.orange,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 100,
    alignSelf: 'center',
  },
  textCopy: {color: colors.white, fontWeight: 'bold'},
  animatingContainer: {
    backgroundColor: colors.white,
    padding: 20,
    borderTopWidth: 1,
    borderColor: colors.grey,
  },
  detailItemContainer: {marginTop: 20, flexDirection: 'row'},
  leftFlex: {flex: 0.6},
  text700: {fontWeight: '700'},
  rightFlex: {flex: 0.4},
});

const AnimateSection = ({animation}) => {
  const route = useRoute();
  const {
    sender_bank,
    beneficiary_bank,
    beneficiary_name,
    amount,
    unique_code,
    account_number,
    remark,
    created_at,
  } = route.params.item;
  return (
    <View style={{overflow: 'hidden'}}>
      <Animated.View
        style={[
          styles.animatingContainer,
          {transform: [{translateY: animation}]},
        ]}>
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
        <DetailItem
          leftTitle={beneficiary_name.toUpperCase()}
          leftContent={account_number}
          rightTitle="NOMINAL"
          rightContent={currencyFormatter(amount)}
        />
        <DetailItem
          leftTitle="BERITA TRANSFER"
          leftContent={remark}
          rightTitle="KODE UNIK"
          rightContent={unique_code}
        />
        <DetailItem
          leftTitle="WAKTU DIBUAT"
          leftContent={formatDateToDMY(created_at)}
        />
      </Animated.View>
    </View>
  );
};

const DetailItem = ({leftTitle, leftContent, rightTitle, rightContent}) => {
  return (
    <View style={styles.detailItemContainer}>
      <View style={styles.leftFlex}>
        <Text style={styles.text700}>{leftTitle}</Text>
        <Text>{leftContent}</Text>
      </View>
      <View style={styles.rightFlex}>
        <Text style={styles.text700}>{rightTitle}</Text>
        <Text>{rightContent}</Text>
      </View>
    </View>
  );
};
