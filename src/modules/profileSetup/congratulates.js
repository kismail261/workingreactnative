import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { ICONS, FONTS } from '../../constant'
import Btn from '../../common/meduimBtnSP'
import BorderBtn from '../../common/meduimBtnBorder'
import { useDispatch, useSelector } from 'react-redux'
import { getProfileSetupFlags } from '../../redux/profile/profile.action'
import { getCurrentUserDetail } from '../../redux/user/user.action'


const congratulates = (props) => {
    const type = props.route.params.type
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.user.currentUser)
    const token = useSelector(state => state.user.token)

    const nextClick = () => {
        dispatch(getProfileSetupFlags(token, currentUser != null ? currentUser._id : ''))
        dispatch(getCurrentUserDetail(currentUser != null ? currentUser._id : '', token))
        props.navigation.navigate("providerHome")
    }

    return (
        <View style={styles.container} >
            <View style={{ height: wp('20') }} />
            <Image source={ICONS.congratesIcon} style={styles.iconStyle} />
            <View style={{ height: wp('10') }} />
            <Text style={styles.heading} >Congratulations</Text>
            <View style={{ height: wp('7') }} />
            <Text style={styles.subHeadingStyle} >Your {type} Provider Profile is set up!</Text>
            <View style={{ height: wp('7') }} />
            <Text style={styles.subHeadingStyle} >Now let's create your first listing</Text>
            <View style={{ height: wp('40') }} />
            <Btn label="Continue" onClick={() => { props.navigation.navigate("Create New Listing") }} bgColor="#2C99C6" />
            <BorderBtn label="Later" onClick={nextClick} bgColor="#2C99C6" />
        </View>
    )
}

export default congratulates

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8FAFF',
        alignItems: 'center',
        justifyContent: 'center'
    },
    iconStyle: {
        width: wp('35'),
        height: wp('35'),
    },
    heading: {
        color: "#000000",
        fontSize: wp('6'),
        fontFamily: FONTS.SFSemiBold
    },
    subHeadingStyle: {
        width: wp('75'),
        color: '#000000',
        fontSize: wp('4.5'),
        fontFamily: FONTS.SFRegular,
        textAlign: 'center',
        marginVertical: 10
    }
})
