import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
} from 'react-native-responsive-screen'
import SearchableDropdown from 'react-native-searchable-dropdown';
import { FONTS, ICONS } from '../../constant';
import { showMessage } from '../../helpers/replaceDigitsWithAesteriks';

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
const searchableDropdownSingle = () => {
    const [active, setActive] = useState(false)
    const [value, setValue] = useState("Select")

    return (
        <ScrollView contentContainerStyle={{ flex: 1, alignItems: 'center' }} >
            <View style={styles.container} >
                <SearchableDropdown
                    onItemSelect={(item) => {
                        let tempLabel = item.name
                        setValue(tempLabel)
                        setActive(false)
                        showMessage("called")
                    }}

                    containerStyle={styles.containerStyle}
                    itemStyle={{
                        padding: 10,
                        backgroundColor: '#FFFFFF',
                    }}
                    itemTextStyle={{ color: '#707070', fontSize: wp('2.7'), fontFamily: FONTS.SFRegular }}
                    itemsContainerStyle={{ maxHeight: 140, }}
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

                        }
                    }
                    listProps={
                        {
                            nestedScrollEnabled: true,
                        }
                    }
                />
            </View>
        </ScrollView>

    );
}
export default searchableDropdownSingle;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8FAFF',
        alignItems: 'center'
    },
    dropdownContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: wp('85'),
        height: 45,
        marginTop: 20,
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#70707026',
        borderRadius: 4,
        padding: 12
    },
    containerStyle: {
        width: wp('85'),
        marginTop: 20,
        backgroundColor: '#FFFFFF',
    },
    labelStyle: {
        color: '#707070',
        fontSize: wp('2.7'),
        fontFamily: FONTS.SFRegular
    }
})