import React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import * as Progress from 'react-native-progress'
import { FONTS, ICONS } from '../../../constant'
import ICON from 'react-native-vector-icons/AntDesign'
const header = ({ navigation, label, progressCount, onClose }) => {

    const onPressClose = () => {
        if (onClose) {
            onClose()
        } else {
            navigation.navigate("bottomTab");
        }
    }

    return (
        <View style={styles.container}>
            <View />
            <View style={styles.labelRow}>
                <TouchableOpacity onPress={() => navigation.goBack()} >
                    <Image source={ICONS.backArrow} style={{ width: 10, height: 18 }} />
                </TouchableOpacity>

                <Text style={styles.labelStyle} >{label}</Text>
                <TouchableOpacity onPress={onPressClose}>
                    {/* <Image source={ICONS.blackCross} style={{ width: 10.8, height: 18.8 }} /> */}
                    <ICON name='close' size={25} color={'black'} style={{ left: 15 }} />
                </TouchableOpacity>
            </View>
            <Progress.Bar borderWidth={0} color="#50BD00" unfilledColor="#7B9CFE4D" progress={progressCount} width={wp('100')} height={4} borderRadius={13} animated={true} />
        </View>
    )
}

export default header

const styles = StyleSheet.create({
    container: {
        width: wp('100'),
        height: 65,
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: Platform.OS == "ios" ? 30 : 0
    },
    labelRow: {
        width: wp('80'),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    labelStyle: {
        color: "#000000",
        fontSize: wp('5'),
        fontFamily: FONTS.SFBold,
        left: 10
    }
})
