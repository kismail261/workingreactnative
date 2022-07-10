import axios from 'axios'
import moment from 'moment'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, ActivityIndicator } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { useSelector } from 'react-redux'
import { FONTS, ICONS, ImageUrl, Url } from '../../../../constant'
import { showMessage } from '../../../../helpers/replaceDigitsWithAesteriks'


const bookingCancelCard = ({ detail }) => {
    const token = useSelector(state => state.user.token)
    const [bookingDetail, setBookingDetail] = useState(null)
    const [loader, setLoader] = useState(true)
    const [charges, setCharges] = useState(0)


    useEffect(() => {
        getBookingDetail()
        return () => {
        }
    }, [])

    const getBookingDetail = () => {
        let headers = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        };
        axios.get(`${Url}api/booking/${detail._id}`,
            { headers: headers }
        ).then(resp => {
            let response = resp.data
            let tempCharges = ((2 / 100) * response.totalPrice)
            setCharges(tempCharges)
            setBookingDetail(response)
            setLoader(false)
        }).catch(error => {
            const err = error
            if (err.response) {
                showMessage(err.response.data.message)
            }
            setLoader(false)
        });
    };


    return (
        <View>
            {
                loader
                    ?
                    <ActivityIndicator size={"small"} color={"#000000"} />
                    :
                    <View style={styles.container} >
                        <View style={{ flexDirection: 'row', padding: 12, }} >
                            <Image source={detail.listing.images.length > 0 ? { uri: ImageUrl + detail.listing.images[0] } : ICONS.providerGallery} style={{ width: wp('15'), height: wp('15'), borderRadius: 4, marginTop: 6 }} />
                            <View>
                                <Text numberOfLines={2} style={styles.titleStyle} >{detail.listing.title}</Text>
                                <Text numberOfLines={1} style={styles.labelStyle}>{detail.provider.Profile.name != undefined ? detail.provider.Profile.name : 'n/a'}</Text>
                                <Text numberOfLines={2} style={styles.addressStyle}>{detail.listing.location != undefined ? detail.listing.location.description : 'n/a'}</Text>
                            </View>
                        </View>
                        <View style={{ width: '100%', height: 1, backgroundColor: '#15488F26', marginBottom: 12 }} />
                        <View style={{ width: '90%', flexDirection: 'row', }} >
                            <View style={{ alignItems: 'center', }} >
                                <View style={styles.circle} />
                                <View style={styles.line} />
                            </View>
                            <View>
                                <Text style={styles.labelStyle} >Booking Cancelled</Text>
                                <Text style={[styles.addressStyle, { marginTop: 3 }]}>{moment(bookingDetail ?? bookingDetail.bookingCancelDateUser).format('MMM DD, YYYY, hh:mm A')}</Text>
                            </View>
                        </View>
                        <View style={{ width: '90%', flexDirection: 'row', }} >
                            <View style={{ alignItems: 'center', }} >
                                <View style={[styles.circle, { backgroundColor: '#65C51F' }]} />
                                <View style={[styles.line, { backgroundColor: '#65C51F' }]} />
                            </View>
                            <View>
                                <Text style={styles.labelStyle} >Cancellation accepted by provider</Text>
                                <Text style={[styles.addressStyle, { marginTop: 3 }]}>{moment(bookingDetail ?? bookingDetail.bookingCancelDateProvider).format('MMM DD, YYYY, hh:mm A')}</Text>
                            </View>
                        </View>
                        <View style={{ width: '90%', flexDirection: 'row', }} >
                            <View style={{ alignItems: 'center', }} >
                                <View style={[styles.circle, { backgroundColor: '#65C51F' }]} />
                                <View style={[styles.line, { backgroundColor: '#FFFFFF' }]} />
                            </View>
                            <View>
                                <Text style={styles.labelStyle} >Refund Processed: ${detail.totalPrice - charges}</Text>
                                <Text style={[styles.addressStyle, { marginTop: 3 }]}>{moment().format('MMM DD, YYYY, hh:mm A')}</Text>
                            </View>
                        </View>
                    </View>
            }
        </View>
    )
}

export default bookingCancelCard

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
    circle: {
        width: 12,
        height: 12,
        backgroundColor: '#65C51F',
        borderRadius: 6
    },
    line: {
        width: 1,
        height: 30,
        backgroundColor: '#65C51F',
    }


})
