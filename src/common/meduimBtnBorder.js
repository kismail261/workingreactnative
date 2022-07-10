import React from 'react'
import { Platform, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { FONTS } from '../constant';


const largeBtn = ({ label, onClick, bgColor, }) => {
    return (
        <TouchableOpacity style={[styles.container]} onPress={() => onClick()} >
            <Text style={styles.labelStyle} >{label}</Text>
        </TouchableOpacity>
    )
}

export default largeBtn

const styles = StyleSheet.create({
    container: {
        width: wp('80'),
        height: Platform.OS == 'ios' ? hp('6') : hp('7'),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#61B2D4',
        marginTop: 20
    },
    labelStyle: {
        color: "#61B2D4",
        fontSize: wp('3'),
        fontFamily: FONTS.SFBold
    }
})
