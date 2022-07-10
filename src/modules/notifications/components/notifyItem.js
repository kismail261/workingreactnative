import React, { useEffect } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { FONTS, ICONS } from '../../../constant'
import { useDispatch, useSelector } from 'react-redux'
import { tapSpecificNotification } from '../../../redux/profile/profile.action'
import moment from 'moment'


const notifyItem = ({ data }) => {
    const { message, isRead, createdAt, _id } = data
    const dispatch = useDispatch()
    const token = useSelector(state => state.user.token)

    useEffect(() => {
        return () => {

        }
    }, [])

    const notificationClick = () => {
        dispatch(tapSpecificNotification(token, _id))
    }

    return (
        <TouchableOpacity onPress={() => notificationClick()} style={styles.container}>
            {
                isRead
                    ?
                    null
                    :
                    <View style={styles.msgIndicator} />
            }

            <View style={{ width: wp('5') }} />
            <Image source={ICONS.userIcon} style={{ width: wp('12'), height: wp('12') }} />
            <View style={{ width: 10 }} />
            <View style={{ width: wp('65'), }} >
                <Text style={styles.labelStyle} >{message}</Text>
                <Text style={[styles.labelStyle, { color: '#888888', marginTop: 3 }]} >{moment(createdAt).format('HH:mm A')}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default notifyItem

const styles = StyleSheet.create({
    container: {
        width: wp('90'),
        height: 70,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#15488F1A',
        borderRadius: 4,
        shadowColor: '#00000080',
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 4,
        shadowOpacity: 0.26,
        elevation: 5,
        marginTop: 8
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
    labelStyle: {
        color: '#2C2C2C',
        fontSize: wp('4.2'),
        fontFamily: FONTS.SFRegular
    }
})
