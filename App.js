import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { SafeAreaView, StyleSheet, StatusBar, Text } from 'react-native';
import { NavigationContainer, StackRouter } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './src/screens/Login';
import Home from './src/screens/Home';
import Signup from './src/screens/Signup';
import colors from './src/colors/colors';
import Loader from './src/components/Loader';

const Stack = createNativeStackNavigator();

const App = () => {
  // user authentication
  const [initialRouteName, setInitialRouteName] = React.useState('');
  const authUser = async () => {
    try {
      let userData = await AsyncStorage.getItem('user');
       // when there's data in the user device
      if (userData) {
        userData = JSON.parse(userData);
        // when user is logged in
        if (userData?.loggedIn) {
          setInitialRouteName('Home');
        } else {
          setInitialRouteName('Login');
        }
      } else {
        setInitialRouteName('Signup');
      }
    } catch (error) {
      // when there's error in authentication
      setInitialRouteName('Signup');
    }
  };
  React.useEffect(() => {
    setTimeout(authUser, 1000);
  }, []);

  return (
    <NavigationContainer>
      <StatusBar translucent backgroundColor={colors.green} />
      {initialRouteName == '' ? (
        <Loader visible={true} />
      ) : (
        <>
          <Stack.Navigator initialRouteName={initialRouteName} screenOptions={{headerShown: false}}>
            <Stack.Screen name="Signup" component={Signup} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Home" component={Home} />
          </Stack.Navigator>
        </>
      )}
    </NavigationContainer>
  );
};

export default App;








/*
<NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
*/