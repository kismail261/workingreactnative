import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Platform, TouchableOpacity, Image, ActivityIndicator, ScrollView } from 'react-native'
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
} from 'react-native-responsive-screen'
import { FONTS, ICONS } from '../../../../constant'
import CheckboxList from 'rn-checkbox-list';
import { typesProvider } from './data/typesProvider';


const renderItem = ({ item }) => {
    return (
        <View style={{ width: wp('80'), }}>
            <Text
                numberOfLines={1}
                style={{
                    width: '100%',
                    fontSize: wp('3.2'),
                    fontFamily: FONTS.SFRegular,
                    color: '#000000',
                }}>
                {item.title}
            </Text>
            <Text
                numberOfLines={2}
                style={{
                    width: '80%',
                    fontSize: wp('2.5'),
                    fontFamily: FONTS.SFRegular,
                    color: '#707070',
                }}>
                {item.subTitle}
            </Text>
        </View>
    );
};
const theme = '#21D17F';
const border = '#BDDBE8';
let selected = []
const providerTypeDropdown = ({ item, value, label, subLabel, placeHolder, getValue, }) => {
    const [loader, setLoader] = useState(true)
    const [active, setActive] = useState(false)
    const [list, setList] = useState([])

    useEffect(() => {
        setTimeout(() => {
            setLoader(false);
        }, 500);
        return () => {
        }
    }, [])
    const onClick = () => {
        setActive(!active);
    }
    const onMethodClick = (item) => {
        let select = item.items
        setList(select)
        getValue(select)
    }
    const removeItem = (id) => {
        let tempList = list.filter((item) => item.id != id)
        setList(tempList)
        getValue(tempList)
    }

    return (
        <View style={styles.backgroundStyle} >
            <Text style={styles.headingStyle} >{label}</Text>
            <Text style={styles.subheadingStyle} >{subLabel}</Text>
            <TouchableOpacity onPress={() => onClick()} style={active ? styles.activeContainer : styles.container} >
                <Text style={styles.selectTextStyle} >{placeHolder}</Text>
                <Image source={ICONS.downArrow} style={{ width: wp('2.5'), height: wp('2.5') }} resizeMode="contain" />
            </TouchableOpacity>
            {
                active
                    ?
                    <ScrollView
                        nestedScrollEnabled={true}
                        onResponderMove={() => { console.log('outer responding'); }}
                        style={{ width: wp('80'), maxHeight: 200, backgroundColor: '#FFFFFF' }} >
                        <CheckboxList
                            theme={theme}
                            listItems={loader ? [] : typesProvider}
                            onChange={(item) => {
                                onMethodClick(item)

                            }}
                            onLoading={() => (
                                <View
                                    style={{
                                        flex: 1,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}>
                                    <ActivityIndicator size="large" color="red" />
                                    <Text style={{ fontSize: 16, color: '#555555' }}>
                                        Loading....
                                    </Text>
                                </View>
                            )}
                            selectedListItems={list}
                            checkboxProp={Platform.select({
                                ios: {
                                    boxType: 'square',
                                    tintColor: border,
                                    onTintColor: theme,
                                    onCheckColor: '#fff',
                                    onFillColor: theme,
                                },
                                android: {
                                    tintColors: {
                                        true: theme,
                                        false: border,
                                    },

                                },
                            })}
                            renderItem={renderItem}
                        />
                        {/* index % 2 == 0 ?  */}
                    </ScrollView>
                    :
                    <View style={{ width: wp('80'), flexDirection: 'row', flexWrap: 'wrap' }} >
                        {list.map((item, index) => {
                            return (
                                <View key={index} style={{ padding: 4, backgroundColor: '#61B2D4', margin: 7, borderRadius: 3, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', marginLeft:2.5 }}>
                                    <Text style={{ marginLeft: 12, marginRight: 12, color: '#FFFFFF', fontSize: wp('3.5'), fontFamily: FONTS.SFRegular }} >{item.title}</Text>
                                    <TouchableOpacity onPress={() => removeItem(item.id)} style={{ marginRight: 4 }} >
                                        <Image source={ICONS.crossRed} style={{ width: 12, height: 12, }} />
                                    </TouchableOpacity>
                                </View>
                            )
                        })
                        }
                    </View>

            }


        </View>
    )
}



export default providerTypeDropdown

const styles = StyleSheet.create({
    backgroundStyle: {
        width: wp('80'),
        alignItems: 'center',
        marginTop: 12
    },
    container: {
        width: wp('80'),
        height: 46,
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#70707026',
        borderRadius: 4,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10
    },
    activeContainer: {
        width: wp('80'),
        height: 46,
        backgroundColor: '#FFFFFF',
        borderWidth: 0.5,
        borderColor: '#70707026',
        borderRadius: 4,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10
    },

    headingStyle: {
        width: wp('80'),
        color: '#000000',
        fontSize: wp("3.5"),
        fontFamily: FONTS.SFBold,
        marginBottom: Platform.OS == "android" ? 3 : 3,
    },
    subheadingStyle: {
        width: wp('80'),
        color: '#707070',
        fontSize: wp("2.8"),
        fontFamily: FONTS.SFRegular,
        marginBottom: Platform.OS == "android" ? 12 : 12,
    },
    selectTextStyle: {
        color: '#707070',
        fontSize: wp("3"),
        fontFamily: FONTS.SFRegular,
        opacity: 0.5
    },
})
