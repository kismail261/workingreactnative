import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { COLORS, FONTS, ICONS } from '../../../../constant'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'


export const OtherDetail = ({ label, subLable, onClick}) => {
    return (
        <TouchableOpacity onPress={() => onClick()} style={styles.itemRow} >
            <View style={{ width: '80%' }}>
                <Text style={styles.titleStyle} >{label}</Text>
                <Text numberOfLines={1} style={styles.subTitleStyle}>{subLable}</Text>
            </View>
            <Image source={ICONS.nextArrow} style={{width:7, height:13}} />
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    itemRow: {
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#15488F26'
    },
    titleStyle: {
        width: '100%',
        fontSize: wp(5.2),
        fontFamily: FONTS.SFSemiBold,
        color: COLORS.secondary
    },
    subTitleStyle: {
        width: '100%',
        fontSize: wp(3.8),
        fontFamily: FONTS.SFRegular,
        color: COLORS.secondary
    }
})