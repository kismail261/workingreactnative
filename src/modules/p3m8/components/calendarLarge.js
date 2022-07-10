import React, { useState, useEffect } from 'react'
import { Alert, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Agenda } from 'react-native-calendars';
import { BookingCard } from './bookingCard';
import Icon from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';
import moment from 'moment';


export const CalendarLarge = (props) => {
    const userBookingList = useSelector(state => state.booking.userBookingList);
    const [bookingList, setItem] = useState(undefined)
    const [toggle, setToggle] = useState(false)

    useEffect(() => {
        return () => {
        }
    }, [])

    const loadItems = (day) => {
        const items = items || {};

        setTimeout(() => {
            for (let i = -20; i <= 20; i++) {
                const time = day.timestamp + i * 24 * 60 * 60 * 1000;
                const strTime = timeToString(time);
                if (!items[strTime]) {
                    items[strTime] = [];
                    for (let j = 0; j < userBookingList.length; j++) {
                        let compareDate = new Date(strTime).setHours(0, 0, 0, 0);
                        let SDate = new Date(userBookingList[j].selectedDateTime.start).setHours(0, 0, 0, 0);
                        let EDate = new Date(userBookingList[j].selectedDateTime.end).setHours(0, 0, 0, 0);
                        if (compareDate <= EDate && compareDate >= SDate) {
                            items[strTime].push({
                                detail: userBookingList[j],
                                day: strTime
                            });
                        }
                    }
                }
            }
            const newItems = {};
            Object.keys(items).forEach(key => {
                newItems[key] = items[key];
            });
            setItem(newItems)
        }, 1000);
    }

    const timeToString = (time) => {
        const date = new Date(time);
        return date.toISOString().split('T')[0];
    }

    const renderItem = (item, isFirst) => {
        const { detail } = item
        return (
            <View>
                {
                    detail.status == "active"
                        ?
                        <BookingCard green navigation={props.navigation} detail={detail} onClick={() => props.navigation.navigate("bookingsDetail", { detail: detail, listingdDetail: detail.listing })} />
                        :
                        null
                }
                {
                    detail.status == "cancel"
                        ?
                        <BookingCard red navigation={props.navigation} detail={detail} onClick={() => props.navigation.navigate("bookingsDetail", { detail: detail, listingdDetail: detail.listing })} />
                        :
                        null
                }
                {
                    detail.status == "upcoming"
                        ?
                        <BookingCard navigation={props.navigation} detail={detail} onClick={() => props.navigation.navigate("bookingsDetail", { detail: detail, listingdDetail: detail.listing })} />
                        :
                        null
                }
                {
                    detail.status == "past"
                        ?
                        <BookingCard yellow navigation={props.navigation} detail={detail} onClick={() => props.navigation.navigate("bookingsDetail", { detail: detail, listingdDetail: detail.listing })} />
                        :
                        null
                }
                {
                    detail.status == "partial-cancel"
                        ?
                        <BookingCard grey navigation={props.navigation} detail={detail} onClick={() => props.navigation.navigate("cancellationDetail", { detail: detail, listingdDetail: detail.listing })} />
                        :
                        null
                }
            </View>
        );
    }

    const renderEmptyDate = () => {
        return (
            <View style={styles.emptyDate}>
                <Text>This is empty date!</Text>
            </View>
        );
    }

    const rowHasChanged = (r1, r2) => {
        return r1.name !== r2.name;
    }

    return (
        <Agenda
            style={{ width: '100%' }}
            items={bookingList}
            renderKnob={() => {
                return <Icon name={toggle ? "chevron-up-outline" : "chevron-down-outline"} size={18} color={"#2C99C6"} />;
            }}
            onCalendarToggled={calendarOpened => {
                setToggle(calendarOpened);
            }}
            loadItemsForMonth={loadItems}
            selected={moment().format('YYYY-MM-DD')}
            renderItem={renderItem}
            renderEmptyDate={renderEmptyDate}
            rowHasChanged={rowHasChanged}
            showClosingKnob={true}
        />
    )
}


const styles = StyleSheet.create({
    item: {
        backgroundColor: 'white',
        flex: 1,
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
        marginTop: 17
    },
    emptyDate: {
        height: 15,
        flex: 1,
        paddingTop: 30
    }
});
