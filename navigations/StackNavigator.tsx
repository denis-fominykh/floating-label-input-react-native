import React, { FC } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import StartScreen from '../screens/StartScreen';
import LoginScreen from '../screens/LoginScreen';

const Stack = createStackNavigator();

const StackNavigator: FC = () => {
  return (
    <Stack.Navigator initialRouteName="StartScreen">
      <Stack.Screen name="StartScreen" component={StartScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
