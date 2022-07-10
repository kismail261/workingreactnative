import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { FONTS, ICONS } from '../../../constant'

const oldUnMsgItem = ({navigation}) => {
    return (
        <TouchableOpacity onPress={() => navigation.navigate("chatHistory")} style={styles.container}>
            <View style={{ width: wp('5') }} />
            <Image source={ICONS.userIcon} style={{ width: wp('12'), height: wp('12') }} />
            <View style={{ width: 10 }} />
            <View style={{ width: wp('73'), }} >
                <View style={{ width: wp('73'), flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text numberOfLines={1} style={styles.nameStyle} >Sera anderson</Text>
                    <Text style={styles.timeStyle} >09: 35 PM</Text>
                </View>
                <View style={{ width: wp('73'), flexDirection: 'row', justifyContent: 'space-between', marginTop: 3, alignItems: 'center' }}>
                    <Text style={styles.msgStyle} >Hi,Where are you?</Text>
                    <Image source={ICONS.doneAllGrey} style={{width:10, height:10}} resizeMode={'contain'} />
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default oldUnMsgItem

const styles = StyleSheet.create({
    container: {
        width: wp('100'),
        height: 70,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#15488F1A',
    },
    msgIndicator: {
        width: 11,
        height: 11,
        backgroundColor: '#FF7D7D',
        borderRadius: 6,
        position: 'absolute',
        top: -1,
        left: -1
    },
    nameStyle: {
        width: '80%',
        color: '#000000',
        fontSize: wp('4.2'),
        fontFamily: FONTS.SFMedium,

    },
    timeStyle: {
        color: '#9A9A9A',
        fontSize: wp('2.5'),
        fontFamily: FONTS.SFRegular,
    },
    msgStyle: {
        width: '80%',
        color: '#B2B2B2',
        fontSize: wp('3'),
        fontFamily: FONTS.SFRegular
    },
    msgCount: {
        width: 16,
        height: 16,
        backgroundColor: '#67C621',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    countText: {
        color: '#FFFFFF',
        fontSize: wp('2'),
        fontFamily: FONTS.SFMedium
    }
})
