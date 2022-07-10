import React, { useState, useEffect } from 'react'
import { Platform, StyleSheet, Text, View } from 'react-native'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { IssueType } from '../../../common/data/issueType';
import { UserType } from '../../../common/data/userType';
import { DropDownSingle } from '../../../common/dropdownComponents/dropDownSingle';
import LargeBtn from '../../../common/meduimBtnSP';
import { MyTextinputMultiline } from '../../../common/textinputMultiline';
import { COLORS, FONTS } from '../../../constant';
import { showMessage } from '../../../helpers/replaceDigitsWithAesteriks';


export const SendMessage = ({ message }) => {
    const [as, setAs] = useState('select')
    const [type, setType] = useState('select')
    const [msg, setMsg] = useState('')

    const getAs = (value) => {
        setAs(value)
    }
    const getType = (value) => {
        setType(value)
    }

    const submit = () => {
        if (as == 'select') {
            showMessage("Please select using Sporforya as")
        } else if (type == 'select') {
            showMessage("Please select message about field")
        } else if (msg == '') {
            showMessage("Tell us more field should not be blank")
        } else {
            let data = {
                usingAs: as,
                messageAbout: type,
                message: msg
            }
            message(data)
            setAs('select')
            setType('select')
            setMsg('')
        }
    }

    return (
        <View style={styles.container}>
            <DropDownSingle
                name={as}
                data={UserType}
                getValue={getAs.bind(this)}
                label="I am using Sporforya as"
            />
            <DropDownSingle
                name={type}
                data={IssueType}
                getValue={getType.bind(this)}
                label="Please let us know what your message is about. We review all feedback but are unable to respond individually"
            />
            <View style={{ width: wp('80'), alignItems: 'center', marginVertical: 10 }}>
                <Text style={[styles.h3, { marginVertical: 10 }]}>
                    Tell us more...
                </Text>
                <MyTextinputMultiline
                    placeholderTextColor={styles.placeholderStyle}
                    placeholder="Share your experience with us."
                    onChangeText={setMsg.bind(this)}
                    value={msg}
                />
            </View>
            <View style={{ height: 10 }} />
            <LargeBtn label={"Send"} bgColor={"#2C99C6"} onClick={submit} />
            <View style={{ height: 25 }} />
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        width: '80%',
    },
    h3: {
        width: wp('80'),
        fontFamily: FONTS.SFSemiBold,
        fontSize: wp('3.5'),
        color: '#000000',
        marginTop: Platform.OS == 'android' ? 18 : 28,
    },
    placeholderStyle: {
        color: '#707070',
        fontSize: 14,
        fontFamily: FONTS.SFRegular,
    },
})
