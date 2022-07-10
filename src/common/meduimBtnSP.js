import React from 'react'
import { StyleSheet, Text, TouchableOpacity, Platform } from 'react-native'
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
        width: wp('80'),
        height: Platform.OS == "ios" ? hp('6') : hp('7') ,
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
