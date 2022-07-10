import React, { useEffect } from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import Header from '../../../common/headerBLS'
import AmountPayable from './components/amountPayable'
import BookingRRBCard from './components/bookingRRBCard'
import BookingStatusCard from './components/bookingStatusCard'
import BookingCard from './components/bookingCard'
import BookingCancelCard from './components/bookingCancelCard'
import { BookingCardNext } from './components/bookingCardNext'
import BookingFor from './components/bookingFor'
import InsuranceDoc from './components/insuranceDoc'
import YourSchedule from './components/yourSchedule'


const bookingDetail = (props) => {
    const type = props.route.params.type
    const detail = props.route.params.detail

    useEffect(() => {
        return () => {

        }
    }, [])

    return (
        <View style={styles.container} >
            <Header label="Booking Details" navigation={props.navigation} />
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ width: '100%' }}>
                {
                    type == 1
                        ?
                        <BookingCard detail={detail} />
                        :
                        null
                }
                {
                    type == 2
                        ?
                        <BookingRRBCard detail={detail} navigation={props.navigation} />
                        :
                        null
                }
                {
                    type == 3
                        ?
                        <BookingStatusCard detail={detail} />
                        :
                        null
                }
                {
                    type == 4
                        ?
                        <BookingCancelCard detail={detail} />
                        :
                        null
                }

                <YourSchedule detail={detail} />
                <BookingFor detail={detail} />
                <InsuranceDoc />
                <AmountPayable detail={detail} navigation={props.navigation} btnShow={false} />
            </ScrollView>

        </View>
    )
}

export default bookingDetail

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#F8FAFF'
    }
})
