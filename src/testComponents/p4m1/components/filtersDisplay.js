import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
} from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { FONTS } from '../../../../constant';
import { setFilterParams } from '../../../../redux/user/user.action';




export const FiltersDisplay = (props) => {
    const dispatch = useDispatch()
    const filterData = useSelector(state => state.user.filterData);
    const filterParams = useSelector(state => state.user.filterParams);



    useEffect(() => {
        return () => {
        };
    }, []);

    const setAgeValue = () => { }

    const removeFilter = (key) => {
        let temp = filterParams
        delete temp[key]
        dispatch(setFilterParams(temp))
    }


    return (
        <View style={{ width: '90%', flexDirection: 'row', marginTop: 10, marginBottom: 14, flexWrap: 'wrap', }}>

            {
                filterParams["sort"] != undefined
                    ?
                    <TouchableOpacity onPress={() => removeFilter("sort", filterParams["sort"])} style={styles.filter}>
                        <Text
                            numberOfLines={1}
                            style={{
                                fontFamily: FONTS.SFRegular,
                                fontSize: wp('3.3'),
                                color: 'white',
                            }}>
                            {filterParams["sort"]}
                        </Text>
                        <Icon name={'close-circle'} color="#FF7D7D" size={16} />
                    </TouchableOpacity>
                    :
                    null
            }

            {
                filterData.age.from != ''
                    ?
                    <TouchableOpacity onPress={setAgeValue} style={styles.filter}>
                        <Text
                            numberOfLines={1}
                            style={{
                                fontFamily: FONTS.SFRegular,
                                fontSize: wp('3.3'),
                                color: 'white',
                            }}>
                            Age: {filterData.age.from}-{filterData.age.to}
                        </Text>
                        <Icon name={'close-circle'} color="#FF7D7D" size={16} />
                    </TouchableOpacity>
                    :
                    null
            }
            {
                filterData.price.start != ''
                    ?
                    <TouchableOpacity style={styles.filter}>
                        <Text
                            numberOfLines={1}
                            style={{
                                fontFamily: FONTS.SFRegular,
                                fontSize: wp('3.3'),
                                color: 'white',
                            }}>
                            ${filterData.price.start} - ${filterData.price.end}
                        </Text>
                        <Icon name={'close-circle'} color="#FF7D7D" size={16} />
                    </TouchableOpacity>
                    :
                    null
            }
        </View>
    );
};


const styles = StyleSheet.create({
    filter: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: wp('28'),
        height: 30,
        backgroundColor: '#61B2D4',
        borderRadius: 4,
        padding: 5,
        margin: 2.5
    },

});
