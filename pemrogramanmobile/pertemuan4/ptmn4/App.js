import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeScreen} options={{ drawerLabel: 'Beranda' }} />
        <Drawer.Screen name="Profile" component={ProfileScreen} options={{ drawerLabel: 'Profil Pengguna' }} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

