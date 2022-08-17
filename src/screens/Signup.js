import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { SafeAreaView, ScrollView, StatusBar, Text, View, Keyboard, Alert } from 'react-native';
import colors from '../colors/colors';
import Button from '../components/Button';
import CustomInput from '../components/CustomInput';
import Loader from '../components/Loader';


const Signup = ({navigation}) => {
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
    } else if (!inputs.email.match(/\S+@\S+\.\S+/)) {
      handleError('Please input valid email', 'email');
      valid = false;
    }
    if (!inputs.fullName) {
      handleError('Please input full name', 'fullName');
      valid = false;
    }
    if (!inputs.phone) {
      handleError('Please input phone number', 'phone');
      valid = false;
    }
    if (!inputs.password) {
      handleError('Please input password', 'password');
      valid = false;
    } else if (inputs.password.length < 5) {
      handleError('Min password length of 5', 'password');
      valid = false;
    }

    if (valid) {
      register();
    }
  };

  // registration
  const register = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);

      try {
        AsyncStorage.setItem('user', JSON.stringify(inputs));
        navigation.navigate('Login');
      } catch (error) {
        Alert.alert('Error', 'Something went wrong, try again');
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
          Sign Up
        </Text>
        <Text style={{color: colors.darkGreen, fontSize: 15, textAlign: 'center', marginVertical: 10}}>
          Kindly sign up to get started
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
            label="Full Name"
            iconName="account-outline"
            placeholder="Enter your name"
            //error="Input email"
            error={errors.fullName}
            onFocus={() => {
              handleError(null, 'fullName');
            }}
            onChangeText={text => handleOnChange(text, "fullName")}
          />
          <CustomInput 
            keyboardType="numeric"
            label="Phone Number"
            iconName="phone-outline"
            placeholder="Enter your phone number"
            //error="Input email"
            error={errors.phone}
            onFocus={() => {
              handleError(null, 'phone');
            }}
            onChangeText={text => handleOnChange(text, "phone")}
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
            onPress={() => navigation.navigate('Login')}
            style={{
              color: colors.green,
              textAlign: 'center',
              fontSize: 13,
              fontWeight: 'bold',
              marginVertical: 20,
            }}
          >
            Log in instead?
          </Text>
          <Button title="Sign Up" onPress={validate}/>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Signup;