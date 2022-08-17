import React from 'react';
import { View, StyleSheet, useWindowDimensions, ActivityIndicator, Text } from 'react-native';
import colors from '../colors/colors';

const Loader = ({visible = false}) => {
  //const {height, width} = useWindowDimensions();
  return (
    visible && (
        <View style={[styles.container]}>
            <View style={styles.loader}>
                <ActivityIndicator size="large" color={colors.green} />
                <Text style={{marginRight: 10, fontSize: 16}}>Loading...</Text>
            </View>
        </View>
    )
  );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        zIndex: 10,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
    },
    loader: {
        height: 70,
        backgroundColor: colors.background,
        marginHorizontal: 70,
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
    }
});

export default Loader;