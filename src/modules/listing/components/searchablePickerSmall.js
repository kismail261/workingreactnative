import React, { useRef } from 'react'
import { StyleSheet, Text, View, Platform } from 'react-native'
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
} from 'react-native-responsive-screen'
import { FONTS } from '../../../constant'
import MultiSelect from 'react-native-multiple-select';


const searchablePickerSmall = ({ item, value, label, placeHolder, getValue }) => {

    const multiSelect = useRef(null);
    const onSelectedItemsChange = selectedItems => {
        getValue(selectedItems)
    };


    return (
        <View style={styles.backgroundStyle} >
            <Text style={styles.headingStyle} >{label}</Text>
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

                    fontSize={wp('3.5')}
                    fontFamily={FONTS.SFRegular}

                    itemFontFamily={FONTS.SFRegular}
                    itemFontSize={wp('3.5')}
                    itemTextColor="#707070"

                    altFontFamily={FONTS.SFRegular}

                    selectedItemFontFamily={FONTS.SFRegular}
                    selectedItemIconColor="#707070"
                    selectedItemTextColor="#707070"

                    tagRemoveIconColor="#707070"
                    tagBorderColor="#707070"
                    tagTextColor="#707070"

                    itemTextColor="#000"
                    displayKey="name"
                    searchInputStyle={{ color: '#FFFFFF' }}
                    submitButtonColor="#2C99C6"
                    submitButtonText="OK"
                    single={true}
                />
                {/* {
                    multiSelect.current != null
                        ?
                        <View>
                            {multiSelect.current.getSelectedItemsExt(selectedItems)}
                        </View>
                        :
                        null
                } */}
            </View>
        </View>
    )
}

export default searchablePickerSmall

const styles = StyleSheet.create({
    backgroundStyle: {
        width: wp('37.5'),
        alignItems: 'center',
        marginTop:12
    },
    container: {
        width: wp('37.5'),
        height: 50
    },
    headingStyle: {
        width: wp('37.5'),
        color: '#000000',
        fontSize: wp("3.5"),
        fontFamily: FONTS.SFBold,
        marginBottom: Platform.OS == "android" ? 8 : 10,
    },
})
