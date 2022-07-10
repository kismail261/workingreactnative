import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { FONTS, ICONS } from '../../../../constant'


const insuranceDoc = () => {
    return (
        <View style={styles.container} >
            <Text style={styles.labelStyle} >Insurance Document</Text>
            {/* <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                <Image source={ICONS.docBlue} style={{ width: wp('8'), height: wp('8'), }} resizeMode="contain"   />
                <View style={{ marginLeft: 8 }} >
                    <Text style={styles.dateStyle} >insurance_file.pdf</Text>
                    <Text style={styles.timeStyle} >53 kb</Text>
                </View>
            </View> */}
        </View>
    )
}

export default insuranceDoc

const styles = StyleSheet.create({
    container: {
        width: wp('85'),
        alignItems: 'center',
        marginTop: 20,
    },
    labelStyle: {
        width: wp('85'),
        color: '#000000',
        fontFamily: FONTS.SFBold,
        fontSize: wp('4.5'),
    },
    dateStyle: {
        width: wp('65'),
        color: '#000000',
        fontFamily: FONTS.SFMedium,
        fontSize: wp('2.8'),
        marginBottom: 3
    },
    timeStyle: {
        width: wp('70'),
        color: '#707070',
        fontFamily: FONTS.SFMedium,
        fontSize: wp('2.2'),
        marginBottom: 6
    },
})
