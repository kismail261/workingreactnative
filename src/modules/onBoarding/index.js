
import React, {
    useEffect,
} from 'react';
import {
    Text,
    StyleSheet,
    View,
    Platform,
} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import Swiper from 'react-native-swiper';
import { useDispatch } from 'react-redux';
import Screen from './Item'
import { onboardingList } from './data'


const Index = (props) => {
    const dispatch = useDispatch();


    useEffect(() => {
        return () => {
        }
    }, []);


    const {
        backgroundStyle,
        activeScroll,
        inActiveScroll,
        wrapper,
        buttonText,
        dotStyle,
        swiperContainer,
    } = styles
    return (
        <View style={backgroundStyle}>
            <View style={swiperContainer} >
                <Swiper
                    autoplay={false}
                    style={wrapper}
                    showsButtons={false}
                    showsPagination={true}
                    paginationStyle={dotStyle}
                    activeDotColor="white"
                    activeDot={<View style={activeScroll} />}
                    dot={<View style={inActiveScroll} />}
                    nextButton={<Text style={buttonText}>›</Text>}
                    prevButton={<Text style={buttonText}>‹</Text>}>
                    {
                        onboardingList.map((Item, index) => {
                            return (
                                <Screen key={index} index={index} navigation={props.navigation} data={Item} />
                            )
                        })
                    }

                </Swiper>
            </View>
        </View>
    );
};

export default Index;

const styles = StyleSheet.create({
    backgroundStyle: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#212529',
    },
    swiperContainer: {
        width: "100%",
        height: "100%"
    },
    wrapper: {
    },
    buttonText: {
        color: 'white',
        fontSize: 80,
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 5,
    },
    dotStyle: {
        marginBottom: Platform.OS == 'ios' ? hp('29') : hp('25'),
    },
    activeScroll: {
        width: wp('7'),
        height: 7,
        backgroundColor: '#FFFFFF',
        borderRadius: 7,
        margin: 2
    },
    inActiveScroll: {
        width: 8,
        height: 8,
        backgroundColor: '#FFFFFF',
        opacity: 0.56,
        borderRadius: 7,
        margin: 2
    },
});
