import React from 'react'
import { StyleSheet, Platform, View, Image, TouchableOpacity } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { ICONS } from '../../../../constant'

const index = ({ navigation }) => {
    return (
        <View style={styles.headerStyle}>
            <Image source={ICONS.logoSP} style={styles.logoStyle} />
            <View style={{ width: wp('5') }} />
            {/* <TouchableOpacity onPress={() => navigation.navigate("Message")} >
                <Image source={ICONS.msgIcon} style={styles.msgIconStyle} resizeMode="contain" />
            </TouchableOpacity> */}
            <TouchableOpacity onPress={() => navigation.navigate("notificationsList")}>
                <Image source={ICONS.notificationIcon} style={styles.bellIconStyle} resizeMode="contain" />
            </TouchableOpacity>
        </View>
    )
}

export default index;

const styles = StyleSheet.create({
    headerStyle: {
        width: wp("100"),
        flexDirection: 'row',
        height: 65,
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: Platform.OS == "ios" ? 30 : 0,
        borderBottomColor: '#70707026',
        borderBottomWidth: 1,
        paddingLeft: '5%',
        paddingRight: '8%'
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
