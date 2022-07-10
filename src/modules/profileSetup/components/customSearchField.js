import React from 'react'
import { StyleSheet, Text, View, TextInput, Image } from 'react-native'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { FONTS, ICONS } from '../../../constant'

const customSearchField = ({ label, value, getValue }) => {
    return (
        <View style={styles.container} >
            <Text style={styles.labelStyle} >{label}</Text>
            <Text style={styles.sublabelStyle} >Please tell us where your organization is located</Text>
            <View style={styles.inputContainerStyle} >
                <View style={styles.searchContainer}>
                    <Image source={ICONS.search} style={{ width: 12, height: 12 }} />
                </View>

                <TextInput
                    style={styles.inputStyle}
                    onChangeText={(value) => getValue(value)}
                    value={value}
                    placeholder="Find a location"
                    placeholderTextColor="rgba(112, 112, 112, 0.5)"
                />
            </View>

        </View>
    )
}

export default customSearchField

const styles = StyleSheet.create({
    container: {
        width: wp('80'),
        alignItems: 'center',
        marginTop: 14
    },
    labelStyle: {
        width: '100%',
        color: '#000000',
        fontSize: wp('4'),
        fontFamily: FONTS.SFSemiBold,
        marginBottom: 6
    },
    sublabelStyle: {
        width: '100%',
        color: 'rgba(112, 112, 112, 1)',
        fontSize: wp('3'),
        fontFamily: FONTS.SFRegular,
        marginBottom: 12
    },
    inputContainerStyle: {
        width: '100%',
        height: 46,
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: "#70707026",
        borderRadius: 4,
        flexDirection: 'row',
        alignItems: 'center'
    },
    inputStyle: {
        width: '85%',
        height: 44,
        // backgroundColor: 'red',
        color: '#707070'
    },
    searchContainer: {
        width: '15%',
        height: 44,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
