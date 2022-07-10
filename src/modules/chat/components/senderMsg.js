import moment from 'moment'
import React from 'react'
import { StyleSheet, Text, View, Image, } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { FONTS, ICONS } from '../../../constant'


const senderMsg = ({ data }) => {
    const { message, createdAt } = data
    return (
        <View style={styles.container} >
            <Text style={styles.msgStyle} >{message}</Text>
            <Text style={styles.timeStyle} >{moment(createdAt).format('hh:mm A')}</Text>
        </View>
    )
}

export default senderMsg

const styles = StyleSheet.create({
    container: {
        maxWidth: wp('55'),
        backgroundColor: '#FFFFFF',
        padding: 5,
        borderRadius: 4,
        elevation: 3,
        marginTop: 10
    },
    msgStyle: {

        color: '#000000',
        fontSize: wp('3.2'),
        fontFamily: FONTS.SFMedium
    },
    timeStyle: {
        alignSelf: 'flex-end',
        color: '#807C7C',
        fontSize: wp('2.3'),
        fontFamily: FONTS.SFMedium
    }
})
