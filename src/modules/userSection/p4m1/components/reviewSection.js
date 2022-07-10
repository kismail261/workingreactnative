import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLORS, FONTS, ICONS } from '../../../../constant'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { ReviewItem } from './reviewItem'
import { getReview } from '../../../../redux/profile/profile.action'
import { useDispatch, useSelector } from 'react-redux'
import { setLoader } from '../../../../redux/loader/loader.action'


export const ReviewSection = ({ navigation, userId }) => {
    const dispatch = useDispatch();
    const reviewsList = useSelector(state => state.profile.reviewsList)


    useEffect(() => {
        dispatch(setLoader(false))
        dispatch(getReview(userId))
        return () => {
        }
    }, [])



    return (
        <View style={styles.container}>
            <View style={{ height: 16 }} />
            <View style={{ width: '90%', flexDirection: 'row', alignItems: 'center' }}>
                <Image source={ICONS.starIcon} style={{ width: 16, height: 15 }} />
                <Text style={styles.ratingCount}>  {reviewsList.length > 0 ? 6.7 : 3.5}<Text style={[styles.ratingCount, { fontSize: wp('3.5') }]}>/10</Text></Text>
                <Text style={styles.ratingCount} >   ({reviewsList.length} Reviews)</Text>
            </View>
            <View style={{ height: 16 }} />
            <ScrollView horizontal style={{ width: '100%' }} contentContainerStyle={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: '5%' }}>
                {
                    reviewsList.map((item, index) => {
                        return (
                            <ReviewItem key={index} index={index} />
                        )
                    })
                }
            </ScrollView>
            <View style={{ height: 16 }} />
            {
                reviewsList.length > 0
                    ?
                    <TouchableOpacity style={styles.btnStyle} onPress={() => navigation.navigate("AllReviewsUser", { userId: userId })} >
                        <Text style={styles.btnLableStyle} >View all Reviews</Text>
                    </TouchableOpacity>
                    :
                    null
            }
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
    },
    ratingCount: {
        color: COLORS.secondary,
        fontFamily: FONTS.SFBold,
        fontSize: wp('5.2')
    },
    btnStyle: {
        width: '90%',
        height: 50,
        borderWidth: 1,
        borderColor: '#000000',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnLableStyle: {
        color: COLORS.secondary,
        fontFamily: FONTS.SFRegular,
        fontSize: wp('3.5')
    },

})