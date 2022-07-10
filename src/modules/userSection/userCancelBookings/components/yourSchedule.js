import moment from 'moment'
import React, { useEffect } from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { FONTS, ICONS } from '../../../../constant'


const yourSchedule = ({ detail }) => {

    useEffect(() => {
        return () => {

        }
    }, [])

    return (
        <View style={styles.container} >
            <Text style={styles.labelStyle} >Your Schedule</Text>
            <View style={{ width: '100%', flexDirection: 'row', }}>
                <Image source={ICONS.calendar} style={{ width: 14, height: 14, marginTop: 3 }} />
                {
                    detail.listing.schedules.length > 0
                        ?
                        <View style={{ marginLeft: 5 }} >
                            <Text style={styles.dateStyle} >{moment(detail.listing.schedules[0].duration.start).format('ddd DD MMM')} - {moment(detail.listing.schedules[0].duration.end).format('ddd DD MMM')} {moment(detail.listing.schedules[0].duration.end).format('YYYY')}</Text>
                            <Text style={styles.timeStyle} > {moment(detail.listing.schedules[0].duration.start).format('hh:mm A')} - {moment(detail.listing.schedules[0].duration.end).format('hh:mm A')}</Text>
                        </View>
                        :
                        <View style={{ marginLeft: 5 }} >
                            <Text style={styles.dateStyle} >n/a - n/a</Text>
                            <Text style={styles.timeStyle} >n/a - n/a</Text>
                        </View>
                }

            </View>
        </View>
    )
}

export default yourSchedule

const styles = StyleSheet.create({
    container: {
        width: wp('85'),
        alignItems: 'center',
        marginTop: 8,
    },
    labelStyle: {
        width: wp('85'),
        color: '#000000',
        fontFamily: FONTS.SFBold,
        fontSize: wp('4.5'),
        marginBottom: 6
    },
    dateStyle: {
        width: wp('70'),
        color: '#000000',
        fontFamily: FONTS.SFMedium,
        fontSize: wp('3.2'),
        marginBottom: 6
    },
    timeStyle: {
        width: wp('70'),
        color: '#707070',
        fontFamily: FONTS.SFMedium,
        fontSize: wp('2.4'),
        marginBottom: 6
    },
})
