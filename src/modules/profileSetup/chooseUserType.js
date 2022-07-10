import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Platform } from 'react-native'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { FONTS, ICONS } from '../../constant'
import Header from './components/header'
import OptionItem from './components/optionItem'
import Btn from '../../common/meduimBtnSP'
import { setChooseType } from '../../redux/loader/loader.action'
import { useDispatch } from 'react-redux'


const chooseUserType = (props) => {
    const dispatch = useDispatch()
    const [activeCard, setActiveCard] = useState("Organization")
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        setTimeout(() => {
            setProgress(0.1)
        }, 100);
        return () => {

        }
    }, [])

    const getCardValue = (value) => {
        setActiveCard(value)
    }

    const nextBtnClick = () => {
        dispatch(setChooseType(activeCard))
        props.navigation.navigate(activeCard == "Organization" ? "organizationIinfo" : "contactIinfo")
    }

    return (
        <View style={styles.container} >
            <Header navigation={props.navigation} label="Profile information" progressCount={progress} />
            <View style={{ alignItems: 'center', marginTop: Platform.OS == "android" ? 20 : 35 }} >
                <Text style={styles.headingStyle} >Are you an individual or organization?</Text>
                <Text style={styles.subheadingStyle} >This will help us customize your experience and best serve you</Text>
            </View>
            <View style={{ height: hp('15') }} />
            <View style={styles.optionContainer}>
                <OptionItem img={ICONS.organization} label="Organization" sub="Your organization provides the sports & activities" value={activeCard} onClick={getCardValue.bind(this)} />
                <OptionItem img={ICONS.individual} label="Individual" sub="You are the one personallyproviding the sports &activities" value={activeCard} onClick={getCardValue.bind(this)} />
            </View>
            <View style={{ height: hp('15') }} />
            <Btn label="Next" onClick={() => { nextBtnClick() }} bgColor="#2C99C6" />
        </View>
    )
}

export default chooseUserType

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8FAFF',
        alignItems: 'center'
    },
    headingStyle: {
        width: wp('80'),
        color: '#000000',
        fontSize: wp('6.5'),
        fontFamily: FONTS.SFSemiBold
    },
    subheadingStyle: {
        width: wp('80'),
        color: '#707070',
        fontSize: wp('3.5'),
        fontFamily: FONTS.SFMedium,
        marginTop: 6,
        paddingRight: wp('2.5')
    },
    optionContainer: {
        width: wp('80'),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    }
})
