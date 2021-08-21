import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {TransactionContext} from '../../provider/TransactionProvider';
import EmptyItem from './EmptyItem';
import TransactionItem from './TransactionItem';

const ListTransaction = () => {
  const {transactions} = React.useContext(TransactionContext);
  const renderItem = ({item}) => <TransactionItem item={item} />;
  const renderSeparator = () => <View style={styles.separator} />;
  const renderEmpty = () => <EmptyItem/>
  return (
    <FlatList
      data={transactions}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      ItemSeparatorComponent={renderSeparator}
      ListEmptyComponent={renderEmpty}
      contentContainerStyle={styles.list}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default ListTransaction;

const styles = StyleSheet.create({
  separator: {height: 12},
  list: {paddingHorizontal: 20, paddingBottom: 20},
});
