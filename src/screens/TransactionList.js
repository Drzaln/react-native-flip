import React from 'react';
import {StatusBar} from 'react-native';
import CustomModal from '../components/CustomModal';
import ListTransaction from '../components/ListTransaction';
import SearchBar from '../components/SearchBar';

const TransactionList = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <SearchBar />
      <ListTransaction />
      <CustomModal />
    </>
  );
};

export default TransactionList;
