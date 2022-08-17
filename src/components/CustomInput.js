
import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import colors from '../colors/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const CustomInput = ({ label, iconName, error, password, onFocus = () => {}, ...props }) => {
  const [isFocused, setIsFocused] = React.useState(false);
  const [hidePassword, setHidePassword] = React.useState(password);
  return (
    <View style={{marginBottom: 10}}>
      <Text style={styles.label}>{label}</Text>
      <View 
        style={[
          styles.inputContainer,
          {
            borderColor: error 
              ? colors.red
              : isFocused 
              ? colors.green
              : colors.border
          },
        ]}>
        <TextInput 
          secureTextEntry={hidePassword}
          autoCorrect={false}
          onFocus={() => {
            onFocus();
            setIsFocused(true);
          }}
          onBlur={() => {
            setIsFocused(false);
          }}
          style={{color: colors.black, flex: 1}} 
          {...props} 
        />
        {password && (
          <Icon 
            onPress={() => setHidePassword(!hidePassword)}
            style={{fontSize: 15, color: colors.green}} 
            name={hidePassword ? "eye-outline" : "eye-off-outline"} 
          />
        )}
      </View>
      {error && (
        <Text style={{color: colors.red, fontSize: 10, fontWeight: 'light', marginTop: -4}}>
          {error}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    marginVertical: 5,
    fontSize: 12,
    color: colors.darkGreen,
  },
  inputContainer: {
    height: 40,
    borderColor: colors.border,
    backgroundColor: colors.lightGreen,
    borderRadius: 5,
    borderWidth: 0.5,
    paddingHorizontal: 10,
    marginVertical: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
  
export default CustomInput;

//<Icon name={iconName} style={{color: colors.green, fontSize: 14, marginRight: 10,}} />
