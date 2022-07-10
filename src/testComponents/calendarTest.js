import React, { useState } from 'react'
import { StyleSheet, Text, View, Image, Platform } from 'react-native'
import { Calendar } from 'react-native-calendars';
import Modal from 'react-native-modal';
import { FONTS, ICONS } from '../constant'
import moment from 'moment';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


const calendarTest = () => {
    const [selectedDate, setSelectedDate] = useState(moment().format('YYYY-MM-DD'))
    const onDayPress = day => {
        setSelectedDate(day.dateString);
    };

    return (

        <Modal
            onBackButtonPress={() => { }}
            onBackdropPress={() => { }}
            animationIn="slideInUp"
            animationOut="slideOutDown"
            style={{
                flex: 1,
                justifyContent: 'flex-end',
                alignItems: 'center',
                padding: 0,
            }}
            animationInTiming={200}
            animationOutTiming={100}
            backdropOpacity={0.4}
            isVisible={true}>
            <View style={{
                width: wp('100%'),
                alignItems: 'center',
                backgroundColor: '#FFFFFF',
                bottom: wp('-6')
            }}>
                <Calendar
                    style={{ width: '100%' }}
                    onDayPress={onDayPress}
                    minDate={moment().format('YYYY-MM-DD')}
                    renderArrow={(direction) => direction == 'left' ?
                        (<Image source={ICONS.backArrow} style={{ width: 6, height: 11 }} />)
                        :
                        (<Image source={ICONS.nextArrow} style={{ width: 6, height: 11 }} />)
                    }
                    enableSwipeMonths={true}
                    markingType={'custom'}
                    markedDates={{
                        [selectedDate]: {
                            customStyles: {
                                container: {
                                    backgroundColor: 'rgba(149, 204, 226, 1)'
                                },
                                text: {
                                    color: 'rgba(255, 255, 255, 1)',
                                    fontFamily: FONTS.SFMedium,
                                    fontSize: 14
                                }
                            }
                        }
                    }}
                    theme={{
                        backgroundColor: '#FFFFFF',
                        calendarBackground: '#FFFFFF',
                        textSectionTitleColor: '#000000',
                        textSectionTitleDisabledColor: '#d9e1e8',
                        selectedDayBackgroundColor: '#95CCE2',
                        selectedDayTextColor: '#FFFFFF',
                        todayTextColor: '#00adf5',
                        dayTextColor: '#2d4150',
                        textDisabledColor: '#d9e1e8',
                        monthTextColor: '#000000',
                        indicatorColor: '#000000',
                        textDayFontFamily: FONTS.SFMedium,
                        textMonthFontFamily: FONTS.SFSemiBold,
                        textDayHeaderFontFamily: FONTS.SFSemiBold,
                        textDayFontSize: 14,
                        textMonthFontSize: 14,
                        textDayHeaderFontSize: 14,
                    }}
                />
                <View style={{ width: '100%', height: 20 }} />
            </View>
        </Modal>

    )
}

export default calendarTest

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'red',
        alignItems: 'center'
    }

})
