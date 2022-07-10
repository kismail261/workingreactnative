import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import HeaderCross from './components/headerCross'
import UserDetail from './components/userDetail'
import { FONTS, ICONS } from '../../constant';
import InfoTab from './infoTab';
import { Review } from '../listing/providerProfile/review';


const TopTabs = createMaterialTopTabNavigator();

const TabStack = (props) => {
    return (
        <TopTabs.Navigator
            screenOptions={{
                tabBarStyle: { backgroundColor: '#F8FAFF' },
                tabBarIndicatorStyle: { backgroundColor: '#2C99C6', }
            }}
        >
            <TopTabs.Screen
                name="Info"
                component={InfoTab}
                options={{
                    unmountOnBlur: true,
                    headerShown: false,
                    tabBarLabel: ({ focused }) => (
                        <View style={styles.tabBtnStyle}>
                            <Image
                                source={focused ? ICONS.infoIconActive : ICONS.infoInactive}
                                style={{ width: wp('5'), height: wp('5') }}
                                resizeMode={'contain'}
                            />
                            <Text style={focused ? styles.activeTabLabel : styles.inactiveTabLabel} >Info</Text>
                        </View>
                    ),


                }}
            />
            <TopTabs.Screen
                name="Reviews"
                component={Review}
                options={{
                    unmountOnBlur: true,
                    headerShown: false,
                    tabBarLabel: ({ focused }) => (
                        <View style={styles.tabBtnStyle}>
                            <Image
                                source={focused ? ICONS.starActive : ICONS.starInactive}
                                style={{ width: wp('5'), height: wp('5') }}
                                resizeMode={'contain'}
                            />
                            <Text style={focused ? styles.activeTabLabel : styles.inactiveTabLabel} >Reviews</Text>
                        </View>
                    ),

                }}
            />
        </TopTabs.Navigator>
    )
}


const myProfile = (props) => {
    return (
        <View style={styles.container} >
            <View style={{ width: wp('100'), alignItems: 'center' }} >
                <HeaderCross label="My Profile" navigation={props.navigation} />
                <UserDetail navigation={props.navigation} />
            </View>
            <TabStack />
        </View>
    )
}

export default myProfile

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8FAFF'
    },
    tabBtnStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    activeTabLabel: {
        color: '#000000',
        fontSize: wp('4'),
        fontFamily: FONTS.SFMedium,
        marginLeft: 6
    },
    inactiveTabLabel: {
        color: '#D5D5D5',
        fontSize: wp('4'),
        fontFamily: FONTS.SFMedium,
        marginLeft: 6
    }

})
