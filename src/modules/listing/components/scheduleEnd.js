import moment from 'moment';
import React, { useState } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';
import { FONTS } from '../../../constant';
import { showMessage } from '../../../helpers/replaceDigitsWithAesteriks';
import CustomSmallDatePicker from './customSmallDatePicker'

export const ScheduleEnd = ({ name, getValue, start, end }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [toDate, setToDate] = useState(new Date())
    const [occurrences, setOccurrences] = useState('')
    const [type, setType] = useState('Never')

    const selectValue = (value, type1) => {
        if (type1 == "occurrences" && occurrences == '') {
            showMessage("Please enter occurrences count", 'warning')
        } else {
            setType(type1)
            getValue(value)
            setIsOpen(false)
        }
    }

    const getToDate = (value) => {
        setToDate(value)
    }


    return (
        <View>
            <TouchableOpacity style={styles.main} onPress={() => setIsOpen(!isOpen)}>
                <Text style={styles.btnText}>{type == "Never" ? name : ''}{type == "On" ? `On(${moment(name).format("DD MMM,YYYY")})` : ''} {type == "occurrences" ? `occurrences (${name})` : ''}</Text>
                {!isOpen && <Icon name="chevron-forward-outline" size={10} />}
                {isOpen && <Icon name="chevron-down-outline" size={10} />}
            </TouchableOpacity>
            {isOpen && (
                <View style={styles.childView}>
                    <ScrollView nestedScrollEnabled style={{ width: '100%' }}>
                        <View style={{ height: 6 }} />
                        <View style={{ width: '100%', alignItems: 'center', }}>
                            <TouchableOpacity onPress={() => { selectValue("Never", "Never") }} style={{ width: '100%', height: 35, justifyContent: 'center', alignItems: 'center' }} >
                                <Text style={styles.btnText} >Never</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { selectValue(toDate, "On") }} style={{ width: wp('74.5'), flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Text style={{ color: '#707070', fontSize: wp('3.8'), fontFamily: FONTS.SFRegular }} >On</Text>
                                <CustomSmallDatePicker value={toDate} getValue={getToDate.bind(this)} start={start} end={end} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { selectValue(occurrences, "occurrences") }} style={{ width: wp('74.5'), flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 12 }}>
                                <Text style={{ color: '#707070', fontSize: wp('3.8'), fontFamily: FONTS.SFRegular }} >After, occurrences</Text>
                                <TextInput
                                    style={{ width: 43, height: 30, borderWidth: 1, borderColor: '#70707026', borderRadius: 3, padding: 0, fontSize: 13, textAlign: 'center' }}
                                    placeholder='1'
                                    placeholderTextColor={"#707070"}
                                    onChangeText={(value) => setOccurrences(value)}
                                    value={occurrences}
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={{ height: 6 }} />
                    </ScrollView>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    main: {
        width: wp('80'),
        height: 46,
        borderWidth: 1,
        borderRadius: 4,
        borderColor: '#70707026',
        alignItems: 'center',
        padding: 10,
        justifyContent: 'space-between',
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
    },
    btnText: {
        width: '94%',
        color: '#707070',
        fontFamily: FONTS.SFRegular,
        fontSize: wp('3.8'),
    },
    childView: {
        maxHeight: 140,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderRadius: 4,
        borderColor: '#70707026',
        backgroundColor: 'white',
    },
});
