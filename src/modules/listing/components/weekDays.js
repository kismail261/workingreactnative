import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { FONTS } from '../../../constant'


const weekDays = ({ days, getValue }) => {
    const [weekDays, setWeekDays] = useState(["S", "M", "T", "W", "T", "F", "S"])
 

    const onClick = (value) => {
        if (days.includes(value)) {
            let temp = days.filter(item => item != value)
            getValue(temp)
        } else {
            getValue([...days, value])
        }

    }

    return (
        <View style={{ width: wp('80'), marginTop: 12 }} >
            <Text style={styles.labelStyle} >Repeats on</Text>
            <View style={{ width: wp('80'), flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                {
                    weekDays.map((item, index) => {
                        return (
                            <TouchableOpacity onPress={() => { onClick(index) }} key={index} style={{ width: wp(10), height: wp('10'), backgroundColor: days.includes(index) ? "#95CCE2" : '#E4E6EA', borderRadius: wp('5'), justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ color: days.includes(index) ? "#FFFFFF" : '#707070', fontSize: wp('3.2'), fontFamily: FONTS.SFMedium }} >{item}</Text>
                            </TouchableOpacity>
                        )
                    })
                }

            </View>
        </View>
    )
}

export default weekDays

const styles = StyleSheet.create({
    labelStyle: {
        width: '100%',
        color: '#000000',
        fontSize: wp('4'),
        fontFamily: FONTS.SFSemiBold,
        marginBottom: 6
    },
})