import React from 'react'
import { StyleSheet, Text, View, TextInput } from 'react-native'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { FONTS } from '../../../constant'

const customInputField = ({ value, getValue }) => {
    return (
        <View style={styles.container} >
            <TextInput
                style={styles.inputStyle}
                onChangeText={(value) => getValue(value)}
                value={value}
                keyboardType= "number-pad"
            />
        </View>
    )
}

export default customInputField

const styles = StyleSheet.create({
    container: {
        width: wp('18.5'),
        alignItems: 'center',
        marginTop: 14
    },
    inputStyle: {
        width: '100%',
        height: 78,
        backgroundColor: '#0343CB05',
        borderWidth: 1,
        borderColor: "#4040401A",
        borderRadius: 4,
        color: '#707070',
        textAlign: 'center',
        fontFamily: FONTS.SFMedium
    }
})
