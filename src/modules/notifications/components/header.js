import React,{useEffect} from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, Platform } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { useSelector } from 'react-redux'
import { FONTS, ICONS } from '../../../constant'


const header = ({navigation}) => {
    const userMode = useSelector(state => state.user.userMode)

   useEffect(() => {
     return () => {
       
     };
   }, []);
   

    return (
        <View style={styles.container} >
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Image source={ICONS.backArrow} style={styles.backBtnIcon} resizeMode="contain" />
            </TouchableOpacity>

            <View style={styles.titleRow}>
                <Image source={ICONS.notificationIcon} style={{ width: wp('6.5'), height: wp('7.5'), }} resizeMode="contain" />
                <Text style={styles.titleStyle} >Notifications</Text>
            </View>
            <View style={{ width: 12, height: 20, marginLeft: wp('7.5%') }} />
        </View>
    )
}

export default header

const styles = StyleSheet.create({
    container: {
        width: wp('100'),
        height: 75,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomColor: '#15488F1A',
        borderBottomWidth: 1,
        marginBottom:1,
        marginTop: Platform.OS == 'android' ? 0 : 30
    },
    backBtnIcon: {
        width: wp('3.5'),
        height: wp('6'),
        marginLeft: wp('7.5%')
    },
    titleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    titleStyle: {
        color: '#000000',
        fontFamily: FONTS.SFSemiBold,
        fontSize: wp('5'),
        marginLeft: 8
    }
})
