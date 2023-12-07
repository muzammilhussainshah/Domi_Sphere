import React, { useEffect, useState } from 'react';
import { Provider, useSelector } from 'react-redux';
import { PortalProvider } from '@gorhom/portal';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  LogBox,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';

import store from './src/store';
import AuthNavigation from './src/router/auth';

import Colors from './src/styles/colors';
import { platform } from './src/utilities';

import { RFPercentage } from 'react-native-responsive-fontsize';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Ignore warnings
LogBox.ignoreLogs(['Non-serializable values were found in the navigation state']);
LogBox.ignoreAllLogs();
 
const MainComponent: React.FC = () => {

  const [authState, setAuthState] = useState<any>(true)
  const { isUserLogin, splashStatusBar } = useSelector((state: any) => state.root)
  useEffect(() => {
    setAuthState(!isUserLogin)
  }, [isUserLogin])

  // Check if user is already logged in
  const checkLoginStatus = async () => {
    const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
    return isLoggedIn === 'true';
  };
  useEffect(() => {
    // AsyncStorage.setItem('isLoggedIn', 'false'); // this is for logout
    handleAppStart()
  }, [])

  const handleAppStart = async () => {
    const isUserLoggedIn = await checkLoginStatus();
    if (isUserLoggedIn) setAuthState(false)  // Redirect to home screen}
    else setAuthState(true)   // Redirect to login screen        
  };


  return (
    <>
      {platform == 'ios'
        ?
        authState ?
          <></> :
          <MyStatusBar backgroundColor={Colors.white} barStyle="light-content" /> :
        authState ?
          splashStatusBar ?
            <MyStatusBar backgroundColor={Colors.primary} barStyle="light-content" /> :
            <StatusBar hidden={true} />
          :
          <StatusBar barStyle="dark-content" hidden={false} translucent={true} />}

      {authState ? <AuthNavigation /> : <></>}

    </>

  )
};

const MyStatusBar = ({ backgroundColor, ...props }: any) => (
     <View style={[styles.statusBar, { backgroundColor }]}>
        <SafeAreaView>
         <StatusBar translucent hidden={false} backgroundColor={backgroundColor} {...props} />
        </SafeAreaView>
     </View>
);
const App: React.FC = () => {
  return (

    <Provider store={store}>
      {/* {
                    platform == 'ios'
                        ?
                        auth ?
                            <></> :
                            <MyStatusBar backgroundColor={Colors.white} barStyle="light-content" /> :
                        !auth ?
                            <MyStatusBar backgroundColor={Colors.white} barStyle="light-content" /> :
                            <StatusBar barStyle="dark-content" hidden={false} translucent={true} />
                } */}

      <SafeAreaProvider>
        <PortalProvider>
          <MainComponent />
        </PortalProvider>
      </SafeAreaProvider>
    </Provider>
  )
};

export default App;



const STATUSBAR_HEIGHT = StatusBar.currentHeight;

const styles = StyleSheet.create({
  statusBar: {
    height: STATUSBAR_HEIGHT,
  },
  customToastContainer: {
    maxWidth: "85%",
    paddingHorizontal: 15,
    paddingVertical: RFPercentage(2),
    backgroundColor: Colors.white,
    marginVertical: 4,
    borderRadius: 8,
    borderLeftColor: Colors.red,
    borderLeftWidth: 6,
    justifyContent: "center",
    paddingLeft: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});