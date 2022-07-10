import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View, } from 'react-native'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { FONTS, ICONS } from '../../../constant'

const virtualCard = ({ value, onClick, title }) => {
    return (
        <TouchableOpacity onPress={() => onClick(!value)} style={styles.container} >
            {
                value
                    ?
                    <Image source={ICONS.greenTick} style={[styles.box, { opacity: 1 }]} />
                    :
                    <View style={styles.box} />
            }

            <Image source={ICONS.virtualOnline} style={{ width: 80, height: 70, borderRadius: 4 }} />
            <View style={{ marginLeft: 5 }} >
                <Text style={styles.headingStyle} >{title}</Text>
                <Text style={styles.descStyle} >Note : you don't need to select a physical location</Text>
            </View>
        </TouchableOpacity>
    )
}

export default virtualCard

const styles = StyleSheet.create({
    container: {
        width: wp('80'),
        height: 100,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        marginTop: 20,
        borderWidth: 1,
        borderColor: '#15488F26',
        borderRadius: 4,
        padding: 6
    },
    headingStyle: {
        width: wp('45'),
        color: '#000000',
        fontSize: wp('3.5'),
        fontFamily: FONTS.SFMedium,
        marginBottom: 8
    },
    descStyle: {
        width: wp('45'),
        color: '#707070',
        fontSize: wp('2.9'),
        fontFamily: FONTS.SFRegular,
        opacity: 0.5
    },
    box: {
        backgroundColor: '#707070',
        width: 14,
        height: 14,
        borderRadius: 14,
        position: 'absolute',
        right: 10,
        top: 18,
        opacity: 0.3
    }

})
