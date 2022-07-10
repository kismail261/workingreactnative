import React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { FONTS, ICONS, ImageUrl } from '../../../../constant'
import AsyncStorage from '@react-native-async-storage/async-storage';


const bookingRRBCard = ({ navigation, detail }) => {

    const nextClick = async () => {
        try {
            await AsyncStorage.setItem('@ratingNext', "2")
            navigation.navigate("userReviewStack", { listDetail: detail })
        } catch (e) {
        }
    }


    return (
        <View style={styles.container} >
            <View style={{ flexDirection: 'row', padding: 12, }} >
                <Image source={detail.listing.images.length > 0 ? { uri: ImageUrl + detail.listing.images } : ICONS.providerGallery} style={{ width: wp('15'), height: wp('15'), borderRadius: 4, marginTop: 6 }} />
                <View>
                    <Text numberOfLines={2} style={styles.titleStyle} >{detail.listing.title}</Text>
                    <Text numberOfLines={1} style={styles.labelStyle}>{detail.provider.Profile.name != undefined ? detail.provider.Profile.name : 'n/a'}</Text>
                    <Text numberOfLines={2} style={styles.addressStyle}>{detail.listing.location != undefined ? detail.listing.location.description : 'n/a'}</Text>
                </View>
            </View>
            <TouchableOpacity onPress={nextClick} style={{ width: '100%', height: 30, alignItems: 'center', justifyContent: 'center', borderTopColor: '#15488F26', borderTopWidth: 1 }}>
                <Text style={styles.takingStyle} >Rate and Write a Review</Text>
            </TouchableOpacity>
        </View>
    )
}

export default bookingRRBCard

const styles = StyleSheet.create({
    container: {
        width: wp('85'),
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#15488F26',
        borderRadius: 4,
        marginTop: 15,
        marginBottom: 15,
        alignItems: 'center',
        elevation: 1
    },
    titleStyle: {
        width: wp("60"),
        color: '#000000',
        fontSize: wp('5'),
        fontFamily: FONTS.SFBold,
        marginLeft: 8
    },
    labelStyle: {
        width: wp("60"),
        color: '#000000',
        fontSize: wp('3'),
        fontFamily: FONTS.SFSemiBold,
        marginLeft: 8
    },
    addressStyle: {
        width: wp("60"),
        color: '#000000',
        fontSize: wp('2.3'),
        fontFamily: FONTS.SFRegular,
        marginLeft: 8
    },
    takingStyle: {
        color: '#2C99C6',
        fontSize: wp('2.6'),
        fontFamily: FONTS.SFRegular,
    },


})
