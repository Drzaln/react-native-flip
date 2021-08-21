import React, {useState, useEffect} from 'react';
import {mapObjectToArray} from '../utils';

const initialState = {
  transactions: [],
  isLoading: false,
  isError: false,
  isModalVisible: false,
  filterChoosen: 'URUTKAN',
  searchTerm: '',
  setTransactions: () => {},
  setIsLoading: () => {},
  setIsError: () => {},
  _setFilter: () => {},
  _closeModal: () => {},
  _openModal: () => {},
  _searchHandler: () => {},
};

export const TransactionContext = React.createContext(initialState);

export const {Provider: TransactionProvider, Consumer: TransactionConsumer} =
  TransactionContext;

export const TransactionController = ({children}) => {
  const [transactions, setTransactions] = useState([]);
  const [defaultData, setDefaultData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [filterChoosen, setFilterChoosen] = useState('URUTKAN');
  const [searchTerm, setSearchTerm] = useState('');

  const _searchHandler = searchTerm => {
    setSearchTerm(searchTerm);
    if (searchTerm !== '') {
      const newTransactions = transactions.filter(transaction => {
        return Object.values(transaction)
          .join(' ')
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      });
      setTransactions(newTransactions);
    } else {
      setTransactions(defaultData);
    }
  };

  const _setFilter = filter => {
    switch (filter) {
      case 'URUTKAN':
        setFilterChoosen('URUTKAN');
        setIsModalVisible(false);
        setTransactions(defaultData);
        break;
      case 'Nama A-Z':
        setFilterChoosen('Nama A-Z');
        setIsModalVisible(false);
        const newTransactions = transactions.sort((a, b) =>
          a.beneficiary_name.localeCompare(b.beneficiary_name),
        );
        setTransactions(newTransactions);
        break;
      case 'Nama Z-A':
        setFilterChoosen('Nama Z-A');
        setIsModalVisible(false);
        const newTransactions2 = transactions.sort((a, b) =>
          b.beneficiary_name.localeCompare(a.beneficiary_name),
        );
        setTransactions(newTransactions2);
        break;
      case 'Tanggal Terbaru':
        setFilterChoosen('Tanggal Terbaru');
        setIsModalVisible(false);
        const newTransactions3 = transactions.sort((a, b) =>
          b.created_at.localeCompare(a.created_at),
        );
        setTransactions(newTransactions3);
        break;
      case 'Tanggal Terlama':
        setFilterChoosen('Tanggal Terlama');
        setIsModalVisible(false);
        const newTransactions4 = transactions.sort((a, b) =>
          a.created_at.localeCompare(b.created_at),
        );
        setTransactions(newTransactions4);
        break;

      default:
        break;
    }
  };

  const _openModal = () => {
    setIsModalVisible(true);
  };

  const _closeModal = () => {
    setIsModalVisible(false);
  };

  const _getTransactionList = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('https://nextar.flip.id/frontend-test');
      const transactionList = await response.json();
      const transformToArray = mapObjectToArray(transactionList);
      setIsLoading(false);
      setTransactions(transformToArray);
      setDefaultData(transformToArray);
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
    }
  };

  useEffect(() => {
    _getTransactionList();
  }, []);

  const transactionValue = React.useMemo(
    () => ({
      transactions,
      isLoading,
      isError,
      isModalVisible,
      filterChoosen,
      searchTerm,
      setTransactions,
      setIsLoading,
      setIsError,
      _setFilter,
      _closeModal,
      _openModal,
      _searchHandler,
    }),
    [
      transactions,
      isLoading,
      isError,
      isModalVisible,
      filterChoosen,
      searchTerm,
    ],
  );

  return (
    <TransactionProvider value={transactionValue}>
      {children}
    </TransactionProvider>
  );
};
