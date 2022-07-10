import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import * as Progress from 'react-native-progress';
import { FONTS, ICONS } from '../../constant'
import Header from './components/header'
import Btn from '../../common/meduimBtnSP'
import { useDispatch, useSelector } from 'react-redux';
import { setLoader } from '../../redux/loader/loader.action';
import { getProfileSetupFlags } from '../../redux/profile/profile.action';
import TNIndicator from '../../common/TNIndicator'
import WelcomeHome from './welcomeHome';
import { getBadgeEnabled, getUserDetail } from '../../redux/user/user.action';


const index = (props) => {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.user.currentUser)
    const loader = useSelector(state => state.loader.loader)
    const token = useSelector(state => state.user.token)
    const profileStatus = useSelector(state => state.profile.profileStatus)

    useEffect(() => {
        if (token != null) {
            dispatch(setLoader(true))
            dispatch(getUserDetail(currentUser._id))
            dispatch(getProfileSetupFlags(token, currentUser._id))
            dispatch(getBadgeEnabled(token))
        }
        return () => {
        }
    }, [])

    const navigator = () => {
        // props.navigation.navigate("organizationContactInfo")
        if (!profileStatus.isOrganization) {
            if (!profileStatus.contact && !profileStatus.location && !profileStatus.providerInfo) {
                props.navigation.navigate("chooseUserType")
            } else if (profileStatus.contact && !profileStatus.location) {
                props.navigation.navigate("locationIinfo")
            } else if (profileStatus.location && !profileStatus.providerInfo) {
                props.navigation.navigate("homeMain")
            } else if (profileStatus.contact && profileStatus.location && profileStatus.providerInfo) {
                props.navigation.navigate("welcomeHome")
            }
        } else {
            if (!profileStatus.location && !profileStatus.providerInfo && !profileStatus.contact) {
                props.navigation.navigate("orgLocationIinfo")
            } else if (profileStatus.location && !profileStatus.providerInfo) {
                props.navigation.navigate("orgHomeMain")
            } else if (profileStatus.providerInfo && !profileStatus.contact) {
                props.navigation.navigate("organizationContactInfo")
            } else if (profileStatus.contact && profileStatus.location && profileStatus.providerInfo) {
                props.navigation.navigate("welcomeHome")
            }
        }
    }

    {/* profileStatus != null && profileStatus.contact && profileStatus.location && profileStatus.providerInfo */ }
    return (
        <View style={styles.container}>
            <Header navigation={props.navigation} />
            {
                profileStatus != null && profileStatus.contact && profileStatus.location && profileStatus.providerInfo
                    ?
                    <WelcomeHome navigation={props.navigation} />
                    :
                    <View style={{ alignItems: 'center' }} >
                        <Image source={ICONS.nothingIcon} style={{ width: wp('50'), height: wp('40') }} resizeMode={'contain'} />
                        <Text style={styles.desc} >Create your first Listing in just a few minutes</Text>
                        <Text style={styles.subHeading} >Account Completion Status</Text>
                        <Progress.Bar borderWidth={0} color="#50BD00" unfilledColor="#7B9CFE4D" progress={0.1} width={wp('80')} height={13} borderRadius={13} />
                        <View style={{ height: 20 }} />
                        <Btn label="Complete Profile" onClick={() => navigator()} bgColor="#2C99C6" />
                    </View>
            }
            <View />

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

export default index;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#F8FAFF',
    },
    heading: {
        width: wp('85%'),
        color: '#2A2A2A',
        fontSize: wp('6.5'),
        fontFamily: FONTS.SFBold,
        textAlign: 'center',
        marginTop: -15
    },
    desc: {
        width: wp('68%'),
        color: '#2A2A2A',
        fontSize: wp('4.2'),
        fontFamily: FONTS.SFRegular,
        textAlign: 'center',
        marginTop: 10
    },
    subHeading: {
        width: wp('68%'),
        color: '#2A2A2A',
        fontSize: wp('3.2'),
        fontFamily: FONTS.SFBold,
        textAlign: 'center',
        marginTop: 30,
        marginBottom: 10
    }
});
