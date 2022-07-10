import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Image, ActivityIndicator } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { useSelector } from 'react-redux'
import { FONTS, ICONS, ImageUrl, Url } from '../../../../constant'
import { showMessage } from '../../../../helpers/replaceDigitsWithAesteriks'


const bookingFor = ({ detail }) => {
    const token = useSelector(state => state.user.token)
    const [loader, setLoader] = useState(true)
    const [child, setChild] = useState([])

    useEffect(() => {
        getChildList()
        return () => {
        }
    }, [])

    const getChildList = () => {
        let headers = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        };
        axios.get(`${Url}api/child?parentId=${detail.userId}`,
            { headers: headers })
            .then(resp => {
                let response = resp.data.data
                setChild(response)
                setLoader(false)
            })
            .catch(error => {
                const err = error
                if (err.response) {
                    showMessage(err.response.data.message)
                }
                setLoader(false)
            });
    }


    return (
        <View style={styles.container} >
            <Text style={styles.labelStyle} >Booking For</Text>
            {
                loader
                    ?
                    <ActivityIndicator size={"small"} color={'#000000'} />
                    :
                    <>
                        {
                            child.map((item, index) => {
                                return (

                                    <View key={index} >
                                        {
                                            detail.childIds.includes(item._id)
                                                ?
                                                <>
                                                    <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                                                        <Image source={item.avatar != undefined ? { uri: ImageUrl + item.avatar } : ICONS.userIcon} style={{ width: wp('12'), height: wp('12'), borderRadius: wp('6'), }} />
                                                        <View style={{ marginLeft: 8 }} >
                                                            <Text style={styles.dateStyle} >{item.firstName != undefined ? item.lastName : 'n/a'}  {item.lastName != undefined ? item.lastName : 'n/a'}</Text>
                                                            <Text style={styles.timeStyle} >Child Booking</Text>
                                                        </View>
                                                    </View>
                                                    <View style={{
                                                        width: wp('85%'),
                                                        backgroundColor: '#15488F26',
                                                        height: 1,
                                                        marginTop: 13,
                                                    }} />
                                                </>
                                                :
                                                null
                                        }

                                    </View>

                                )
                            })
                        }
                    </>
            }

        </View>
    )
}

export default bookingFor

const styles = StyleSheet.create({
    container: {
        width: wp('85'),
        alignItems: 'center',
        marginTop: 20,
    },
    labelStyle: {
        width: wp('85'),
        color: '#000000',
        fontFamily: FONTS.SFBold,
        fontSize: wp('4.5'),
    },
    dateStyle: {
        width: wp('65'),
        color: '#000000',
        fontFamily: FONTS.SFMedium,
        fontSize: wp('2.8'),
        marginBottom: 3
    },
    timeStyle: {
        width: wp('70'),
        color: '#707070',
        fontFamily: FONTS.SFMedium,
        fontSize: wp('2.2'),
        marginBottom: 6
    },
})
