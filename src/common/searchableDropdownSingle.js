import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Platform } from 'react-native';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
} from 'react-native-responsive-screen'
import SearchableDropdown from 'react-native-searchable-dropdown';
import { FONTS, ICONS } from '../constant';

var items = [
    {
        id: 1,
        name: 'JavaScript',
    },
    {
        id: 2,
        name: 'Java',
    },
    {
        id: 3,
        name: 'Ruby',
    },
    {
        id: 4,
        name: 'React Native',
    },
    {
        id: 5,
        name: 'PHP',
    },
    {
        id: 6,
        name: 'Python',
    },
    {
        id: 7,
        name: 'Go',
    },
    {
        id: 8,
        name: 'Swift',
    },
];
const searchableDropdownSingle = ({ myValue, getValue, label }) => {
    const [active, setActive] = useState(false)
    const [value, setValue] = useState("Select")

    return (
        <View style={styles.container} >
            <Text style={styles.headingStyle} >{label}</Text>
            {
                active
                    ?
                    <SearchableDropdown
                        onItemSelect={(item) => {
                            let tempLabel = item.name
                            setValue(tempLabel)
                            setActive(false)
                        }}

                        containerStyle={styles.containerStyle}
                        itemStyle={{
                            padding: 10,
                            backgroundColor: '#FFFFFF',
                        }}
                        itemTextStyle={{ color: '#707070', fontSize: wp('2.7'), fontFamily: FONTS.SFRegular }}
                        itemsContainerStyle={{ maxHeight: 140 }}
                        items={items}
                        defaultIndex={0}
                        textInputProps={
                            {
                                placeholder: "Search",
                                underlineColorAndroid: "transparent",
                                style: {
                                    padding: 12,
                                    borderRadius: 4,
                                    height: 45,
                                    borderWidth: 1,
                                    borderColor: '#70707026',
                                    color: '#707070',
                                    fontSize: wp('2.7'),
                                    fontFamily: FONTS.SFRegular
                                },
                                onTextChange: text => console.log(text),
                                // autoFocus: true
                            }
                        }
                        listProps={
                            {
                                nestedScrollEnabled: true,
                            }
                        }
                    />
                    :
                    <TouchableOpacity onPress={() => setActive(true)} style={styles.dropdownContainer}>
                        <Text style={styles.labelStyle} >{value}</Text>
                        <Image source={ICONS.downArrow} style={{ width: 12, height: 12 }} resizeMode="contain" />
                    </TouchableOpacity>
            }

        </View>

    );
}
export default searchableDropdownSingle;

const styles = StyleSheet.create({
    container: {
        width: wp('80'),
        backgroundColor: '#F8FAFF',
        alignItems: 'center',
        marginTop: 12
    },
    dropdownContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: wp('80'),
        height: 45,
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#70707026',
        borderRadius: 4,
        padding: 12
    },
    containerStyle: {
        width: wp('80'),
        backgroundColor: '#FFFFFF',
    },
    labelStyle: {
        color: '#707070',
        fontSize: wp('2.7'),
        fontFamily: FONTS.SFRegular
    },
    headingStyle: {
        width: wp('80'),
        color: '#000000',
        fontSize: wp("3.5"),
        fontFamily: FONTS.SFBold,
        marginBottom: Platform.OS == "android" ? 8 : 10,
    },
})