import React from 'react'
import { StyleSheet, Text, View, ScrollView, Image, ImageBackground } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { FONTS, ICONS } from '../../constant'
import LargeBtn from '../../common/largeBtnSP'

const thankYouNote = (props) => {
    const listingId = props.route.params.listingId

    return (
        <View style={styles.container} >
            <ScrollView contentContainerStyle={{ flex: 0.8 }} >
                <View style={{ flex: 1, width: wp('90'), alignItems: 'center', justifyContent: 'center' }}>
                    <ImageBackground source={ICONS.elips} style={{ width: 124, height: 124, justifyContent: 'center', alignItems: 'center' }}>
                        <ImageBackground source={ICONS.ellipseGreen} style={{ width: 82, height: 82, justifyContent: 'center', alignItems: 'center' }}>
                            <Image source={ICONS.tick} style={{ width: 32, height: 25 }} resizeMode="contain" />
                        </ImageBackground>
                    </ImageBackground>
                    <Text style={styles.headingStyle} >Thank You</Text>
                    <Text style={styles.detail} >Booking canceled successfully</Text>
                </View>
            </ScrollView>
            <View style={{ position: 'absolute', bottom: 30, alignSelf: 'center' }} >
                <LargeBtn label="OK" onClick={() => { props.navigation.navigate("listBookings", { listingId: listingId }) }} bgColor="#2C99C6" />
            </View>
        </View>
    )
}

export default thankYouNote

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8FAFF',
        alignItems: 'center'
    },
    headingStyle: {
        width: wp('90'),
        color: "#000000",
        fontSize: wp('7'),
        fontFamily: FONTS.SFSemiBold,
        marginTop: 8,
        textAlign: 'center'
    },
    detail: {
        width: wp('90'),
        color: "#000000",
        fontSize: wp('4'),
        fontFamily: FONTS.SFBold,
        marginTop: 3,
        textAlign: 'center'
    },
    cancelFor: {
        width: wp('90'),
        color: "#808080",
        fontSize: wp('3.5'),
        fontFamily: FONTS.SFSemiBold,
        marginTop: 20
    },
    userDetailContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8,
        borderWidth: 1,
        borderColor: '#EAEAEA',
        borderRadius: 4,
        alignSelf: 'flex-start',
        marginTop: 6
    },
    nameStyle: {
        color: "#000000",
        fontSize: 10,
        fontFamily: FONTS.SFSemiBold,
    },
    inputStyle: {
        width: wp('90'),
        height: 140,
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#E6E6E6',
        borderRadius: 7,
        marginTop: 5
    }
})
