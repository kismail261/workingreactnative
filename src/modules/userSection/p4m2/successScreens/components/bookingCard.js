import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, View, Text } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { FONTS, ICONS, ImageUrl } from '../../../../../constant';


export const BookingCard = ({ detail }) => {

    useEffect(() => {

    }, [])

    return (
        <View style={styles.main}>
            <Text style={[styles.event, { marginBottom: 7 }]}>
                {detail.listing.title}
            </Text>
            <View style={styles.row}>
                <Image source={ICONS.calendar} style={{ width: 12, height: 12, marginTop: 3 }} />
                <View style={{ width: '92.5%' }} >
                    <Text style={styles.dateStyle} >{moment(detail.scheduleDetail[0].duration.start).format('ddd, DD MMM')}
                        {' '}-{' '}
                        {moment(detail.scheduleDetail[0].duration.end).format('ddd, DD MMM')}</Text>
                    <Text style={styles.timeStyle} >{moment(detail.scheduleDetail[0].duration.start).format('hh:mm :A')}
                        {' '}-{' '}
                        {moment(detail.scheduleDetail[0].duration.end).format('hh:mm A')}</Text>
                </View>
            </View>
            <View style={{ height: 7 }} />
            <View style={styles.row}>
                <Image source={ICONS.pinBlue} style={{ width: 12, height: 12, marginTop: 1 }} resizeMode='contain' />
                <View style={{ width: '92.5%' }} >
                    <Text style={styles.address} >{detail.listing.location == undefined ? 'n/a' : detail.listing.location.shortName}</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    main: {
        width: wp('80'),
        backgroundColor: 'white',
        alignItems: 'center',
        borderColor: '#15488F26',
        borderWidth: 1,
        borderRadius: 4,
        justifyContent: 'center',
        padding: 6
    },
    row: {
        flexDirection: 'row',
        width: '95%',
        justifyContent: 'space-between'
    },
    event: {
        width: '95%',
        fontSize: wp('5'),
        color: '#000000',
        fontFamily: FONTS.SFBold
    },
    dateStyle: {
        width: '100%',
        fontSize: wp('3'),
        color: '#000000',
        fontFamily: FONTS.SFMedium
    },
    timeStyle: {
        width: '100%',
        fontSize: wp('2.5'),
        color: '#707070',
        fontFamily: FONTS.SFMedium
    },
    address: {
        fontFamily: FONTS.SFRegular,
        fontSize: wp('2.5'),
        color: '#000000'
    },
});
