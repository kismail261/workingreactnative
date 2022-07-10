import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { COLORS, FONTS, ICONS } from '../../../../constant'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'


export const ReviewItem = ({ index }) => {
    return (
        <View style={[styles.container, { marginRight: 12 }]}>
            <View style={styles.userRowStyle}>
                <Image source={ICONS.userIcon} style={{ width: 35, height: 35 }} />
                <View style={{ width: '76%', marginLeft: '3%' }} >
                    <Text style={styles.nameStyle}>Hyman Rutherford</Text>
                    <Text style={styles.timeStyle}>2 days ago</Text>
                </View>
            </View>
            <Text numberOfLines={4} style={styles.commentStyle} >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</Text>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        width: 270,
        height: 153,
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#15488F26',
        borderRadius: 7,
        shadowColor: '#00000080',
        shadowOffset: { width: 0, height: 1 },
        elevation: 10,
        shadowRadius: 4,
        shadowOpacity: 0.26,
        alignItems: 'center',
        paddingVertical: 12
    },
    userRowStyle: {
        width: '90%',
        flexDirection: 'row',
        alignItems: 'center'
    },
    nameStyle: {
        color: COLORS.secondary,
        fontFamily: FONTS.SFMedium,
        fontSize: wp('4')
    },
    timeStyle: {
        color: COLORS.secondary,
        fontFamily: FONTS.SFMedium,
        fontSize: wp('3.5'),
        opacity: 0.6
    },
    commentStyle: {
        width: '90%',
        color: COLORS.secondary,
        fontFamily: FONTS.SFRegular,
        fontSize: wp('3.5'),
        marginTop: 10,
    }
})