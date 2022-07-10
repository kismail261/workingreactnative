import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Platform, ScrollView } from 'react-native'
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
} from 'react-native-responsive-screen'
import { FONTS, ICONS } from '../../constant'
import Header from '../profileSetup/components/header'
import TypeItem from './components/typeItem'


const listingTypes = (props) => {
    const [progress, setProgress] = useState(0)
    const [types, setTypes] = useState([
        {
            icon: ICONS.services,
            label: "Services (+ Virtual)",
            description: 'Add Services people can book here',
            id: 1
        },
        {
            icon: ICONS.events,
            label: "Events (+ Virtual)",
            description: 'Add Events people can book here',
            id: 2
        },
        {
            icon: ICONS.facilities,
            label: "Facilities",
            description: 'Add Facilities customers can rent here',
            id: 3
        },
    ]);

    useEffect(() => {
        setTimeout(() => {
            setProgress(0)
        }, 100);
        return () => {

        }
    }, [])

    return (
        <View style={styles.container} >
            <Header navigation={props.navigation} label="Create a listing" progressCount={progress} />
            <ScrollView style={{ width: wp('100') }} >
                <View style={styles.container}>
                    <Text style={styles.subHeading} >Let's get your listings online. Add the Services, Events, or Facilities you want offer, so people can book them</Text>
                    {
                        types.map((item, index) => {
                            return (
                                <TypeItem key={index} data={item} navigation={props.navigation} />
                            )
                        })
                    }
                </View>
            </ScrollView>
        </View>
    )
}

export default listingTypes

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8FAFF',
        alignItems: 'center'
    },
    subContainer: {
        width: wp('80%'),
        alignItems: 'center'
    },
    subHeading: {
        width: wp('80'),
        color: '#707070',
        fontSize: wp("4"),
        fontFamily: FONTS.SFRegular,
        marginTop: Platform.OS == "android" ? 18 : 28,
        marginBottom: Platform.OS == "android" ? 18 : 28
    }
})
