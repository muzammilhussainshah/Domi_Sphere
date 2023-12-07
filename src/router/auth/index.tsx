import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  createStackNavigator,
  TransitionPresets
} from '@react-navigation/stack';

import Splash from '../../pages/auth/splash/splash.pages';
import WalkThrough from '../../pages/auth/walk-through/walk-through.pages';

export type RootStackParamList = {
  Splash: undefined,
  WalkThrough: undefined,
};

const Stack = createStackNavigator<RootStackParamList>();

const AuthNavigation: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          ...TransitionPresets.SlideFromRightIOS, // Apply slide animation
        }}
        initialRouteName='Splash'
      >
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="WalkThrough" component={WalkThrough} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AuthNavigation;
