import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image, ActivityIndicator, Platform } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { FONTS, ICONS, ImageUrl } from '../../constant'
import BookingItem from './components/detailItem'
import Header from './components/header'
import CheckboxList from 'rn-checkbox-list';
import { useSelector } from 'react-redux'
import { showMessage } from '../../helpers/replaceDigitsWithAesteriks'

const renderItem = ({ item }) => {
    return (
        <View
            style={{
                width: wp('80'),
                flexDirection: 'row',
                alignItems: 'center',
            }}>
            <Image
                source={item.src}
                style={{ width: wp('7'), height: wp('7'), marginLeft: wp('1'), borderRadius: wp('4') }}
            />
            <Text
                numberOfLines={1}
                style={{
                    width: '100%',
                    fontSize: wp('3.2'),
                    fontFamily: FONTS.SFRegular,
                    color: '#000000',
                    margin: wp('3'),
                }}>
                {item.name}
            </Text>
        </View>
    );
};

const theme = '#21D17F';
const border = '#BDDBE8';
const selectCancelBookingUsers = (props) => {
    const detail = props.route.params.detail
    const listBookings = useSelector(state => state.booking.listBookings)
    const [users, setUserList] = useState([]);
    const [loader, setLoader] = useState(true)
    const [usersList, setUsersList] = useState([]);
    const [bookingList, setBookingList] = useState([]);


    useEffect(() => {
        getUsers()
        return () => {
        }
    }, [])

    const getUsers = () => {
        let tempData = []
        listBookings.forEach(element => {
            if (element.status != 'cancel') {
                tempData.push({
                    id: element._id,
                    userId: element.userId,
                    name: element.user.Profile.name != undefined ? element.user.Profile.name : 'n/a',
                    src: element.user.Profile.avatar != undefined ? { uri: ImageUrl + element.user.Profile.avatar } : ICONS.userIcon,
                    totalPrice: element.totalPrice
                })
            }
        });
        setUsersList(tempData)
        setLoader(false)
    }

    const getUserList = (items, ids) => {
        setBookingList(ids)
        setUserList(items);
        if (bookingList == null) {
            showMessage(' No record available', 'warning');
        } 

    };

    const continueClicked = () => {
        if (users.length == 0) {
            showMessage('Please select users for booking cancellation', 'warning');
        } else {
            let tempUserId = []
            let tempPrice = 0
            users.forEach(element => {
                tempUserId.push(element.userId)
                tempPrice = tempPrice + element.totalPrice
            });
            let data = {
                bookingId: bookingList,
                userIds: tempUserId,
                "status": 'approve'
            };
            props.navigation.navigate("reasonMultiple", { apiData: data, listingId: detail })
        }
    };

    return (
        <View style={styles.container}>
            <Header navigation={props.navigation} label="Cancel Bookings" />
            <ScrollView>
                <View style={{ width: wp(90), alignItems: 'center' }} >
                    <BookingItem navigation={props.navigation} detail={detail} />
                    <View style={{ width: wp(90), }} >
                        <CheckboxList
                            headerName="Select All Users"
                            headerStyle={{
                                padding: 0,
                                backgroundColor: '#F8FAFF', flexDirection: 'row', alignItems: 'center',
                                alignSelf: 'center', width: Platform.OS == 'android' ? wp('85') : wp('79'), borderBottomWidth: 1,
                                borderBottomColor: '#D9D9D9', paddingBottom: 10,
                                text: {
                                    color: '#4D4D4D',
                                    fontFamily: FONTS.SFSemiBold,
                                    fontSize: wp('3'),
                                },
                            }}
                            theme={theme}
                            listItems={loader ? [] : usersList}
                            onChange={({ items, ids }) => {
                                getUserList(items, ids);
                            }}
                            onLoading={() => (
                                <View
                                    style={{
                                        flex: 1,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}>
                                    {/* <ActivityIndicator size="small" color="#555555" />
                                    <Text style={{ fontSize: 12, color: '#555555' }}>
                                        Loading....
                                    </Text> */}
                                </View>
                            )}
                            // selectedListItems={users}
                            checkboxProp={Platform.select({
                                ios: {
                                    boxType: 'square',
                                    tintColor: border,
                                    onTintColor: theme,
                                    onCheckColor: '#fff',
                                    onFillColor: theme,

                                },
                                android: {
                                    tintColors: {
                                        true: theme,
                                        false: border,
                                    },
                                },
                            })}
                            listItemStyle={{ paddingLeft: 0, width: Platform.OS == 'android' ? wp('85') : wp('79'), alignSelf: 'center', }}
                            renderItem={renderItem}
                        />
                    </View>
                </View>
            </ScrollView>
            <TouchableOpacity onPress={continueClicked} style={styles.btnStyle} >
                <Text style={styles.btnText} >Cancel Booking</Text>
            </TouchableOpacity>
        </View>
    )
}

export default selectCancelBookingUsers

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#F8FAFF'
    },
    btnStyle: {
        width: wp('90'),
        height: 46,
        borderWidth: 1,
        borderColor: '#2C99C6',
        backgroundColor: '#2C99C6',
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: Platform.OS=='ios' ? '6.5%':0
    },
    btnText: {
        color: '#FFFFFF',
        fontFamily: FONTS.SFMedium,
        fontSize: wp('3.2')
    }
})
