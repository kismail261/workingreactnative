import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS, FONTS, ICONS } from '../../../constant'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import Header from "../../../common/headerBL";

export const ViewPolicies = ({ navigation, route }) => {
    const detail = route.params.detail
    return (
        <View style={styles.container}>
            <Header navigation={navigation} label={"Cancellation Policy"} />
            <View style={{width:'85%', marginTop:22}} >
                <Text style={styles.labelStyle} >Please read the cancellation policy</Text>
                <View style={{height:30}} />
                <Text style={styles.detailStyle}>{detail}</Text>
            </View>
            
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center'
    },
    labelStyle:{
        width: '85%',
        color:COLORS.secondary,
        fontSize: wp(6),
        fontFamily: FONTS.SFSemiBold
    },
    detailStyle:{
        width: '85%',
        color: COLORS.secondary,
        fontSize: wp(4),
        fontFamily: FONTS.SFRegular
    }
})