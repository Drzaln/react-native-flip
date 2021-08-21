import React from 'react';
import {StyleSheet, View} from 'react-native';
import { colors } from '../../static';

const EmptyItem = () => {
  const item = [];
  for (let i = 0; i < 5; i++) {
    item.push(<View key={i} style={styles.loadingItem} />);
  }
  return <>{item}</>;
};

export default EmptyItem;

const styles = StyleSheet.create({
  loadingItem: {
    height: 80,
    borderRadius: 4,
    backgroundColor: colors.darkGrey,
    marginBottom: 12,
  },
});
