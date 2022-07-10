/**
 * @format
 */
import React, { useRef } from 'react';
import { SafeAreaView, View, Text, StyleSheet, ScrollView } from 'react-native';

import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Btn from '../../common/meduimBtnSP';
import { FONTS } from '../../constant';
import Header from '../../common/headerBLC';

const verifyBadge = props => {

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <SafeAreaView style={styles.container}>
                <Header
                    navigation={props.navigation}
                    label="Verification Badge"
                />
                <View style={{ height: Platform.OS == 'android' ? 18 : 28, }} />
                <Text style={styles.headingStyle}>Get your</Text>
                <Text style={styles.headingStyle}>Verification Badge</Text>
                <Text style={styles.subHeading}>
                    As part of our commitment to Trust and Safety, we are always working on making our community as secure as possible for everyone. That's why when joining Sporforya, we ask for a certain amount of information to help us verify your identification.</Text>

                <View style={{ paddingVertical: 5 }}></View>

                <Text style={styles.subHeading}>
                    All individuals using Sporforya are asked to confirm their identity by uploading a photo of a Government issued ID (ex: Drivers License).
                </Text>

                <Text style={styles.subHeading}>
                    Thank you!
                </Text>
                <Text style={styles.subHeading}>
                    For more info visit our {' '}
                    <Text
                        onPress={() => { props.navigation.navigate("supportBadge") }}
                        style={{
                            textDecorationColor: '#49a6ce',
                            color: '#49a6ce',
                            fontWeight: 'bold',
                        }}>
                        Support Center
                    </Text>
                </Text>

                <View style={{ paddingVertical: 20 }}></View>

                <View style={{ alignSelf: 'center' }}>
                    <Btn
                        label="Continue"
                        onClick={() => {
                            props.navigation.navigate("uploadingBadgeFront");
                        }}
                        bgColor="#2C99C6"
                    />
                </View>
            </SafeAreaView>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8FAFF',
        alignItems: 'center',
    },
    headingStyle: {
        width: wp('80'),
        color: '#000000',
        fontSize: wp('6.5'),
        fontFamily: FONTS.SFBold,
    },
    subHeading: {
        width: wp('80'),
        color: '#707070',
        fontSize: wp('4'),
        fontFamily: FONTS.SFRegular,
        marginTop: 8,
        marginBottom: Platform.OS == 'android' ? 8 : 8,
    },
    inputHeading: {
        color: '#000000',
        fontSize: wp('4'),
        fontFamily: FONTS.SFBold,
        marginTop: Platform.OS == 'android' ? 10 : 18,
    },
    inputSubHeading: {
        color: '#707070',
        fontSize: wp('3.5'),
        fontFamily: FONTS.SFRegular,
        marginTop: 8,
        marginBottom: Platform.OS == 'android' ? 8 : 8,
    },
});

export default verifyBadge;
