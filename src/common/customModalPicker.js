import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import ModalSelector from 'react-native-modal-selector'
import { FONTS, ICONS } from '../constant'

const customModalPicker = ({ placeholder, data, getValue }) => {
    return (
        <View style={{ flexDirection: 'row', width: wp('80'),  }} >
            <ModalSelector
                selectStyle={{ width: wp('80'), height: 46, backgroundColor: '#FFFFFF', borderColor: '#70707026', borderRadius: 4, justifyContent: 'center', }}
                style={{ width: wp('8'), height: 46, backgroundColor: '#FFFFFF', }}
                selectTextStyle={{ color: '#707070', fontSize: wp('3.5'), fontFamily: FONTS.SFRegular, textAlign: 'left' }}
                initValueTextStyle={{ color: '#707070', fontSize: wp('3.5'), fontFamily: FONTS.SFRegular, textAlign: 'left' }}
                data={data}
                initValue={placeholder}
                onChange={(option) => { getValue(option.key) }} />
            <Image source={ICONS.downArrow} style={{ width: 10, height: 10, position: 'absolute', right: 12, marginTop: 20 }} resizeMode="contain" />
        </View>
    )
}

export default customModalPicker

const styles = StyleSheet.create({
    
})
