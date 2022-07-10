import React, { useState, useEffect } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import Header from './components/header'
import NoNotifcation from './components/noNotifcation'
import TodayNotifications from './components/todayNotifications'
import EarlierNotifications from './components/earlierNotifications'
import { useDispatch, useSelector } from 'react-redux'
import { setLoader } from '../../redux/loader/loader.action'
import { getNotification, tapSpecificNotification } from '../../redux/profile/profile.action'
import TNIndicator from '../../common/TNIndicator'


const index = (props) => {
    const dispatch = useDispatch()
    const loader = useSelector(state => state.loader.loader)
    const token = useSelector(state => state.user.token)
    const notificationList = useSelector(state => state.profile.notificationList)

    useEffect(() => {
        dispatch(setLoader(true))
        dispatch(getNotification(token))
        // console.log("notificationList: ", notificationList)
        return () => {
        }
    }, [])

    const notificationClick = (id) => {
        dispatch(tapSpecificNotification(token, id))
    }


    return (
        <View style={styles.container} >
            <Header navigation={props.navigation} />
            {
                notificationList.length == 0
                    ?
                    <NoNotifcation />
                    :
                    <ScrollView showsVerticalScrollIndicator={false} >
                        <View style={styles.itemContainer}>
                            <TodayNotifications key={index} label="Today" count={notificationList} />
                            <EarlierNotifications key={index} label="Earlier" count={notificationList} />
                        </View>
                    </ScrollView>
            }
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

export default index

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#F8FAFF'
    },
    itemContainer: {
        width: wp('90'),
        alignItems: 'center',
        marginBottom: 15
    }
})
