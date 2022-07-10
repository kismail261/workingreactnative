import moment from 'moment'
import React, { useEffect } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { FONTS, ICONS } from '../../../constant'


const practiceScheduleItem = ({ data, navigation, onDuplicate, listId }) => {

    useEffect(() => {
        return () => {
        }
    }, [])

    return (
        <View style={styles.card} >
            <View style={styles.rowStyle}>
                <Text numberOfLines={1} style={styles.locationName} >{data.name}</Text>
                <TouchableOpacity 
                onPress={() => navigation.navigate('Create New Listing',{screen:'updateSchedulePrice',params:{ data: data, recordId:listId }})} >
                    <Image source={ICONS.editableIconBlue} style={{ width: 16, height: 16, marginLeft: 5 }} />
                </TouchableOpacity>

            </View>
            <Text style={styles.dateStyle} >Date : {moment(data.duration.start).format('dd, DD MMM')} - {moment(data.duration.end).format('dd, DD MMM')}</Text>
            <View style={{ height: 7 }} />
            <View style={styles.rowStyle}>
                <Text style={styles.timeStyle} >Time: {moment(data.duration.start).format('hh:mm A')} - {moment(data.duration.end).format('hh:mm A')}</Text>
              {data.repeat.isRepeat == true? <TouchableOpacity onPress={() => onDuplicate(data)} >
                    <Text style={styles.duplicateBtn} >Duplicate</Text>
                </TouchableOpacity>:<></>}
            </View>
        </View>
    )
}

export default practiceScheduleItem

const styles = StyleSheet.create({
    card: {
        width: wp('80%'),
        shadowColor: '#00000080',
        shadowOffset: { width: 0, height: 1 },
        elevation: 10,
        shadowRadius: 4,
        shadowOpacity: 0.26,
        backgroundColor: '#FFFFFF',
        borderRadius: 4,
        marginTop: 10,
        borderColor: '#15488F26',
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 16,
        paddingBottom: 16

    },
    rowStyle: {
        width: wp('72'),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    locationName: {
        width: wp('65'),
        fontSize: wp('4.2'),
        fontFamily: FONTS.SFBold,
        color: '#000000',
    },

    dateStyle: {
        width: wp('72'),
        fontSize: wp('2.2'),
        fontFamily: FONTS.SFRegular,
        color: '#000000',
        opacity: 0.5,
        marginTop: 5
    },
    timeStyle: {

        fontSize: wp('2.2'),
        fontFamily: FONTS.SFRegular,
        color: '#000000',
        opacity: 0.5,
    },
    duplicateBtn: {
        fontSize: wp('2.8'),
        fontFamily: FONTS.SFRegular,
        color: 'rgba(44, 153, 198, 1)',
    }
})
