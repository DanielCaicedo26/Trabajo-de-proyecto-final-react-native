
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import BienvenidaScreen from './src/screens/BienvenidaScreen';
import MultasScreen from './src/screens/MultasScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Bienvenida" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Bienvenida" component={BienvenidaScreen} />
        <Stack.Screen name="Multas" component={MultasScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
