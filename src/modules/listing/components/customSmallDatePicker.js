import React, { useState } from 'react'
import { TouchableOpacity, StyleSheet, Text, View, Image } from 'react-native'
import DatePicker from 'react-native-date-picker'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { FONTS, ICONS } from '../../../constant'
import moment from 'moment';
import { showMessage } from '../../../helpers/replaceDigitsWithAesteriks'

export default ({ value, getValue, start, end }) => {
    const [open, setOpen] = useState(false)

    const setDate = (value) => {
        const x = new Date(start);
        const z = new Date(end);
        const y = new Date(value);
        if (y < x) {
            showMessage("Repeat end should not less than start date", 'warning')
            getValue(start);
            setOpen(false)
        } else if (y > z) {
            showMessage("Repeat end should be less than end date", 'warning')
            getValue(end);
            setOpen(false)
        } else {
            getValue(value);
            setOpen(false)
        }

    }

    return (
        <>
            <TouchableOpacity onPress={() => setOpen(true)} style={styles.container} >
                <Text style={styles.valueStyle} >{moment(value).format('DD MMM, YYYY')}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                    <TouchableOpacity>
                        <Image source={ICONS.downArrow} style={{ width: 10, height: 10 }} resizeMode={'contain'} />
                    </TouchableOpacity>
                    <View style={{ width: 8 }} />
                </View>
            </TouchableOpacity>

            <DatePicker
                modal
                mode="date"
                open={open}
                date={value}
                onConfirm={(date) => {
                    setDate(date)
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
        width: wp('37.5'),
        height: 30,
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
    valueStyle: {
        color: '#707070',
        fontSize: wp('3'),
        fontFamily: FONTS.SFRegular
    }
})