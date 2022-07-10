import React from 'react'
import { StyleSheet, Platform, View, Image, TouchableOpacity } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { ICONS } from '../../../constant'

const headerLogoBI = ({ navigation }) => {
    return (
        <View style={styles.headerStyle}>
            <Image source={ICONS.sporforyaIcon} style={styles.logoStyle} />
            <View style={{ width: wp('5') }} />
            <Image style={styles.msgIconStyle} resizeMode="contain" />
            <TouchableOpacity onPress={() => navigation.navigate("Notifications")}>
                <Image source={ICONS.notificationIcon} style={styles.bellIconStyle} resizeMode="contain" />
            </TouchableOpacity>
        </View>
    )
}

export default headerLogoBI;

const styles = StyleSheet.create({
    headerStyle: {
        width: wp("90"),
        flexDirection: 'row',
        height: 65,
        alignItems: 'center',
        justifyContent: 'space-between',
        top: Platform.OS == "ios" ? 30 : 0,
        borderBottomColor: '#70707026',
        borderBottomWidth: 0.7
    },
    logoStyle: {
        width: 183,
        height: 32,
    },
    msgIconStyle: {
        width: wp('9'),
        height: wp('5.7')
    },
    bellIconStyle: {
        width: wp('5.7'),
        height: wp('7')
    }
});
