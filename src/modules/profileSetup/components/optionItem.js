import React from 'react'
import { StyleSheet, Text, Image, TouchableOpacity } from 'react-native'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { FONTS, ICONS } from '../../../constant'

const optionItem = ({ img, label, sub, value, onClick }) => {
    return (
        <TouchableOpacity onPress={() => onClick(label)} style={[styles.container, value == label ? styles.cardSTyle : {}]} >
            {
                value == label
                    ?
                    <Image source={ICONS.selected} style={{ width: 12, height: 12, position: 'absolute', right: 5, top: 5 }} resizeMode={'contain'} />
                    :
                    null
            }
            <Image source={img} style={{ width: wp('13'), height: wp('13') }} resizeMode="contain" />
            <Text style={styles.headingStyle} >{label}</Text>
            <Text style={styles.desc} >{sub}</Text>
        </TouchableOpacity>
    )
}
export default optionItem

const styles = StyleSheet.create({
    container: {
        width: wp("37"),
        height: 180,
        backgroundColor: '#F8FAFF',
        borderRadius: 6,
        alignItems: 'center',
        borderColor: '#70707026',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center'

    },
    cardSTyle: {
        shadowColor: '#00000080',
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 6,
        shadowOpacity: 0.26,
        elevation: 10,
        backgroundColor: 'white',
    },
    headingStyle: {
        color: '#252525',
        fontSize: wp('3.5'),
        fontFamily: FONTS.SFBold,
        marginTop: 12
    },
    desc: {
        color: '#707070',
        fontSize: wp('2.5'),
        fontFamily: FONTS.SFRegular,
        marginTop: 8,
        textAlign: 'center'
    }
})
