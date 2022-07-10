import React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import { CommonActions } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { FONTS, ICONS } from '../../../constant'
import { useDispatch } from 'react-redux';
import { setUserMode } from '../../../redux/user/user.action';



const switchUser = ({ navigation }) => {
    const dispatch = useDispatch();


    function onSwapPress() {
        dispatch(setUserMode(true))
        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{ name: 'mainRoutes' }],
            }),
        );
    }

    return (
        <View style={styles.container} >
            <Text style={styles.subHeadingStyle} >You are currently in Provider Mode</Text>
            <View style={styles.switchRow}>
                <Text style={styles.heading} >Switch to User</Text>
                <TouchableOpacity onPress={onSwapPress} >
                    <Image source={ICONS.switchAccountIcon} style={{ width: 15, height: 15 }} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default switchUser

const styles = StyleSheet.create({
    container: {
        width: wp('90'),
        marginTop: 20
    },
    subHeadingStyle: {
        width: '100%',
        color: '#000000',
        opacity: 0.5,
        fontSize: wp('2.8'),
        fontFamily: FONTS.SFRegular,
    },
    switchRow: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 6
    },
    heading: {
        width: '85%',
        color: '#000000',
        fontSize: wp('4.2'),
        fontFamily: FONTS.SFBold,
    },
})
