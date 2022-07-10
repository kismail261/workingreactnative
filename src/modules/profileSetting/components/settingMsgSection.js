import React, { useState } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { FONTS, ICONS } from '../../../constant'

const settingMsgSection = ({ items, title, navigation }) => {
    const [active, setActive] = useState(false)
    return (
        <View style={styles.container} >
            <TouchableOpacity onPress={() => setActive(!active)} style={styles.headerRow} >
                <Text style={styles.headerStyle} >{title}</Text>
                <Image source={active ? ICONS.downArrow : ICONS.nextArrow} style={{ width: 14, height: 14 }} resizeMode={'contain'} />
            </TouchableOpacity>
            {
                active
                    ?
                    <View style={{ width: wp('90'), alignItems: 'center' }} >
                        {
                            items.map((item, index) => {
                                return (
                                    <TouchableOpacity key={index} onPress={() => navigation.navigate(item)} style={{ width: wp('90'), alignItems: 'center' }} >
                                        <View style={styles.divider} />
                                        <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }} >
                                            <Text style={styles.itemLabelStyle} >{item}</Text>
                                            <Image source={ICONS.notificationDot} style={{ width: 8, height: 8 }} />
                                        </View>

                                    </TouchableOpacity>
                                )
                            })
                        }
                    </View>
                    :
                    null
            }

        </View>
    )
}

export default settingMsgSection

const styles = StyleSheet.create({
    container: {
        width: wp('90'),
        alignItems: 'center',
    },
    headerRow: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    headerStyle: {
        color: '#000000',
        fontFamily: FONTS.SFBold,
        fontSize: wp('5')
    },
    divider: {
        width: wp('95'),
        backgroundColor: '#15488F1A',
        height: 1,
        marginTop: 12,
        marginBottom: 12,
        alignSelf: 'flex-start'
    },
    itemLabelStyle: {
        width: '80%',
        color: '#707070',
        fontFamily: FONTS.SFMedium,
        fontSize: wp('4.2')
    },
})
