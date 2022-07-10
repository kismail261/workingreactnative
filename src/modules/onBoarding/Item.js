import React, { } from 'react'
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, } from 'react-native'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen'
import { CommonActions } from '@react-navigation/native';
import { setOnbaording } from '../../redux/user/user.action';
import { FONTS } from '../../constant'
import { useDispatch } from 'react-redux';

const Screen1 = ({ navigation, data, index }) => {
    const dispatch = useDispatch();
    const { bgImage, desc, desc1, welcomeText, appName0, appName1, appName2, SKIP } = data

    const skipBtnClick = () => {
        dispatch(setOnbaording(1));
        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{ name: 'authRoute' }],
            }),
        );
    }

    const {
        container,
        bgStyle,
        headerBox,
        welcomeTextStyle,
        nameTextStyle,
        btnStyle,
        btnLable
    } = styles

    return (
        <View style={container} >
            <ImageBackground source={bgImage} style={styles.imgContainer}>
                {index == 0 ? (
                    <View style={styles.header}>
                        <Text style={welcomeTextStyle}>Welcome to</Text>
                        <Text style={nameTextStyle}>SPOR<Text style={{ color: '#50BD00' }}>FOR</Text>YA</Text>
                    </View>
                ) : null}

                <View style={styles.descpContainer}>
                    <Text style={{ ...welcomeTextStyle, width: '75%' }}>{data.desc}</Text>

                    <TouchableOpacity onPress={skipBtnClick}>
                        <Text style={btnLable}>SKIP</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </View>
    )
}
export default Screen1

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    imgContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    header: {
        position: 'absolute',
        height: '100%',
        justifyContent: 'center'
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
    },
    welcomeTextStyle: {
        color: '#FFFFFF',
        fontSize: wp('6'),
        fontFamily: FONTS.SFBold,
        width: wp('85'),
        textAlign: 'center'
    },
    nameTextStyle: {
        color: '#FFFFFF',
        fontSize: wp('11'),
        fontFamily: FONTS.SFBold,
        width: wp('90'),
        textAlign: 'center',
    },
    btnStyle: {
        marginBottom: 35
    },
    btnLable: {
        color: '#FFFFFF',
        fontSize: wp('5'),
        fontFamily: FONTS.SFRegular,
        textDecorationLine: 'underline',
    },
    descpContainer: {
        height: '30%',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 25
    }
})

