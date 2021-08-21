import React, {useState, useEffect} from 'react';

const initialState = {
  transactions: [],
  isLoading: false,
  isError: false,
  setTransactions: () => {},
  setIsLoading: () => {},
  setIsError: () => {},
};

export const TransactionContext = React.createContext(initialState);

export const {Provider: TransactionProvider, Consumer: TransactionConsumer} =
  TransactionContext;

export const TransactionController = ({children}) => {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const mapObjectToArray = object => {
    const array = [];
    for (let key in object) {
      array.push(object[key]);
    }
    return array;
  };

  const _getTransactionList = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('https://nextar.flip.id/frontend-test');
      const transactionList = await response.json();
      const transformToArray = mapObjectToArray(transactionList);
      setIsLoading(false);
      setTransactions(transformToArray);
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
      setTransactions,
      setIsLoading,
      setIsError,
    }),
    [transactions, isLoading, isError],
  );

  return (
    <TransactionProvider value={transactionValue}>
      {children}
    </TransactionProvider>
  );
};