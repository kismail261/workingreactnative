import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View, } from 'react-native'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { FONTS, ICONS } from '../../../constant'

const listItemCard = ({ data, onClick }) => {

    return (
        <View style={styles.container} >
            <View style={{ width: '95%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }} >
                <Text style={styles.headingStyle} >{data.title}</Text>
                <Image source={ICONS.greenTick} style={styles.box} />
            </View>
            <View style={{ width: '95%', flexDirection: 'row', alignItems: 'center', marginTop: 8 }} >
                <Image source={ICONS.address} style={{ width: 10, height: 10 }} resizeMode={"contain"} />
                <Text numberOfLines={1} style={styles.descStyle} >{data.location && data.location.description}</Text>
            </View>
            <View style={{ width: '95%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 6 }} >
                <Text style={styles.labelStyle} >{data.schedules && data.schedules[0].name}</Text>
                <Text onPress={() => onClick()} style={styles.editStyle} >Edit</Text>
            </View>
        </View>
    )
}

export default listItemCard

const styles = StyleSheet.create({
    container: {
        elevation: 2,
        width: wp('80'),
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderWidth: 0.5,
        borderColor: '#15488F26',
        borderRadius: 4,
        padding: 8,
        marginTop: 30
    },
    headingStyle: {
        width: wp('45'),
        color: '#000000',
        fontSize: wp('4.5'),
        fontFamily: FONTS.SFBold,
    },
    descStyle: {
        width: '87%',
        color: '#707070',
        fontSize: wp('2.9'),
        fontFamily: FONTS.SFRegular,
        marginLeft: 5,
        marginBottom: 3
    },
    box: {
        width: 14,
        height: 14,
    },
    labelStyle: {
        color: '#707070',
        fontSize: wp('2.9'),
        fontFamily: FONTS.SFMedium,
    },
    editStyle: {
        color: '#2C99C6',
        fontSize: wp('2.9'),
        fontFamily: FONTS.SFRegular,
    },

})
