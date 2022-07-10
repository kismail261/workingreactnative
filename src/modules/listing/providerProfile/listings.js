import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, ActivityIndicator } from 'react-native';
import { View } from 'react-native-animatable';
import { ListingsCard } from './components/listingsCard';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { FONTS, Url } from '../../../constant';
import { setSpecificUserList } from '../../../redux/listing/listing.action';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { showMessage } from '../../../helpers/replaceDigitsWithAesteriks';


export const Listings = (props) => {
  const dispatch = useDispatch()
  const token = useSelector(state => state.user.token)
  const currentUser = useSelector(state => state.user.currentUser)
  const [list, setList] = useState([])
  const [loader, setLoader] = useState(true)

  useEffect(() => {
    getSpecificUserListings()
    return () => {
    }
  }, [])

  const getSpecificUserListings = () => {
    let headers = {
      "Content-Type": "application/json",
    };
    axios.get(`${Url}api/listing/lists?userId=${currentUser._id}`, { headers: headers })
      .then(resp => {
        let response = resp.data
        console.log("response: ", response.data)
        setList(response.data)
        setLoader(false)
        dispatch(setSpecificUserList(response.data));
      })
      .catch(error => {
        const err = error
        if (err.response) {
          showMessage(err.response.data.message)
        }
        setLoader(false)
      });
  };


  return (

    <ScrollView contentContainerStyle={{ width: '100%', alignItems: 'center' }}>
      <Text style={styles.labelStyle} >Listings ({list.length})</Text>
      <View style={{ height: 20 }} />
      {
        loader
          ?
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
            <ActivityIndicator color={"#000000"} size={'small'} />
          </View>
          :
          <>
            {
              list.map((item, index) => {
                return (
                  <ListingsCard key={index} data={item} navigation={props.navigation} />
                )
              })
            }
          </>
      }
    </ScrollView>

  );
};

const styles = StyleSheet.create({
  main: {
    // flex: 1,
    alignItems: 'center',
    backgroundColor: '#F8FAFF',
  },
  labelStyle: {
    width: '90%',
    color: '#000000',
    fontSize: wp('7'),
    fontFamily: FONTS.SFBold,
    marginTop: 10
  },
});
