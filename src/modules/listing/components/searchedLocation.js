import React, { useState } from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { FONTS, ICONS } from '../../../constant'

const searchedLocation = () => {

    const [location, setLocation] = useState([
        {
            label: "Grand hall ground",
            desc: "4750 W Birchwood Dr, Shawano, WI, 54166"
        },
        {
            label: "Football Courtyard",
            desc: "8470 Bedford Rd, Pasadena, MD, 21122"
        },
        {
            label: "Sports Club",
            desc: "11 Beach Rd, Marcellus, NY, 13108"
        },
        {
            label: "Set location on map",
            desc: ""
        },
    ])

    return (
        <View style={styles.container} >
            <Text style={styles.headingStyle} >Search results</Text>
            {
                location.map((item, index) => {
                    return (
                        <View key={index} style={styles.locationRow}>
                            <Image source={ICONS.markerIcon} style={{ width: 10, height: 15 }} resizeMode={"contain"} />
                            <View>
                                <Text style={styles.labelStyle} >{item.label}</Text>
                                {
                                    item.desc != ""
                                        ?
                                        <Text style={styles.detailStyle} >{item.desc}</Text>
                                        :
                                        null
                                }

                            </View>
                        </View>
                    )
                })
            }

        </View>
    )
}

export default searchedLocation

const styles = StyleSheet.create({
    container: {
        width: wp('80'),
        alignItems: 'center'
    },
    headingStyle: {
        width: wp('80'),
        color: '#000000',
        fontSize: wp('3.5'),
        fontFamily: FONTS.SFSemiBold
    },
    locationRow: {
        width: wp('80'),
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 12,
        justifyContent: 'space-between',
        borderBottomColor: '#70707026',
        borderBottomWidth: 0.7,
        paddingBottom: 12
    },
    labelStyle: {
        width: wp('73'),
        color: '#000000',
        fontSize: wp('3.5'),
        fontFamily: FONTS.SFMedium,
    },
    detailStyle: {
        width: wp('73'),
        color: '#707070',
        fontSize: wp('3'),
        fontFamily: FONTS.SFMedium,
        opacity: 0.5,
        marginTop: 3
    },
})
