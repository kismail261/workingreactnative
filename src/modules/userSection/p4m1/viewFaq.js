import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { COLORS, FONTS, ICONS } from '../../../constant'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import Header from "../../../common/headerBL";

export const ViewFaq = ({ navigation, route }) => {
    const detail = route.params.detail

    useEffect(() => {
        console.log("detail: ", detail)
        return () => {

        }
    }, [])


    return (
        <View style={styles.container}>
            <Header navigation={navigation} label={"Frequently Asked Questions"} />
            {
                detail.map((item, index) => {
                    return (
                        <View key={index} style={{ width: '85%', marginTop: 22 }} >
                            <Text style={styles.labelStyle} >{item.question}</Text>
                            <View style={{ height: 20 }} />
                            <Text style={styles.detailStyle}>{item.answer}</Text>
                        </View>
                    )
                })
            }
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center'
    },
    labelStyle: {
        width: '85%',
        color: COLORS.secondary,
        fontSize: wp(6),
        fontFamily: FONTS.SFSemiBold
    },
    detailStyle: {
        width: '85%',
        color: COLORS.secondary,
        fontSize: wp(4),
        fontFamily: FONTS.SFRegular
    }
})