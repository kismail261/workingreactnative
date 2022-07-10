import React from 'react';
import { TextInput, View, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const TextField = ({ value, onChange, showPassword, toggleShowPassword, error }) => {
    return (
        <>
            <View style={{ flexDirection: 'row', backgroundColor: 'white', height: 46, borderRadius: 4, borderWidth: error ? 1 : 0, borderColor: 'red' }}>
                <TextInput
                    style={{ width: '90%' }}
                    value={value}
                    onChangeText={onChange}
                    secureTextEntry={!showPassword}
                />

                <TouchableOpacity style={{ width: '10%', justifyContent: 'center', alignItems: 'center' }} onPress={toggleShowPassword}>
                    <Icon name={showPassword ? 'eye' : 'eye-off'} size={18} />
                </TouchableOpacity>
            </View>

            {error ? (
                <View style={{ marginTop: 5 }}>
                    <Text style={{ fontSize: 12, color: 'red' }}>{error}</Text>
                </View>
            ) : null}
        </>
    )
}

export default TextField;