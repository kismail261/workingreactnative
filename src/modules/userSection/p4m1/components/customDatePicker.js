import React, { useState } from 'react'
import { TouchableOpacity, StyleSheet, Text, View, Image } from 'react-native'
import DatePicker from 'react-native-date-picker'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { FONTS, ICONS } from '../../../../constant'
import moment from 'moment';

export default ({ value, getValue }) => {
    const [open, setOpen] = useState(false)
    const preMonth = () => {
        var pre = new Date(value);
        pre.setDate(pre.getDate() - 1);
        getValue(pre)
    }

    const nextMonth = () => {
        var pre = new Date(value);
        pre.setDate(pre.getDate() + 1);
        getValue(pre)
    }


    return (
        <>
            <View style={styles.container} >
                <TouchableOpacity onPress={() => setOpen(true)} style={styles.dateContainer} >
                    <Text style={styles.valueStyle} >{moment(value).format('dd, DD MMM')}</Text>
                </TouchableOpacity>

                <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                    <TouchableOpacity onPress={() => preMonth()}>
                        <Image source={ICONS.preDate} style={{ width: 5, height: 10 }} />
                    </TouchableOpacity>
                    <View style={{ width: 15 }} />
                    <TouchableOpacity onPress={() => nextMonth()}>
                        <Image source={ICONS.nextDate} style={{ width: 5, height: 10 }} />
                    </TouchableOpacity>
                </View>
            </View>

            <DatePicker
                modal
                mode="date"
                open={open}
                date={value}
                onConfirm={(date) => {
                    setOpen(false)
                    getValue(date)
                }}
                onCancel={() => {
                    setOpen(false)
                }}
            />
        </>
    )
}
const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 46,
        backgroundColor: '#FFFFFF',
        borderColor: '#15488F26',
        borderWidth: 1,
        borderRadius: 4,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        // marginTop: 12,
        paddingLeft: 10,
        paddingRight: 10
    },
    dateContainer: {
        width: wp('60'),
        height: 44,
        justifyContent: 'center',
    },
    valueStyle: {
        color: '#707070',
        fontSize: wp('3'),
        fontFamily: FONTS.SFRegular
    }
})