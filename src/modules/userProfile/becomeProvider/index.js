import React, { } from 'react'
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, Image, Platform } from 'react-native'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen'
import { useDispatch } from 'react-redux';
import { ICONS, FONTS } from '../../../constant'
import LargeBtnSP from '../../../common/largeBtnSP'
import { setBecomeProviderFlag } from '../../../redux/user/user.action';
import ICON from 'react-native-vector-icons/EvilIcons'

const BecomeProvider = (props) => {
    const dispatch = useDispatch();

    const crossClick = () => {
        dispatch(setBecomeProviderFlag(1))
        props.navigation.navigate('userAppRoutes')
    }
    // 
    const {
        container, bgStyle, headerBox, titleStyle,
        headingStyle, subHeadingStyle, boxStyle, crossBtn
    } = styles

    return (
        <View style={container} >
            <ImageBackground source={ICONS.tournamentOrg} style={bgStyle} resizeMode={'cover'} >
                <View style={headerBox}>
                    {/* <TouchableOpacity onPress={crossClick} style={crossBtn} >
                        <ICON name='close' size={25} color={'#65C51F'} />
                    </TouchableOpacity> */}
                </View>
                <View>
                    <Text style={titleStyle} >Organizing a</Text>
                    <Text style={headingStyle} >Tournament, Competition or Race?</Text>
                    <Text style={subHeadingStyle} >Promote it here for Free!</Text>
                    <View style={boxStyle} />
                    <LargeBtnSP label="Become a Provider" onClick={() => props.navigation.navigate("secondScreen")} bgColor="#2C99C6" />
                </View>
                <View />

                <TouchableOpacity style={{ position: 'absolute', zIndex: 999, bottom: 60, width: '90%', height: 20, justifyContent: 'center', alignItems: 'center' }} onPress={crossClick}>
                    <Text style={{ color: 'white', textDecorationLine: 'underline' }}>Continue as a User</Text>
                </TouchableOpacity>
            </ImageBackground>
        </View>
    )
}
export default BecomeProvider

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    bgStyle: {
        width: wp('100'),
        height: hp('100%'),
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    headerBox: {
        width: '100%',
        height: hp('20'),
        alignItems: 'flex-end',
        marginTop: 13,
        marginRight: 13
    },
    titleStyle: {
        color: '#FFFFFF',
        fontSize: wp('7'),
        fontFamily: FONTS.SFBold,
        width: wp('85'),
    },
    headingStyle: {
        color: '#FFFFFF',
        fontSize: wp('12'),
        fontFamily: FONTS.SFBold,
        width: wp('85'),
    },
    subHeadingStyle: {
        color: '#FFFFFF',
        fontSize: wp('5'),
        fontFamily: FONTS.SFBold,
        width: wp('85'),
    },
    boxStyle: {
        height: 20
    },
    crossBtn: {
        width: 35,
        height: 35,
        backgroundColor: '#FFFFFF',
        borderRadius: 35,
        justifyContent: 'center',
        alignItems: 'center',
        top: Platform.OS == "ios" ? 30 : 0
    }
})

