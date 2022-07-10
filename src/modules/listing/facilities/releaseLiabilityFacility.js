
import React, { useState, useEffect, } from 'react'
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
} from 'react-native-responsive-screen'
import DocumentPicker from 'react-native-document-picker';
import { FONTS, ICONS } from '../../../constant'
import Header from '../components/header'
import Btn from '../../../common/meduimBtnSP'
import { MyTextinputMultiline } from '../../../common/textinputMultiline'
import { useDispatch, useSelector } from 'react-redux'
import { setLoader } from '../../../redux/loader/loader.action'
import TNIndicator from '../../../common/TNIndicator'
import { addLiability } from '../../../redux/listing/listing.action'
import { showMessage } from '../../../helpers/replaceDigitsWithAesteriks';

const releaseLiability = (props) => {
    //61cb4af6ad8595001640aef8
    let recordId = props.route.params.recordId
    const dispatch = useDispatch();
    const loader = useSelector(state => state.loader.loader)
    const token = useSelector(state => state.user.token)
    const [progress, setProgress] = useState(0.7)
    const [contentText, setContentText] = useState('')
    const [pdfPath, setPdfPath] = useState('')


    useEffect(() => {

        setTimeout(() => {
            setProgress(0.9)
        }, 100);
        return () => {

        }
    }, [])

    const getContentText = value => {
        setContentText(value)
    };

    const selectFile = async () => {
        try {
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.pdf],
            });
            console.log('res : ' + JSON.stringify(res));
            setPdfPath(res)

        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                showMessage('Canceled');
            } else {
                showMessage('Unknown Error: ' + JSON.stringify(err));
                throw err;
            }
        }
    };

    const saveLiability = () => {
        dispatch(setLoader(true))
        let data = {
            "waiver": contentText == '' ? 'documents/document/3714' : contentText,
        }
        dispatch(addLiability(token, recordId, data, props.navigation))
    }

    return (
        <View style={styles.container} >
            <Header navigation={props.navigation} label="Facility" progressCount={progress} />
            <ScrollView contentContainerStyle={{ width: wp('100'), alignItems: 'center', paddingBottom: 20 }} >

                <View style={styles.subContainer} >
                    <Text style={styles.headingStyle} >Waiver, Release of Liability</Text>
                    <Text style={styles.subHeading} >Add your Waiver, Release of Liability, so Users can read, agree to and acknowledge it</Text>

                    <View style={{ width: wp('80'), alignItems: 'center', marginTop: 16 }} >
                        <Text style={[styles.h3, { marginTop: 10 }]}>
                            Add your content text
                        </Text>
                        <MyTextinputMultiline
                            styles={{ width: wp('80'), height: 92, marginTop: 5 }}
                            placeholderTextColor={styles.placeholderStyle}
                            placeholder="Type or copy/paste here"
                            value={contentText}
                            onChangeText={getContentText.bind(this)}
                        />
                    </View>

                    <Text style={[styles.h3, { marginVertical: 10, textAlign: 'center' }]} >OR</Text>

                    {
                        pdfPath == ''
                            ?
                            <TouchableOpacity
                                onPress={() => selectFile()}
                                style={styles.addPhotos}>
                                <Image
                                    source={ICONS.plusLightIcon}
                                    style={{ height: 24, width: 26, marginRight: 10 }}
                                    resizeMode={'contain'}
                                />
                                <Text style={styles.p}>Upload PDF File</Text>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity
                                onPress={() => selectFile()}
                                style={styles.addPhotos}>
                                <Image
                                    source={ICONS.pdf}
                                    style={{ height: 64, width: 64, }}
                                    resizeMode={'contain'}
                                />
                            </TouchableOpacity>
                    }

                    <View style={{ height: 40 }} />
                    <Btn label="Done" onClick={() => { saveLiability() }} bgColor="#2C99C6" />
                </View>
            </ScrollView>
            {
                loader
                    ?
                    <TNIndicator />
                    :
                    null
            }
        </View>
    )
}

export default releaseLiability

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8FAFF',
        alignItems: 'center'
    },
    subContainer: {
        width: wp('80%'),
        alignItems: 'center'
    },

    headingStyle: {
        width: wp('80'),
        color: '#000000',
        fontSize: wp("6.5"),
        fontFamily: FONTS.SFBold,
        marginTop: Platform.OS == "android" ? 18 : 28,
    },
    subHeading: {
        width: wp('80'),
        color: '#707070',
        fontSize: wp("4"),
        fontFamily: FONTS.SFRegular,
        marginTop: 8,
        marginBottom: Platform.OS == "android" ? 8 : 8
    },

    h3: {
        width: wp('80'),
        fontFamily: FONTS.SFSemiBold,
        fontSize: wp('3.5'),
        color: '#000000',
        marginTop: Platform.OS == "android" ? 18 : 28,
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
    h3: {
        width: wp('80'),
        fontFamily: FONTS.SFSemiBold,
        fontSize: wp('3.5'),
        color: '#000000',
        marginTop: Platform.OS == "android" ? 18 : 28,
    },
    addPhotos: {
        width: wp('80'),
        height: 64,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#B4D9ECB3',
        backgroundColor: '#B4D9EC1A',
        marginTop: 10,
    },
    p: {
        fontFamily: FONTS.SFRegular,
        fontSize: wp('3'),
        color: '#3D3D3D',
    },

})
