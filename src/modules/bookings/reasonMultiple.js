import React, { useState, useEffect } from 'react'
import {
    StyleSheet, Text, View, ScrollView, Image, TextInput, TouchableOpacity, KeyboardAvoidingView,
    Platform
} from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { FONTS, ICONS, ImageUrl } from '../../constant'
import Header from './components/header'
import LargeBtn from '../../common/largeBtnSP'
import { useSelector } from 'react-redux'
import { showMessage } from '../../helpers/replaceDigitsWithAesteriks'


const reasonMultiple = (props) => {
    const apiData = props.route.params.apiData
    const listingId = props.route.params.listingId
    
    const listBookings = useSelector(state => state.booking.listBookings)
    const [selectedUsers, setSelectedUsers] = useState(apiData.userIds);
    const [selectedBookings, setSelectedBookings] = useState(apiData.bookingId);
    const [reason, setReason] = useState('');

    useEffect(() => {
      return () => {
        
      };
    }, []);
    

    const onRemoveUser = (_id, id) => {
        let tempUser = selectedUsers
        let tempBooking = selectedBookings
        let finalArray = tempUser.filter(item => item != id)
        let finalBookings = tempBooking.filter(item => item != _id)
        setSelectedUsers(finalArray)
        setSelectedBookings(finalBookings)
    }

    const continueClicked = () => {
        if (reason == '') {
            showMessage('Please type booking cancellation reason', 'warning');
        } else if (selectedUsers.length == 0){
            showMessage('Please select user for cancellation booking', 'warning');
        }
         else {
            let data = {
                bookingIds: selectedBookings,
                userIds: selectedUsers,
                "cancelReason": reason,
                "status": 'approve'
            };
            props.navigation.navigate("amountPayableUsers", { apiData: data, listingId: listingId })
        }
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1, width: '100%', alignItems: 'center' }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 10 : 0}>
            <View style={styles.container} >
                <Header navigation={props.navigation} label="Reason" />
                <ScrollView showsVerticalScrollIndicator={false} >
                    <View style={{ width: wp('90'), alignItems: 'center' }}>
                        <Text style={styles.headingStyle} >Reason for cancellation</Text>
                        <Text style={styles.detail} >Please share with us the reason for cancellation, so we can communicate the same with user</Text>
                        <Text style={styles.cancelFor} >Cancelling Booking for</Text>
                        <View style={{ width: wp('90'), flexDirection: 'row', marginTop: 8, flexWrap: 'wrap' }} >
                            {
                                listBookings.map((item, index) => {
                                    return (
                                        <View key={index}  >
                                            {
                                                selectedBookings.includes(item._id)
                                                    ?
                                                    <View style={styles.userDetailContainer} >
                                                        <TouchableOpacity onPress={() => onRemoveUser(item._id, item.userId)} style={{ position: 'absolute', right: 1, top: 0 }} >
                                                            <Image source={ICONS.crossRed} style={{ width: 8, height: 8, }} />
                                                        </TouchableOpacity>
                                                        <Image source={item.user.Profile.avatar != undefined ? { uri: ImageUrl + item.user.Profile.avatar } : ICONS.userIcon} style={{ width: wp('6'), height: wp('6'), borderRadius: 10 }} />
                                                        <Text style={styles.nameStyle} >  {item.user.Profile.name != undefined ? item.user.Profile.name : 'n/a'} </Text>
                                                    </View>
                                                    :
                                                    null
                                            }
                                        </View>
                                    )
                                })
                            }
                        </View>

                        <View style={{ height: 15 }} />
                        <Text style={styles.cancelFor} >Reason</Text>
                        <TextInput
                            maxLength={1000}
                            multiline={true}
                            numberOfLines={4}
                            style={styles.inputStyle}
                            onChangeText={(value) => setReason(value)}
                            value={reason}
                        />
                        <View
                            style={{
                                width: '98%',
                                marginTop: 12,
                                justifyContent: 'flex-end',
                                alignItems: 'flex-end',
                            }}>
                            <Text style={styles.options}>{reason.length}/1000 Characters</Text>
                        </View>
                        <View style={{ alignSelf: 'center', marginTop: hp('15') }} >
                            <LargeBtn label="Cancel Booking" onClick={continueClicked} bgColor="#2C99C6" />
                        </View>
                    </View>
                </ScrollView>

            </View>
        </KeyboardAvoidingView>
    )
}

export default reasonMultiple

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8FAFF',
        alignItems: 'center'
    },
    headingStyle: {
        width: wp('90'),
        color: "#000000",
        fontSize: wp('6.5'),
        fontFamily: FONTS.SFSemiBold,
        marginTop: 8
    },
    detail: {
        width: wp('90'),
        color: "#707070",
        fontSize: wp('3.5'),
        fontFamily: FONTS.SFRegular,
        marginTop: 8
    },
    cancelFor: {
        width: wp('90'),
        color: "#808080",
        fontSize: wp('3'),
        fontFamily: FONTS.SFSemiBold,
        marginTop: 20
    },
    userDetailContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8,
        borderWidth: 1,
        borderColor: '#EAEAEA',
        borderRadius: 4,
        alignSelf: 'flex-start',
        margin: 4,
    },
    nameStyle: {
        color: "#000000",
        fontSize: wp('2.3'),
        fontFamily: FONTS.SFSemiBold,
    },
    inputStyle: {
        width: wp('90'),
        height: 140,
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#E6E6E6',
        borderRadius: 7,
        marginTop: 5,
        textAlignVertical: 'top',
        padding: 10,
        fontSize: wp('3')
    },
    options: {
        fontFamily: FONTS.SFRegular,
        fontSize: wp('2.5'),
        color: '#808080',
    },
})
