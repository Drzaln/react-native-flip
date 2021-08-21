import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {TransactionController} from './src/provider/TransactionProvider';
import Route from './src/route';

const App = () => {
  return (
    <TransactionController>
      <NavigationContainer>
        <Route />
      </NavigationContainer>
    </TransactionController>
  );
};

export default App;
