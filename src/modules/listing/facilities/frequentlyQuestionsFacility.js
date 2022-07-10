import React, { useState, useEffect } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    TouchableOpacity,
} from 'react-native';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { FONTS, ICONS } from '../../../constant';
import Header from '../components/header';
import Btn from '../../../common/meduimBtnSP';
import CustomInputField from '../../profileSetup/components/customInputField';
import { MyTextinputMultiline } from '../../../common/textinputMultiline';
import { useDispatch, useSelector } from 'react-redux';
import { setLoader } from '../../../redux/loader/loader.action';
import TNIndicator from '../../../common/TNIndicator';
import { addFrequentlyAskedQuestions } from '../../../redux/listing/listing.action';
import { showMessage } from '../../../helpers/replaceDigitsWithAesteriks';

const frequentlyQuestions = props => {
    let recordId = props.route.params.recordId;
    const dispatch = useDispatch();
    const loader = useSelector(state => state.loader.loader);
    const token = useSelector(state => state.user.token);
    const [progress, setProgress] = useState(0.6);
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');

    useEffect(() => {
        setTimeout(() => {
            setProgress(0.8);
        }, 100);
        return () => { };
    }, []);

    const getQuestion = value => {
        setQuestion(value);
    };

    const getAnswer = value => {
        setAnswer(value);
    };

    const saveQuestion = () => {
        if (question == '') {
            showMessage('Question field should not be blank');
        } else if (answer == '') {
            showMessage('Answer field should not be blank');
        } else {
            dispatch(setLoader(true));
            let data = {
                faq: [
                    {
                        question: question,
                        answer: answer,
                    },
                ],
            };
            dispatch(addFrequentlyAskedQuestions(token, recordId, data, props.navigation, 3));
            setQuestion('');
            setAnswer('');
        }
    };

    return (
        <View style={styles.container}>
            <Header
                navigation={props.navigation}
                label="Facilities"
                progressCount={progress}
            />
            <ScrollView
                contentContainerStyle={{
                    width: wp('100'),
                    alignItems: 'center',
                    paddingBottom: 20,
                }}>
                <View style={styles.subContainer}>
                    <Text style={styles.headingStyle}>Frequently Asked Questions</Text>
                    <Text style={styles.subHeading}>
                        Give Users more info by adding some FAQ's. Think about what additional info and details they would like to know, so they are comfortable booking now. Examples: What's included and/or provided, What they can expect to learn, How to find you, What to do on arrival, etc...
                    </Text>

                    <CustomInputField
                        value={question}
                        label="Question"
                        getValue={getQuestion.bind(this)}
                        placeholder="Enter Question"
                    />

                    <View style={{ width: wp('80'), alignItems: 'center', marginTop: 10 }}>
                        <Text style={[styles.h3, { marginTop: 10 }]}>Answer</Text>
                        <MyTextinputMultiline
                            styles={{ width: wp('80'), height: 92, marginTop: 5 }}
                            placeholderTextColor={styles.placeholderStyle}
                            placeholder="Enter Answer"
                            value={answer}
                            onChangeText={getAnswer.bind(this)}
                        />
                    </View>

                    <View style={{ height: 40 }} />
                    <TouchableOpacity
                        onPress={saveQuestion}
                        style={{
                            width: wp('80'),
                            height: 46,
                            borderColor: '#61B2D4',
                            borderWidth: 1,
                            borderRadius: 4,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: 10,
                        }}>
                        <Image source={ICONS.plusIcon} style={{ width: 16, height: 16 }} />
                        <Text
                            style={{
                                color: '#61B2D4',
                                fontSize: wp('3'),
                                fontFamily: FONTS.SFRegular,
                            }}>
                            {' '}
                            Add New Question
                        </Text>
                    </TouchableOpacity>
                    <Btn
                        label="Continue"
                        onClick={() => props.navigation.navigate('cancellationPolicyFacilty', {
                            recordId: recordId,
                        })}
                        bgColor="#2C99C6"
                    />
                    <View style={{ height: 15 }} />
                    <TouchableOpacity
                        onPress={() =>
                            props.navigation.navigate('cancellationPolicyFacilty', {
                                recordId: recordId,
                            })
                        }>
                        <Text style={styles.skipBtn}>SKIP</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            {loader ? <TNIndicator /> : null}
        </View>
    );
};

export default frequentlyQuestions;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8FAFF',
        alignItems: 'center',
    },
    subContainer: {
        width: wp('80%'),
        alignItems: 'center',
    },

    headingStyle: {
        width: wp('80'),
        color: '#000000',
        fontSize: wp('6.5'),
        fontFamily: FONTS.SFBold,
        marginTop: Platform.OS == 'android' ? 18 : 28,
    },
    subHeading: {
        width: wp('80'),
        color: '#707070',
        fontSize: wp('4'),
        fontFamily: FONTS.SFRegular,
        marginTop: 8,
        marginBottom: Platform.OS == 'android' ? 8 : 8,
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
    skipBtn: {
        color: 'rgba(44, 153, 198, 1)',
        fontSize: wp('3.5'),
        fontFamily: FONTS.SFMedium,
    },
});
