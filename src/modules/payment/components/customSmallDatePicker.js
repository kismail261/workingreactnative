import React, { useState } from 'react'
import { TouchableOpacity, StyleSheet, Text, View, Image } from 'react-native'
import DatePicker from 'react-native-date-picker'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { FONTS, ICONS } from '../../../constant'
import moment from 'moment';

export default ({ value, getValue }) => {
    const [open, setOpen] = useState(false)

    return (
        <>
            <TouchableOpacity onPress={() => setOpen(true)} style={styles.container} >
                <Text style={styles.valueStyle} >{moment(value).format('dd, DD MMM')}</Text>
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
        width: wp('37.5'),
        height: 40,
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