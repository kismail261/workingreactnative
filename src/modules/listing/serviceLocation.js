import React, { useState, useEffect } from 'react'
import { StyleSheet, ScrollView, Text, View, Platform, KeyboardAvoidingView } from 'react-native'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { FONTS } from '../../constant'
import Header from './components/header'
import Btn from '../../common/meduimBtnSP'
import PlacesSearchBar from '../profileSetup/components/findAddress'
import PreviousLocation from './components/previousLocation'
import SearchedLocation from './components/searchedLocation'
import ChoosedLocation from './components/choosedLocationOne'
import { useDispatch, useSelector } from 'react-redux'
import { setLoader } from '../../redux/loader/loader.action'
import TNIndicator from '../../common/TNIndicator'
import { addServiceLocation } from '../../redux/listing/listing.action'
import { showMessage } from '../../helpers/replaceDigitsWithAesteriks'

const serviceLocation = (props) => {
    let recordId = props.route.params.recordId
    const dispatch = useDispatch();
    const loader = useSelector(state => state.loader.loader)
    const token = useSelector(state => state.user.token)
    const [shortName, setShortName] = useState("")
    const [longName, setLongName] = useState("")
    const [address, setAddress] = useState("")
    const [progress, setProgress] = useState(0.5)

    useEffect(() => {
        setTimeout(() => {
            setProgress(0.7)
        }, 100);
        return () => {

        }
    }, [])

    const getAddress = (data, details) => {
        setAddress(details.geometry.location)
        setLongName(data.description)
        setShortName(details.address_components[0].short_name)
    }

    const saveLocation = () => {
        if (address == '') {
            showMessage("Should choose location", 'warning');
        } else {
            dispatch(setLoader(true))
            let data = {
                "location": {
                    "coordinates": [address.lng, address.lat],
                    "shortName": shortName,
                    "description": longName
                }
            }
            dispatch(addServiceLocation(token, recordId, data, props.navigation, 1))
        }
    }

    const onCloseHeader = () => {
        props.navigation.navigate('listingTypes');
    }

    return (
        <KeyboardAvoidingView
            style={{ flex: 1, width: '100%', alignItems: 'center' }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 10 : 0}>
            <View style={styles.container} >
                <Header navigation={props.navigation} label="Service" progressCount={progress} onClose={onCloseHeader} />
                <View style={{ width: wp('100'), alignItems: 'center' }} >
                    <View style={{ alignItems: 'center', marginTop: Platform.OS == "android" ? 20 : 35 }} >
                        <Text style={styles.headingStyle} >Location information</Text>
                        <Text style={styles.subheadingStyle} >Please tell us where your service is located</Text>
                    </View>
                    <View style={{ height: 20 }} />
                    <PlacesSearchBar handler={getAddress.bind(this)} />
                    <View style={{ height: 50 }} />
                    {
                        shortName == ''
                            ?
                            null
                            :
                            <ChoosedLocation shortName={shortName} description={longName} />
                    }

                    <View style={{ height: 20 }} />

                    {/* <PreviousLocation /> */}
                    {/* <SearchedLocation /> */}

                </View>
                <View style={{ marginTop: shortName == '' ? hp('52') : hp('38') }} >
                    <Btn label="Continue" onClick={() => { saveLocation() }} bgColor="#2C99C6" />
                </View>
                {
                    loader
                        ?
                        <TNIndicator />
                        :
                        null
                }
            </View>
        </KeyboardAvoidingView>
    )
}

export default serviceLocation

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
        fontSize: wp('3.2'),
        fontFamily: FONTS.SFRegular,
        marginTop: 6
    },
    optionContainer: {
        width: wp('80'),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    labelStyle: {
        width: '100%',
        color: '#000000',
        fontSize: wp('4'),
        fontFamily: FONTS.SFSemiBold,
        marginBottom: 6
    },
    sublabelStyle: {
        width: '100%',
        color: 'rgba(112, 112, 112, 1)',
        fontSize: wp('3'),
        fontFamily: FONTS.SFRegular,
        marginBottom: 12
    },
})
