import React from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import colors from '../colors/colors';

const Button = ({title, onPress = () => {}}) => {
  return (
    <TouchableOpacity 
        activeOpacity={0.7}
        onPress={onPress}
        style={styles.button}
    >
        <Text style={styles.textBtn}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: colors.green,
        borderWidth: 0.5,
        borderColor: colors.primary,
        height: 40,
        width: '100%',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textBtn: {
        color: colors.white,
        fontWeight: 'bold',
        fontSize: 15,
    }
});

export default Button;