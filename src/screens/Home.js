import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { SafeAreaView, Text, View, StatusBar, Image, StyleSheet, Dimensions } from "react-native";
import colors from '../colors/colors';
import Button from '../components/Button';


const Home = ({navigation}) => {
  // obtaining user details
  const getUserDetails = async () => {
    const userData = await AsyncStorage.getItem('user');
    if (userData) {
      setUserDetails(JSON.parse(userData));
    }
  };
  const [userDetails, setUserDetails] = React.useState();
  React.useEffect(() => {
    getUserDetails()
  }, []);
  // log out user
  const logout = () => {
    AsyncStorage.setItem('user', JSON.stringify({...userDetails, loggedIn: false}));
    navigation.navigate('Login');
  };

  return (
    <View 
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 40,
      }}
    >
      <Text style={{fontSize: 25, color: colors.darkGreen}}>Welcome comrade {userDetails?.fullName}</Text>
      <Button title="log out" onPress={logout} />
    </View>
  )
}

export default Home