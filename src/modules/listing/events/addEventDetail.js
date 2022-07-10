import React, { useState, useEffect } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    Platform,
    KeyboardAvoidingView
} from 'react-native';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import axios from 'axios';
import ImagePicker from 'react-native-image-crop-picker';
import Modal from 'react-native-modal';
import Swiper from 'react-native-swiper';
import { FONTS, ICONS } from '../../../constant';
import Header from '../../profileSetup/components/header';
import { sport } from '../../../constant/data/listingData';
import CustomInputField from '../../profileSetup/components/customInputField';
import { MyTextinputMultiline } from '../../../common/textinputMultiline';
import Btn from '../../../common/meduimBtnSP';
import VirtualCard from '../components/virtualCard';
import { EventType } from '../components/data/eventType';
import { useDispatch, useSelector } from 'react-redux';
import { addServiceDetail } from '../../../redux/listing/listing.action';
import { setLoader } from '../../../redux/loader/loader.action';
import TNIndicator from '../../../common/TNIndicator';
import { Url } from '../../../constant/baseURL';
import { DropDownSingle } from '../../../common/dropdownComponents/dropDownSingle';
import { showMessage } from '../../../helpers/replaceDigitsWithAesteriks';

let tooltipArray = [
    "Take all photos in landscape, if you are using your smartphone, turn it horizontal.",
    "Showcase your Services with action shots in a clean and presentable environment.",
    "Keep it bright and sharp, if inside, turn on the lights, open blinds, and stay in focus.",
    "JPEG and PNG are the recommended formats for the images."
]
var photos = [];
const addService = props => {
    const dispatch = useDispatch();
    const loader = useSelector(state => state.loader.loader);
    const token = useSelector(state => state.user.token);

    const [progress, setProgress] = useState(0);
    const [selectSport, setSelectSport] = useState("Select");
    const [serviceType, setServiceType] = useState("Type of Event");
    const [serviceName, setServiceName] = useState('');
    const [serviceDesc, setServiceDesc] = useState('');
    const [aboutStaff, setAboutStaff] = useState('');
    const [whatsIncluded, setWhatsIncluded] = useState('');

    const [isVirtual, setIsVirtual] = useState(false);
    const [active, setActive] = useState(false);
    const [photosLocal, setPhotosLocal] = useState([]);

    useEffect(() => {
        setTimeout(() => {
            setProgress(0.1);
        }, 100);
        return () => { };
    }, []);

    const getSportSelect = selectedItems => {
        setSelectSport(selectedItems);
    };
    const getServiceType = selectedItems => {
        setServiceType(selectedItems);
    };

    const getServiceName = value => {
        setServiceName(value);
    };

    const getServiceDesc = value => {
        setServiceDesc(value);
    };
    const getInclude = value => {
        setWhatsIncluded(value);
    };
    const getVirtual = value => {
        setIsVirtual(value);
    };
    const getaboutStaff = value => {
        setAboutStaff(value);
    };

    const uploadServiceDetail = () => {
        if (selectSport == "Select") {
            showMessage('Should select sport', 'warning');
        } else if (serviceType == "Type of Event") {
            showMessage('Should select event type', 'warning');
        } else if (serviceName == '') {
            showMessage('Event title field should not be blank', 'warning');
        } else if (serviceDesc == '') {
            showMessage('Event Description field should not be blank', 'warning');
        } else if (aboutStaff == '') {
            showMessage('The Event Venue field should not be blank', 'warning');
        } else if (photosLocal.length == 0) {
            showMessage('Please select at least one photo.', 'warning');
        } else {
            dispatch(setLoader(true));
            let data = {
                listingType: 'Event',
                sport: selectSport,
                type: serviceType,
                title: serviceName,
                description: serviceDesc,
                isVirtual: isVirtual,
                aboutStaff: aboutStaff,
                images: photos,
            };
            dispatch(addServiceDetail(token, data, props.navigation, 2));

        }
    };

    const chooseMultipleImages = async () => {
        ImagePicker.openPicker({
            multiple: true,
            maxFiles: 6,
        })
            .then(images => {
                if (images.length > 6) {
                    showMessage('Please select max 6 photos', 'warning');
                } else {
                    setPhotosLocal(images);
                    photos = [];
                    images.forEach(async element => {
                        let tempName = new Date().getTime();
                        dispatch(setLoader(true));
                        const file = {
                            path: element.path,
                            name: tempName,
                            type: element.mime,
                        };
                        let key = await getSignedUrl(file, token);
                    });
                }
            })
            .catch(error => { });
    };

    const getSignedUrl = async (data, token) => {
        let { type, name, path } = data;
        let headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        };
        await axios
            .get(
                `${Url}api/file-upload/presigned-url?type=${type}&name=${name}`,
                { headers: headers },
            )
            .then(resp => {
                let response = resp.data;
                imageUpload(response.signedUrl, data, response.key);
                return response.key;
            })
            .catch(error => {
                const err = error;
                if (err.response) {
                    showMessage(err.response.data.message, 'warning');
                }
            });
    };

    const imageUpload = (signedUrl, file, key) => {
        const xhr = new XMLHttpRequest();
        xhr.open('PUT', signedUrl);
        xhr.setRequestHeader('Content-Type', file.type);
        xhr.upload.addEventListener('progress', event => {
            if (event.lengthComputable) {
                let percentComplete = event.loaded / event.total;
            } else {
            }
        });
        xhr.onload = () => {
            if (xhr.status != 200) {
                showMessage("error is here, 'warning'")
            }
            dispatch(setLoader(false))
            photos.push(key)
        }
        xhr.send({ uri: file.path, type: file.type, name: file.name });
    }

    const removePhoto = (item, index) => {
        if (index > -1) {
            let tempPhoto = [...photosLocal]
            tempPhoto.splice(index, 1);
            setPhotosLocal(tempPhoto)
        }
    }

    return (
        <KeyboardAvoidingView
            style={{ flex: 1, width: '100%', alignItems: 'center' }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 10 : 0}>
            <View style={styles.container}>
                <Header
                    navigation={props.navigation}
                    label="Event"
                    progressCount={progress}
                />
                <ScrollView
                    contentContainerStyle={{
                        width: wp('100'),
                        alignItems: 'center',
                        paddingBottom: 20,
                    }}>
                    <View style={styles.subContainer}>
                        <Text style={styles.headingStyle}>Event Details</Text>
                        <Text style={styles.subHeading}>
                            Please tell us about your event. The more information you provide, the easier it will be for people to book
                        </Text>

                        <DropDownSingle
                            name={selectSport}
                            data={sport}
                            getValue={getSportSelect.bind(this)}
                            label="Select the Sport or Activity"
                        />

                        <DropDownSingle
                            name={serviceType}
                            data={EventType}
                            getValue={getServiceType.bind(this)}
                            label="Select the Type of Event"
                        />

                        <CustomInputField
                            subLabel="Give your event a short distinct name or title"
                            label="Name or Title of the Event"
                            value={serviceName}
                            getValue={getServiceName.bind(this)}
                            placeholder="Archery for teenagers"
                        />
                        <View style={{ width: wp('80'), alignItems: 'center', marginTop: 10 }}>
                            <Text style={[styles.h3, { marginTop: 10, marginBottom: Platform.OS == 'android' ? 8 : 10, }]}>
                                Event Description
                            </Text>
                            <MyTextinputMultiline
                                placeholderTextColor={styles.placeholderStyle}
                                placeholder="Briefly describe the event, range of offerings,the key features, benefits or value thatmake it special and unique"
                                onChangeText={getServiceDesc.bind(this)}
                                value={serviceDesc}
                            />
                        </View>
                        <View style={{ width: wp('80'), alignItems: 'center', marginTop: 10 }}>
                            <Text style={[styles.h3, { marginTop: 10, marginBottom: Platform.OS == 'android' ? 8 : 10, }]}>
                                What's Included
                            </Text>
                            <MyTextinputMultiline
                                placeholderTextColor={styles.placeholderStyle}
                                placeholder="Tell Users what's included in the event,number of games, or stages, play-offs orfinals, equipment, pre/post social activities,awards or prizes etc..."
                                onChangeText={getInclude.bind(this)}
                                value={whatsIncluded}
                            />
                        </View>
                        <VirtualCard
                            title="This is a Virtual OnlineEvent"
                            value={isVirtual}
                            onClick={getVirtual.bind(this)}
                        />

                        <View style={{ width: wp('80'), alignItems: 'center', marginTop: 10 }}>
                            <Text style={[styles.h3, { marginTop: 10, marginBottom: Platform.OS == 'android' ? 8 : 10, }]}>The Event Venue</Text>
                            <MyTextinputMultiline
                                styles={{ height: 92, marginTop: 3 }}
                                placeholderTextColor={styles.placeholderStyle}
                                placeholder="Tell the User about the Venue, Facility orCourse that is used for your Event"
                                onChangeText={getaboutStaff.bind(this)}
                                value={aboutStaff}
                            />
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', width: wp('80'), marginTop: Platform.OS == 'android' ? 18 : 28, }}>
                            <Text style={{
                                fontFamily: FONTS.SFSemiBold,
                                fontSize: wp('3.5'),
                                color: '#000000',
                            }}>Add Photos for Your Event</Text>
                            <TouchableOpacity onPress={() => setActive(true)} >
                                <Image source={ICONS.infoIconsI} style={{ width: 12, height: 12, marginLeft: 5, marginTop: 3 }} />
                            </TouchableOpacity>
                        </View>
                        <Text style={{ width: wp('80'), color: '#707070', fontFamily: FONTS.SFRegular, fontSize: wp('3') }} >Photos help bring your service to life and show people the real experience.</Text>


                        {photosLocal.length == 0 ? (
                            <TouchableOpacity
                                onPress={() => chooseMultipleImages()}
                                style={styles.addPhotos}>
                                <Image
                                    source={ICONS.plusLightIcon}
                                    style={{ height: 24, width: 26, marginRight: 10 }}
                                    resizeMode={'contain'}
                                />
                                <Text style={styles.p}>Add up to 6 photos.</Text>
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity
                                onPress={() => chooseMultipleImages()}
                                style={styles.addPhotos}>
                                {photosLocal.map((item, index) => {
                                    return (
                                        <View key={index} style={{ height: '100%', width: '15%', margin: '1%' }}>
                                            <Image
                                                source={{ uri: item.path }}
                                                style={{ height: '100%', width: '100%', }}
                                            />
                                            <TouchableOpacity onPress={() => removePhoto(item, index)} style={{ position: 'absolute', top: 0.2, right: 0.5 }} >
                                                <Image source={ICONS.crossRed} style={{ width: 18, height: 18 }} />
                                            </TouchableOpacity>
                                        </View>
                                    );
                                })}
                            </TouchableOpacity>
                        )}

                        <View style={{ height: 40 }} />

                        <Btn
                            label="Continue"
                            onClick={() => {
                                uploadServiceDetail();
                            }}
                            bgColor="#2C99C6"
                        />
                    </View>
                </ScrollView>
                <Modal
                    onBackButtonPress={() => setActive(false)}
                    onBackdropPress={() => setActive(false)}
                    animationIn="slideInUp"
                    animationOut="slideOutDown"
                    style={{
                        flex: 1,
                        flexDirection: 'column',
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                        padding: 0,
                    }}
                    animationInTiming={200}
                    animationOutTiming={100}
                    backdropOpacity={0.4}
                    isVisible={active}>
                    <View style={styles.addAccountContainer}>
                        <Swiper
                            // index={activeIndex}
                            // onIndexChanged={(index) => setActiveIndex(index)}
                            autoplay={false}
                            style={styles.wrapper}
                            showsButtons={true}
                            showsPagination={true}
                            paginationStyle={styles.dotStyle}
                            activeDotColor="white"
                            activeDot={<View style={styles.activeScroll} />}
                            dot={<View style={styles.inActiveScroll} />}
                            nextButton={<View style={styles.fillBtn}>
                                <Text style={{ color: '#FFFFFF', fontSize: wp('3'), fontFamily: FONTS.SFMedium, }}>
                                    Next
                                </Text>
                            </View>}
                            prevButton={<View style={styles.borderBtn}>
                                <Text style={{ color: '#2C99C6', fontSize: wp('3'), fontFamily: FONTS.SFMedium, }}>
                                    Back
                                </Text>
                            </View>}
                        >
                            {tooltipArray.map((Item, index) => {
                                return (
                                    <View
                                        key={index}
                                        style={{ alignItems: 'center', paddingTop: 10 }}>
                                        <Image
                                            source={ICONS.galleryIcon}
                                            style={{ width: wp('12'), height: wp('12') }}
                                        />
                                        <Text style={styles.photoTitle}>Photo Tips</Text>
                                        <View style={{ height: 30 }} />
                                        <Text
                                            style={[styles.p, { width: wp('60'), textAlign: 'center' }]}>
                                            {Item}
                                        </Text>
                                        {/* <View style={styles.btnRow}>
                    <TouchableOpacity
                      onPress={() => setActiveIndex(index == 0 ? 0 : index - 1)}
                      style={styles.borderBtn}>
                      <Text
                        style={{
                          color: '#2C99C6',
                          fontSize: wp('3'),
                          fontFamily: FONTS.SFMedium,
                        }}>
                        Back
                      </Text>
                    </TouchableOpacity>
                    <View style={{ width: 16 }} />
                    <TouchableOpacity
                      onPress={() => setActiveIndex(index == 2 ? 2 : index + 1)}
                      style={[styles.fillBtn, { marginTop: -0, marginRight: -0}]}>
                      <Text
                        style={{
                          color: '#FFFFFF',
                          fontSize: wp('3'),
                          fontFamily: FONTS.SFMedium,
                        }}>
                        Next
                      </Text>
                    </TouchableOpacity>
                  </View> */}
                                    </View>
                                );
                            })}
                        </Swiper>
                        <TouchableOpacity
                            style={{ position: 'absolute', top: 8, right: 8 }}
                            onPress={() => setActive(false)}>
                            <Image source={ICONS.crossRed} style={{ width: 16, height: 16 }} />
                        </TouchableOpacity>
                    </View>
                </Modal>

                {loader ? <TNIndicator /> : null}
            </View>
        </KeyboardAvoidingView>
    );
};

export default addService;

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
        marginBottom: Platform.OS == 'android' ? 18 : 28,
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
    addAccountContainer: {
        width: wp('80%'),
        height: Platform.OS == 'android' ? 215 : 230,
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 4,
        paddingBottom: 12,
    },
    wrapper: {},
    buttonText: {
        color: 'white',
        fontSize: 80,
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 5,
    },
    dotStyle: {
        marginBottom: Platform.OS == 'android' ? 80 : 90,
    },
    activeScroll: {
        width: wp('7'),
        height: 7,
        backgroundColor: '#2C99C6',
        borderRadius: 7,
        margin: 2,
    },
    inActiveScroll: {
        width: 8,
        height: 8,
        backgroundColor: '#2C99C6',
        opacity: 0.18,
        borderRadius: 7,
        margin: 2,
    },
    photoTitle: {
        color: '#000000',
        fontSize: wp('4.5'),
        fontFamily: FONTS.SFBold,
        marginTop: 4,
    },
    btnRow: {
        width: wp('80'),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 16,
    },
    fillBtn: {
        width: 84,
        height: 32,
        backgroundColor: '#2C99C6',
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 150,
        marginRight: 27
    },
    borderBtn: {
        width: 84,
        height: 32,
        borderColor: '#2C99C6',
        borderRadius: 4,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 150,
        marginLeft: 27
    },
});
