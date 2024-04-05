import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomNavigation from './BottomNavigation';
import DrawScreen from '../screens/DrawScreen';


const Stack = createNativeStackNavigator();
const AppStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Bottom Navigation"
        component={BottomNavigation}
        options={{ headerShown: false }}
      ></Stack.Screen>
      <Stack.Screen
      name="Draw Screen"
      component={DrawScreen}
      options={{headerShown: true}}>
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default AppStack;
