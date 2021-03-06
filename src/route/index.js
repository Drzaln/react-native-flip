import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TransactionList from '../screens/TransactionList';
import TransactionDetail from '../screens/TransactionDetail';
const Stack = createNativeStackNavigator();

const Route = () => {
    return (
        <Stack.Navigator initialRouteName="TransactionList">
            <Stack.Screen name="Transaction List" component={TransactionList} />
            <Stack.Screen name="Transaction Detail" component={TransactionDetail} />
        </Stack.Navigator>
    )
}

export default Route