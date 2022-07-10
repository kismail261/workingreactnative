import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { FONTS } from '../../../constant'
import NotifyItem from './notifyItem'



const earlierNotifications = ({ label, count, }) => {
    return (
        <View style={styles.container} >
            <Text style={styles.sectionLabel} >{label}</Text>
            {
                count.map((item, index) => {
                    return (
                        <View key={index} >
                            {
                                new Date().setHours(0, 0, 0, 0) != new Date(item.createdAt).setHours(0, 0, 0, 0)
                                    ?
                                    <NotifyItem data={item} />
                                    :
                                    null
                            }
                        </View>
                    )
                })
            }
        </View>
    )
}

export default earlierNotifications

const styles = StyleSheet.create({
    container: {
        width: wp('90'),
        alignItems: 'center'
    },
    sectionLabel: {
        width: wp('90'),
        color: "#616161",
        fontSize: wp('5'),
        fontFamily: FONTS.HNMedium,
        marginTop: 15,
        marginBottom: 8
    }
})
