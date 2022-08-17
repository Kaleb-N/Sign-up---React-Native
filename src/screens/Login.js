import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { SafeAreaView, ScrollView, StatusBar, Text, View, Keyboard, Alert } from 'react-native';
import colors from '../colors/colors';
import Button from '../components/Button';
import CustomInput from '../components/CustomInput';
import Loader from '../components/Loader';


const Login = ({navigation}) => {
  // hide and show loader ====
  const [loading, setLoading] = React.useState(false);
  // validation
  const [inputs, setInputs] = React.useState({
    email: '',
    fullName: '',
    phone: '',
    password: '',
  });
  const [errors, setErrors] = React.useState({});
  const validate = () => {
    Keyboard.dismiss();
    // check if email is empty ======
    let valid = true;
    if (!inputs.email) {
      handleError('Please input email', 'email');
      valid = false;
      //check if email is invalid =====
    }
    
    if (!inputs.password) {
      handleError('Please input password', 'password');
      valid = false;
    }

    if (valid) {
      login();
    }
  };

  // Log in authentication
  const login = () => {
    setLoading(true);
    setTimeout(async () => {
      setLoading(false);
      // get data
      let userData = await AsyncStorage.getItem('user');
      // check if there's a data
      if (userData) {
        // check if the data is valid
        userData = JSON.parse(userData);
        if (
          inputs.email == userData.email && 
          inputs.password == userData.password
        ) {
          AsyncStorage.setItem(
            'user',
            JSON.stringify({...userData, loggedIn: true}),
          );
          navigation.navigate('Home');
        } else {
          Alert.alert('Error', 'Invalid Details');
        }
      } else {
        Alert.alert('Error', 'User does not exist');
      }
    }, 2000);
  };

  const handleOnChange = (text, input) => {
    setInputs(prevState => ({...prevState, [input]: text}));
  };

  const handleError = (errorMessage, input) => {
    setErrors(prevState => ({...prevState, [input]: errorMessage}));
  };

  return (
    <SafeAreaView style={{backgroundColor: colors.background,flex:1}}>
      
      <Loader visible={loading} />
      <ScrollView 
        contentContainerStyle={{
          paddingTop: 50,
          paddingHorizontal: 20,
          marginVertical: 40,
        }}
      >
        <Text style={{color: colors.darkGreen, fontSize: 30, fontWeight: 'bold', textAlign: 'center',}}>
          Log in
        </Text>
        <Text style={{color: colors.darkGreen, fontSize: 15, textAlign: 'center', marginVertical: 10}}>
          Log into your account
        </Text>
        <View style={{marginVertical: 10}}>
          <CustomInput 
            label="Email"
            iconName="email-outline"
            placeholder="Enter your email"
            //error="Input email"
            error={errors.email}
            onFocus={() => {
              handleError(null, 'email');
            }}
            onChangeText={text => handleOnChange(text, "email")}
          />
          
          <CustomInput 
            label="Password"
            iconName="lock-outline"
            placeholder="Enter your password"
            password
            //error="Input password"
            error={errors.password}
            onFocus={() => {
              handleError(null, 'password');
            }}
            onChangeText={text => handleOnChange(text, "password")}
          />
          <Text
            onPress={() => navigation.navigate('Signup')}
            style={{
              color: colors.green,
              textAlign: 'center',
              fontSize: 13,
              fontWeight: 'bold',
              marginVertical: 20,
            }}
          >
            Sign up instead?
          </Text>
          <Button title="Log in" onPress={validate} />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Login