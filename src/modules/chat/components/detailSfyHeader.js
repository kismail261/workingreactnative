import React, { useEffect } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, Platform, BackHandler } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { FONTS, ICONS } from '../../../constant'
import { useSelector } from 'react-redux'
import { showMessage } from '../../../helpers/replaceDigitsWithAesteriks'

const detailSfyHeader = ({ navigation }) => {
    const userMode = useSelector(state => state.user.userMode);

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
        }
    }, [])

    function handleBackButtonClick() {
        if (userMode) {
            navigation.navigate('userAppRoutes', {
                screen: 'userBottomTab', params: {
                    screen: 'Message'
                }
            });
        } else {
            navigation.replace("bottomTab", { screen: "Message" });
        }
        return true;
    }

    return (
        <View style={styles.container} >
            <TouchableOpacity onPress={handleBackButtonClick}>
                <Image source={ICONS.backArrow} style={styles.backBtnIcon} resizeMode="contain" />
            </TouchableOpacity>
            <View style={styles.detailRow} >
                <Image source={require('../../../assets/images/sfyChatLogo.png')} style={{ width: wp('10'), height: wp('10') }} />
                <View style={{ width: wp('58'), justifyContent: 'center', }}>
                    <Text numberOfLines={1} style={styles.titleStyle} >Sporforya Support</Text>
                    <Text numberOfLines={1} style={styles.lastSeenStyle} >Online</Text>
                </View>
            </View>

            <TouchableOpacity onPress={() => showMessage("Comming soon in version 2", 'warning')}>
                <Image source={ICONS.moreIcon} style={styles.searchBtnIcon} resizeMode="contain" />
            </TouchableOpacity>
        </View>
    )
}

export default detailSfyHeader

const styles = StyleSheet.create({
    container: {
        width: wp('100'),
        height: 75,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomColor: '#15488F1A',
        borderBottomWidth: 1,
        marginBottom: 1,
        marginTop: Platform.OS == 'android' ? 0 : 30
    },
    backBtnIcon: {
        width: wp('3.5'),
        height: wp('6'),
        marginLeft: wp('7.5%')
    },
    detailRow: {
        flexDirection: 'row',
        alignItems: 'center',
        width: wp("65"),
    },
    searchBtnIcon: {
        width: wp('5'),
        height: wp('5'),
        marginRight: wp('7.5%')
    },
    titleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    titleStyle: {
        color: '#000000',
        fontFamily: FONTS.SFMedium,
        fontSize: wp('4'),
        marginLeft: 8
    },
    lastSeenStyle: {
        color: '#AAAAAA',
        fontFamily: FONTS.HNRegular,
        fontSize: wp('3'),
        marginLeft: 8,
        marginTop: 4
    }
})
