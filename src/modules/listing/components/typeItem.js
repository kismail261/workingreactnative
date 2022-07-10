import React, { useEffect } from 'react'
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity } from 'react-native'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen'
import { FONTS, ICONS } from '../../../constant'


const typeItem = ({ data, navigation, }) => {
    const { icon, label, description, id } = data

    const onClick = () => {
        if (id == 1) {
            // navigation.navigate('publishListing')
            navigation.navigate('addServiceDetail')
            
        } else if (id == 2) {
            navigation.navigate('addEventDetail')
            // navigation.navigate('schedulePriceEvents')
        } else{
            navigation.navigate('addFacilityDetail')
            // navigation.navigate('publishListing')
        }
    }

    return (
        <TouchableOpacity style={styles.container} onPress={() => { onClick() }} >
            <ImageBackground source={icon} style={styles.bgcontainer} >
                <View style={{ position: 'absolute', bottom: 20, left: 15 }} >
                    <Text style={styles.headingStyle} >{label}</Text>
                    <Text style={styles.descStyle} >{description}</Text>
                </View>
            </ImageBackground>
        </TouchableOpacity>
    )
}

export default typeItem

const styles = StyleSheet.create({
    container: {
        width: wp('85'),
        height: 170,
        borderRadius: 4,
        backgroundColor: '#FFFFFF',
        overflow: 'hidden',
        marginBottom: 16
    },
    bgcontainer: {
        width: wp('86'),
        height: 175,
    },
    headingStyle: {
        color: '#FFFFFF',
        fontSize: wp('4'),
        fontFamily: FONTS.SFBold
    },
    descStyle: {
        color: '#FFFFFF',
        fontSize: wp('3'),
        fontFamily: FONTS.SFRegular
    }
})
