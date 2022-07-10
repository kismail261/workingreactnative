import React from 'react'
import { Platform, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { FONTS } from '../constant';


const largeBtn = ({ label, onClick, bgColor }) => {
    return (
        <TouchableOpacity style={[styles.container, { backgroundColor: bgColor }]} onPress={() => onClick()} >
            <Text style={styles.labelStyle} >{label}</Text>
        </TouchableOpacity>
    )
}

export default largeBtn

const styles = StyleSheet.create({
    container: {
        width: wp('90'),
        height: Platform.OS == 'android' ? hp('7') : hp('6'),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,

    },
    labelStyle: {
        color: "#FFFFFF",
        fontSize: wp('3'),
        fontFamily: FONTS.SFBold
    }
})
