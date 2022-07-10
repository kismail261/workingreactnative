import React, { useEffect } from 'react'
import { StyleSheet, View, ScrollView } from 'react-native'
import Header from '../../../common/headerBL'
import AmountPayable from './components/amountPayable'
import BookingCard from './components/bookingCard'
import BookingFor from './components/bookingFor'
import InsuranceDoc from './components/insuranceDoc'
import YourSchedule from './components/yourSchedule'


const userBookingDetail = (props) => {
    const detail = props.route.params.detail

    useEffect(() => {
        return () => {
        }
    }, [])

    return (
        <View style={styles.container} >
            <Header label="Booking Details" navigation={props.navigation} />
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ width: '100%' }}>
                <BookingCard detail={detail} />
                <YourSchedule detail={detail} />
                <BookingFor detail={detail} />
                <InsuranceDoc detail={detail} />
                <AmountPayable detail={detail}  navigation={props.navigation} btnShow={true} />
            </ScrollView>
        </View>
    )
}
//g

export default userBookingDetail

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#F8FAFF'
    }
})
