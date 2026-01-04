
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/screens/LoginScreen';
import DashboardScreen from './src/screens/DashboardScreen';
import TransactionsScreen from './src/screens/TransactionsScreen';
import AddTransactionScreen from './src/screens/AddTransactionScreen';
const Stack = createNativeStackNavigator();
export default function App(){
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Đăng nhập' }} />
        <Stack.Screen name="Dashboard" component={DashboardScreen} options={{ title: 'Tổng quan' }} />
        <Stack.Screen name="Transactions" component={TransactionsScreen} options={{ title: 'Giao dịch' }} />
        <Stack.Screen name="AddTransaction" component={AddTransactionScreen} options={{ title: 'Thêm giao dịch' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
