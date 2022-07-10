import React, { useState, useEffect } from 'react'
import { ScrollView, StyleSheet, Text, View, Platform, TouchableOpacity, Image, KeyboardAvoidingView } from 'react-native'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { FONTS, ICONS } from '../../../constant'
import Header from '../components/header'
import Btn from '../../../common/meduimBtnSP'
import PlacesSearchBar from '../components/findAddress'
import { useDispatch, useSelector } from 'react-redux'
import { getLocationsList, saveOrgLocation } from '../../../redux/profile/profile.action'
import { setLoader } from '../../../redux/loader/loader.action'
import TNIndicator from '../../../common/TNIndicator'
import MeduimBtnBorder from '../../../common/meduimBtnBorder'
import ChoosedLocation from '../components/choosedLocation'
import { showMessage } from '../../../helpers/replaceDigitsWithAesteriks'



const orgLocationInfo = (props) => {
    const dispatch = useDispatch()
    const loader = useSelector(state => state.loader.loader)
    const token = useSelector(state => state.user.token)
    const currentUser = useSelector(state => state.user.currentUser)
    const locationList = useSelector(state => state.profile.locationList)
    const [address, setAddress] = useState("")
    const [shortName, setShortName] = useState("")
    const [longName, setLongName] = useState("")
    const [progress, setProgress] = useState(0.3)

    useEffect(() => {
        setTimeout(() => {
            setProgress(0.5)
        }, 100);
        dispatch(setLoader(true))
        dispatch(getLocationsList(currentUser._id))
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
            showMessage("Should choose location");
        } else {
            dispatch(setLoader(true))
            let data = {
                "location": [
                    {
                        "coordinates": [address.lng, address.lat],
                        "shortName": shortName,
                        "description": longName
                    }
                ]
            }
            dispatch(saveOrgLocation(data, token, currentUser._id))
            setAddress('')
            props.navigation.navigate("orgHomeMain")
        }
    }

    const onNextClick = () => {
            saveLocation()
    }

    return (

        <View style={styles.container} >
            <Header navigation={props.navigation} label="Profile informations" progressCount={progress} />
            <View style={{ width: wp('100'), alignItems: 'center', zIndex: -6 }} >
                <View style={{ alignItems: 'center', marginTop: Platform.OS == "android" ? 20 : 35 }} >
                    <Text style={styles.headingStyle} >Location information</Text>
                    {/* <Text style={styles.subheadingStyle} >Please tell us where your service is located</Text> */}
                </View>
                <View style={{ height: 20 }} />
                <PlacesSearchBar handler={getAddress.bind(this)} />
                <View style={{ height: hp('47'), }} />
                <View style={{ maxHeight: hp('32'), paddingBottom: 10 }} >
                    {/* <ScrollView style={{ width: '100%', }} >
                        {
                            locationList.organizationInfo && locationList.organizationInfo.location.map((item, index) => {
                                return (
                                    <ChoosedLocation key={index} data={item} />
                                )
                            })
                        }
                    </ScrollView> */}
                </View>
            </View>

            {/* <TouchableOpacity style={styles.btncontainer} onPress={saveLocation} >
                <Image source={ICONS.plusIcon} style={{ width: 14, height: 14 }} />
                <Text style={styles.btnlabelStyle} >Add another Location</Text>
            </TouchableOpacity> */}
            <Btn label="Next" onClick={onNextClick} bgColor="#2C99C6" />

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

export default orgLocationInfo

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
    btncontainer: {
        width: wp('80'),
        height: hp('7'),
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#61B2D4',
        marginBottom: 8,
        backgroundColor: '#FFFFFF'
    },
    btnlabelStyle: {
        color: "#61B2D4",
        fontSize: wp('3'),
        fontFamily: FONTS.SFBold,
        marginLeft: 7
    }
})
