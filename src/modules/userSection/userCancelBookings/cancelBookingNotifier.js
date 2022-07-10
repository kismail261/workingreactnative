/**
 * @format
 */
import React from 'react';
import { View, Text, StyleSheet, Image, ImageBackground } from 'react-native';

import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Btn from '../../../common/meduimBtnSP';
import { FONTS, ICONS } from '../../../constant';


const cancelBookingNotifier = props => {
    const detail = props.route.params.detail

    return (
        <View style={styles.container}>
            <ImageBackground source={ICONS.elips} style={{ width: 124, height: 124, justifyContent: 'center', alignItems: 'center', marginBottom: 25 }}>
                <ImageBackground source={ICONS.ellipseGreen} style={{ width: 82, height: 82, justifyContent: 'center', alignItems: 'center' }}>
                    <Image source={ICONS.tick} style={{ width: 32, height: 25 }} resizeMode="contain" />
                </ImageBackground>
            </ImageBackground>
            <Text style={styles.headingStyle}>Cancel Booking Request</Text>

            <Text style={styles.subHeading}>
                We have received your request to cancel the event <Text onPress={() => { }} style={{ fontFamily: FONTS.SFBold, color: '#000000' }} >{detail.listing.title}.</Text>
            </Text>
            <Text style={styles.subHeading}>
                You will hear back from us once we have confirmation from the Provider
            </Text>
            <View style={{ paddingVertical: 30 }}></View>

            <View style={{ alignSelf: 'center' }}>
                <Btn
                    label="Done"
                    onClick={() => {
                        props.navigation.navigate("bookingList")
                    }}
                    bgColor="#2C99C6"
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8FAFF',
        alignItems: 'center',
        justifyContent: 'center'
    },
    headingStyle: {
        width: wp('70'),
        color: '#000000',
        fontSize: wp('5'),
        fontFamily: FONTS.SFBold,
        textAlign: 'center'
    },
    innerHeading: {
        width: wp('80'),
        color: '#000000',
        fontSize: wp('5'),
        fontFamily: FONTS.SFBold,
        marginTop: Platform.OS == 'android' ? 12 : 19,
    },
    subHeading: {
        width: wp('70'),
        color: '#707070',
        fontSize: wp('3.3'),
        fontFamily: FONTS.SFRegular,
        marginTop: 8,
        marginBottom: Platform.OS == 'android' ? 8 : 8,
        textAlign: 'center'
    },
    boldSubHeading: {
        width: wp('85'),
        color: '#707070',
        fontSize: wp('4'),
        fontFamily: FONTS.SFBold,
        marginTop: 8,
        marginBottom: Platform.OS == 'android' ? 8 : 8,
    },
    inputHeading: {
        color: '#000000',
        fontSize: wp('4'),
        fontFamily: FONTS.SFBold,
        marginTop: Platform.OS == 'android' ? 10 : 18,
    },
    inputSubHeading: {
        color: '#707070',
        fontSize: wp('3.5'),
        fontFamily: FONTS.SFRegular,
        marginTop: 8,
        marginBottom: Platform.OS == 'android' ? 8 : 8,
    },
});

export default cancelBookingNotifier;
