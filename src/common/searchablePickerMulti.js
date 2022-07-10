import React, { useRef } from 'react'
import { StyleSheet, Text, View, Platform } from 'react-native'
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
} from 'react-native-responsive-screen'
import { FONTS } from '../constant'
import MultiSelect from 'react-native-multiple-select';


const searchablePickerMulti = ({ item, value, label, placeHolder, subLabel, getValue }) => {

    const multiSelect = useRef(null);
    const onSelectedItemsChange = selectedItems => {
        getValue(selectedItems)
    };


    return (
        <View style={styles.backgroundStyle} >
            <Text style={styles.headingStyle} >{label}</Text>
            <Text style={styles.subHeadingStyle} >{subLabel}</Text>
            <View style={styles.container} >
                <MultiSelect
                    hideTags
                    items={item}
                    uniqueKey="id"
                    ref={multiSelect}
                    onSelectedItemsChange={onSelectedItemsChange}
                    selectedItems={value}
                    selectText={placeHolder}
                    searchInputPlaceholderText="Search"
                    onChangeInput={(text) => console.log(text)}
                    //styles
                    styleDropdownMenuSubsection={{ paddingLeft: 10 }}
                    // styleDropdownMenu={{ borderWidth: 0.5, borderColor: '#70707026'}}

                    fontSize={10}
                    fontFamily={FONTS.SFRegular}

                    itemFontFamily={FONTS.SFRegular}
                    itemFontSize={10}
                    itemTextColor="#707070"

                    altFontFamily={FONTS.SFRegular}

                    selectedItemFontFamily={FONTS.SFRegular}
                    selectedItemIconColor="#707070"
                    selectedItemTextColor="#707070"
                    
                    tagRemoveIconColor="#FFFFFF"
                    tagBorderColor="#61B2D4"
                    tagTextColor="#FFFFFF"
                    tagContainerStyle={{ borderRadius: 4, backgroundColor: "#61B2D4",}}
                    styleTextTag={{fontSize:10}}

                    itemTextColor="#000"
                    displayKey="name"
                    searchInputStyle={{ color: '#FFFFFF' }}
                    submitButtonColor="#2C99C6"
                    submitButtonText="OK"
                // single={true}
                />
                {
                    multiSelect.current != null
                        ?
                        <View>
                            {multiSelect.current.getSelectedItemsExt(value)}
                        </View>
                        :
                        null
                }
            </View>
        </View>
    )
}

export default searchablePickerMulti

const styles = StyleSheet.create({
    backgroundStyle: {
        width: wp('80'),
        alignItems: 'center',
        marginTop: 12
    },
    container: {
        width: wp('80'),
    },
    headingStyle: {
        width: wp('80'),
        color: '#000000',
        fontSize: wp("3.5"),
        fontFamily: FONTS.SFBold,
        marginBottom: Platform.OS == "android" ? 8 : 10,
    },
    subHeadingStyle: {
        width: wp('80'),
        color: '#707070',
        fontSize: wp("2.5"),
        fontFamily: FONTS.SFRegular,
        marginBottom: Platform.OS == "android" ? 8 : 10,
    },
})
