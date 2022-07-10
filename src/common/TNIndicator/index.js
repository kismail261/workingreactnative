import React from 'react';
import { View, Text } from 'react-native';
import { UIActivityIndicator } from 'react-native-indicators';
import styles from './styles';

const TNActivityIndicator = () => {

    return (
        <View style={styles.container}>
            <View style={styles.indicatorContainer}>
                <Text style={styles.text}>Loading...</Text>
                <UIActivityIndicator
                    color="#000000"
                    size={30}
                    animationDuration={400}
                />
            </View>
        </View>
    );
};

export default TNActivityIndicator;