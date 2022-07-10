import React,{useEffect} from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { FONTS, ICONS, ImageUrl } from '../../../constant'


const detailItem = ({ detail}) => {

    useEffect(() => {
        return () => {
            
        }
    }, [])

    return (
        <View style={styles.container} >
            <View style={{ flexDirection: 'row', alignItems: 'center', padding: 12, }} >
                <Image source={ ICONS.providerGallery} style={{ width: 70, height: 70, borderRadius: 4, }} />
                <View>
                    <Text style={styles.titleStyle} >{detail.title}</Text>
                    <Text style={styles.labelStyle}>{detail.listingType}</Text>
                </View>
            </View>
        </View>
    )
}

export default detailItem

const styles = StyleSheet.create({
    container: {
        width: wp('90'),
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#15488F26',
        borderRadius: 4,
        marginTop: 15,
        marginBottom: 15,
        alignItems: 'center',
        elevation:1
    },
    titleStyle: {
        width: wp("65"),
        color: '#000000',
        fontSize: wp('5'),
        fontFamily: FONTS.SFBold,
        marginLeft: 8
    },
    labelStyle: {
        width: wp("65"),
        color: '#000000',
        fontSize: wp('3'),
        fontFamily: FONTS.SFRegular,
        marginLeft: 8
    },
    
})
