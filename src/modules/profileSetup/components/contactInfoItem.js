import axios from 'axios'
import React, { useEffect } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, TouchableHighlightBase } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { useDispatch, useSelector } from 'react-redux'
import { FONTS, ICONS, Url } from '../../../constant'
import { setLoader } from '../../../redux/loader/loader.action'
import { getLocationsList } from '../../../redux/profile/profile.action'


const contactInfoItem = ({ data, onDuplicate, navigation }) => {
    const { _id, position, name, phone } = data
    const dispatch = useDispatch()
    const currentUser = useSelector(state => state.user.currentUser)
    const token = useSelector(state => state.user.token)

    useEffect(() => {
        return () => {
        }
    }, [])

    const deleteOrgContactInfo = () => {
        dispatch(setLoader(true))
        fetch(`${Url}api/users/organization-contact`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                "organizationId": currentUser._id,
                "contactId": _id
            }),
        })
            .then(response => response.json())
            .then(data => {
                dispatch(getLocationsList(currentUser._id))
                dispatch(setLoader(false))
            })
            .catch(err => {
                dispatch(setLoader(false))
            })
    }

    return (
        <View style={styles.card} >
            <View style={styles.rowStyle}>
                <Text style={styles.locationName} >{position}</Text>
                <TouchableOpacity onPress={() => navigation.navigate("updateContactInfo", { data: data })}>
                    <Image source={ICONS.editableIconBlue} style={{ width: 16, height: 16, marginLeft: 5 }} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => deleteOrgContactInfo()}>
                    <Image source={ICONS.crossRed} style={{ width: 16, height: 16, marginLeft: 5 }} />
                </TouchableOpacity>
            </View>
            <Text style={styles.dateStyle} >Person name: {name}</Text>
            <View style={{ height: 7 }} />
            <View style={styles.rowStyle}>
                <Text style={styles.timeStyle} >Mobile number: {phone}</Text>
                <TouchableOpacity onPress={() => onDuplicate(data)} >
                    <Text style={styles.duplicateBtn} >Duplicate</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default contactInfoItem

const styles = StyleSheet.create({
    card: {
        width: wp('80%'),
        shadowColor: '#00000080',
        shadowOffset: { width: 0, height: 1 },
        elevation: 10,
        shadowRadius: 4,
        shadowOpacity: 0.26,
        backgroundColor: '#FFFFFF',
        borderRadius: 4,
        marginTop: 10,
        borderColor: '#15488F26',
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 16,
        paddingBottom: 16

    },
    rowStyle: {
        width: wp('72'),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    locationName: {
        width: wp('60'),
        fontSize: wp('4.2'),
        fontFamily: FONTS.SFBold,
        color: '#000000',
    },

    dateStyle: {
        width: wp('72'),
        fontSize: wp('2.2'),
        fontFamily: FONTS.SFRegular,
        color: '#000000',
        opacity: 0.5,
        marginTop: 5
    },
    timeStyle: {

        fontSize: wp('2.2'),
        fontFamily: FONTS.SFRegular,
        color: '#000000',
        opacity: 0.5,
    },
    duplicateBtn: {
        fontSize: wp('2.8'),
        fontFamily: FONTS.SFRegular,
        color: 'rgba(44, 153, 198, 1)',
    }
})
