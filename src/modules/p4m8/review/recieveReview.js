import React, { useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { useDispatch, useSelector } from 'react-redux'
import Header from '../../../common/headerBL'
import { getUsersBookingList } from '../../../redux/booking/booking.action'
import { setLoader } from '../../../redux/loader/loader.action'
import TNIndicator from '../../../common/TNIndicator'
import { FONTS } from '../../../constant'
import ReviewItem from './components/recieveReviewItem'


const recieveReview = (props) => {
    const dispatch = useDispatch();
    const token = useSelector(state => state.user.token);
    const currentUser = useSelector(state => state.user.currentUser);
    const userBookingList = useSelector(state => state.booking.userBookingList);
    const loader = useSelector(state => state.loader.loader);

    useEffect(() => {
        dispatch(setLoader(true))
        dispatch(getUsersBookingList(token, `userId=${currentUser != null ? currentUser._id : ''}`))
        return () => {

        };
    }, []);


    return (
        <View style={styles.container} >
            <Header label={"Receive a Review"} navigation={props.navigation} />
            <View style={{ width: wp('90'), marginTop: 10, marginBottom: 10 }} >
                <Text style={styles.header} >Receive a Review</Text>
                <Text style={styles.description} >You can send request to receive your review from provider for the services, facilities and events you have booked for.</Text>
            </View>
            {
                userBookingList.map((item, index) => {
                    return (
                        <View key={index} >
                            {
                                item.status == "past"
                                    ?
                                    <ReviewItem detail={item} navigation={props.navigation} />
                                    :
                                    null
                            }
                        </View>
                    )
                }
                )}
            {
                loader
                    ?
                    <TNIndicator />
                    :
                    null
            }
        </View>
    )
}

export default recieveReview

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        alignItems: 'center'
    },
    header: {
        color: '#000000',
        fontSize: wp('6'),
        fontFamily: FONTS.SFSemiBold,

    },
    description: {
        color: '#707070',
        fontSize: wp('3.5'),
        fontFamily: FONTS.SFRegular
    }
})
