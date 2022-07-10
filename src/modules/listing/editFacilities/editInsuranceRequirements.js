import React, { useState, useEffect } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { FONTS, ICONS, Url } from '../../../constant';
import Header from '../components/header';
import Btn from '../../../common/meduimBtnSP';
import { MyTextinputMultiline } from '../../../common/textinputMultiline';
import { useDispatch, useSelector } from 'react-redux';
import { setLoader } from '../../../redux/loader/loader.action';
import TNIndicator from '../../../common/TNIndicator';
import { editInsurance } from '../../../redux/listing/listing.action';
import { CheckBox } from '../../taxinformation/components/checkbox';
import axios from 'axios';
import { showMessage } from '../../../helpers/replaceDigitsWithAesteriks';



const InsuranceRequirements = props => {
    let recordId = props.route.params.recordId;
    const dispatch = useDispatch();
    const loader = useSelector(state => state.loader.loader);
    const token = useSelector(state => state.user.token);
    const [progress, setProgress] = useState(0.6);
    const [answer, setAnswer] = useState('');
    const [certify, setCertify] = useState(false);

    useEffect(() => {
        getListingDetail()
        setTimeout(() => {
            setProgress(0.8)
        }, 100);
        return () => {

        }
    }, [])

    const getListingDetail = () => {
        dispatch(setLoader(true));
        let headers = {
            "Content-Type": "application/json",
        };
        axios.get(`${Url}api/listing/by/${recordId}`, { headers: headers })
            .then(resp => {
                let response = resp.data
                setAnswer(response.insurance)
                dispatch(setLoader(false));
            })
            .catch(error => {
                const err = error
                if (err.response) {
                    showMessage(err.response.data.message, 'warning')
                }
                dispatch(setLoader(false));
            });
    };

    const getAnswer = value => {
        setAnswer(value);
    };

    const getCertify = (value) => {
        setCertify(value)
    }

    const saveInsurance = () => {
        if (answer == '') {
            showMessage('Insurance Particulars field should not be blank', 'warning');
        } else {
            dispatch(setLoader(true));
            let data = {
                insurance: answer
            };
            dispatch(editInsurance(token, recordId, data, props.navigation));
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
                    <Text style={styles.headingStyle}>Insurance Requirements</Text>
                    <Text style={styles.subHeading}>
                        Please tell us about your Insurance requirements
                    </Text>

                    <View style={{ width: wp('80'), alignItems: 'center', marginTop: 10 }}>
                        <Text style={[styles.h3, { marginTop: 10 }]}>Insurance Particulars</Text>
                        <MyTextinputMultiline
                            styles={{ width: wp('80'), height: 130, marginTop: 5 }}
                            placeholderTextColor={styles.placeholderStyle}
                            placeholder="If this facility requires the User to provide Liability Insurance, please describe - What name should be added to the certificate as the additional insured, what $ amount of Insurance cover is required in general aggregate, and for each occurrence. Or add a URL link to a web page or a document"
                            value={answer}
                            onChangeText={getAnswer.bind(this)}
                        />
                    </View>
                    <Text style={[styles.h3, { marginTop: 19, }]}>Insurance documents</Text>
                    <View
                        style={{
                            marginTop: 8,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            width: '100%',
                        }}>
                        <View style={{ width: '5%', marginTop: 3 }}>
                            <CheckBox value={certify} getValue={getCertify.bind(this)} />
                        </View>
                        <View style={{ width: '93%' }}>
                            <Text style={styles.greyReg}>
                                Check if you require a User to upload InsuranceDocuments here (PDF, JPEG, PNG format
                            </Text>
                        </View>
                    </View>

                    <View style={{ height: hp('30') }} />

                    <Btn
                        label="Continue"
                        onClick={() => saveInsurance()}
                        bgColor="#2C99C6"
                    />

                </View>
            </ScrollView>
            {loader ? <TNIndicator /> : null}
        </View>
    );
};

export default InsuranceRequirements;

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
        fontSize: wp('6'),
        fontFamily: FONTS.SFBold,
        marginTop: Platform.OS == 'android' ? 18 : 28,
    },
    subHeading: {
        width: wp('80'),
        color: '#707070',
        fontSize: wp('3.5'),
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
    greyReg: {
        color: '#707070',
        fontFamily: FONTS.SFRegular,
        fontSize: wp('2.8'),
    },
});
