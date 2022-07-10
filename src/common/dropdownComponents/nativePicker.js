import React from 'react'
import { StyleSheet, Image } from 'react-native'
import SelectDropdown from 'react-native-select-dropdown'
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { FONTS, ICONS } from '../../constant';

const nativePicker = ({ placeHolder, getValue, size, data, textLeft }) => {
    return (
        <SelectDropdown
            defaultButtonText={placeHolder}
            dropdownStyle={styles.mainStyle}
            buttonStyle={[styles.btnStyle, { width: wp(size), }]}
            buttonTextStyle={[styles.btnTextStyle, { textAlign: textLeft ? 'left' : 'center'}]}
            rowTextStyle={styles.rowText}
            renderDropdownIcon={() => <Image
                source={ICONS.downArrow}
                style={{
                    width: 10,
                    height: 10,
                }}
                resizeMode="contain"
            />}
            data={data}
            onSelect={(selectedItem, index) => {
                getValue(selectedItem)
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem
            }}
            rowTextForSelection={(item, index) => {
                return item
            }}
        />
    )
}

export default nativePicker

const styles = StyleSheet.create({
    mainStyle: {
        backgroundColor: '#FFFFFF',
        borderColor: '#70707026',
        borderRadius: 4,
    },
    btnStyle: {
        height: 46,
        backgroundColor: '#FFFFFF',
        borderColor: '#70707026',
        borderRadius: 4,
    },
    btnTextStyle: {
        color: '#000000',
        fontSize: wp('3.5'),
        fontFamily: FONTS.SFRegular,
    },
    rowText: {
        color: '#000000',
        fontSize: wp('3.5'),
        fontFamily: FONTS.SFRegular,
    }
})
