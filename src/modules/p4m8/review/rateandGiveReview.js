import React, { useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { useDispatch, useSelector } from 'react-redux'
import Header from '../../../common/headerBL'
import { getUsersBookingList } from '../../../redux/booking/booking.action'
import { setLoader } from '../../../redux/loader/loader.action'
import TNIndicator from '../../../common/TNIndicator'
import ReviewItem from './components/reviewItem'

const rateandGiveReview = (props) => {
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
            <Header label={"Give a Review"} navigation={props.navigation} />
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

export default rateandGiveReview

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        alignItems: 'center'
    }
})
