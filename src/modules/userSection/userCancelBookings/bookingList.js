import React, { useEffect } from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { useDispatch, useSelector } from 'react-redux'
import Header from '../../../common/headerBL'
import TNIndicator from '../../../common/TNIndicator'
import { ICONS } from '../../../constant'
import { getUsersBookingList } from '../../../redux/booking/booking.action'
import { setLoader } from '../../../redux/loader/loader.action'
import BookingCancelListItem from './components/bookingCancelListItem'
import BookingListItem from './components/bookingListItem'
import BookingListItemActive from './components/bookingListItemActive'
import BookingListItemCanceled from './components/bookingListItemCanceled'
import BookingListItemPast from './components/bookingListItemPast'


const bookingList = (props) => {
    const dispatch = useDispatch();
    const token = useSelector(state => state.user.token);
    const currentUser = useSelector(state => state.user.currentUser);
    const userBookingList = useSelector(state => state.booking.userBookingList);
    const loader = useSelector(state => state.loader.loader);

    useEffect(() => {
        if(token != null){
            dispatch(setLoader(true))
            dispatch(getUsersBookingList(token, `userId=${currentUser._id}`))
        }
        return () => {
        }
    }, [])


    return (
        <View style={styles.container} >
            <Header label="Bookings" navigation={props.navigation} />
            <ScrollView showsVerticalScrollIndicator={false} >
                {
                    userBookingList.map((item, index) => {
                        return (
                            <View key={index} >
                                {
                                    item.status == "active"
                                        ?
                                        <BookingListItemActive detail={item} navigation={props.navigation} />
                                        :
                                        null
                                }
                                {
                                    item.status == "cancel"
                                        ?
                                        <BookingListItemCanceled detail={item} navigation={props.navigation} />
                                        :
                                        null
                                }
                                {
                                    item.status == "upcoming"
                                        ?
                                        <BookingCancelListItem detail={item} navigation={props.navigation} />
                                        :
                                        null
                                }
                                {
                                    item.status == "past"
                                        ?
                                        <BookingListItemPast detail={item} navigation={props.navigation} />
                                        :
                                        null
                                }
                                {
                                    item.status == "partial-cancel"
                                        ?
                                        <BookingListItem detail={item} img={ICONS.providerGallery} navigation={props.navigation} />
                                        :
                                        null
                                }


                            </View>
                        )
                    })
                }
                {/* 
                <BookingListItem detail={item} img={ICONS.providerGallery} title="Soccer Basics for Children" type="Event" navigation={props.navigation} />
                <BookingCancelListItem img={ICONS.providerGallery} title="Soccer Basics for Children" type="Event" navigation={props.navigation} />
                <BookingListItemActive img={ICONS.providerGallery} title="Soccer Basics for Children" type="Event" navigation={props.navigation} />
                <BookingListItemPast img={ICONS.providerGallery} title="Soccer Basics for Children" type="Event" navigation={props.navigation} />
                <BookingListItemCanceled img={ICONS.providerGallery} title="Soccer Basics for Children" type="Event" /> 
                */}

                <View style={{ height: 20 }} />
            </ScrollView>
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

export default bookingList

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#F8FAFF'
    }
})
