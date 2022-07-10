import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { FONTS, ICONS } from '../../../constant'


const noMsg = () => {
    return (
        <View style={styles.container} >
            <View style={{ alignItems: 'center' }} >
                <Image source={ICONS.noMsgIcon} style={{ width: wp('50'), height: wp('40') }} resizeMode={'contain'} />
                <Text style={styles.heading} >No Messages</Text>
                <Text style={styles.desc} >You don't have any messages.</Text>
            </View>
        </View>
    )
}

export default noMsg


const styles = StyleSheet.create({
    container: {
        flex: 0.7,
        alignItems: 'center',
        backgroundColor: '#F8FAFF',
        justifyContent: 'center',
    },
    heading: {
        width: wp('85%'),
        color: '#2A2A2A',
        fontSize: wp('6.5'),
        fontFamily: FONTS.SFBold,
        textAlign: 'center',
        marginTop: -15
    },
    desc: {
        width: wp('68%'),
        color: '#181818',
        fontSize: wp('4.2'),
        fontFamily: FONTS.SFRegular,
        textAlign: 'center',
        marginTop: 10
    },

})

