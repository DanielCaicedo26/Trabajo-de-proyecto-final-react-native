
import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import BienvenidaScreen from './src/screens/BienvenidaScreen';
import MultasScreen from './src/screens/MultasScreen';
import MultasResultadoScreen from './src/screens/MultasResultadoScreen';
import PerfilScreen from './src/screens/PerfilScreen';
import DetalleInfraccionScreen from './src/screens/DetalleInfraccionScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Bienvenida" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Bienvenida" component={BienvenidaScreen} />
        <Stack.Screen name="Multas" component={MultasScreen} />
  <Stack.Screen name="MultasResultado" component={MultasResultadoScreen} />
  <Stack.Screen name="Perfil" component={PerfilScreen} />
  <Stack.Screen name="DetalleInfraccion" component={DetalleInfraccionScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
