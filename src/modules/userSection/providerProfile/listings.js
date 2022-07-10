import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, ActivityIndicator } from 'react-native';
import { View } from 'react-native-animatable';
import { ListingsCard } from './components/listingsCard';
import axios from 'axios';
import { FONTS, Url } from '../../../constant';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';


export const Listings = (props) => {
  const userId = props.route.params.userId
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
    axios.get(`${Url}api/listing/lists?userId=${userId}`, { headers: headers })
      .then(resp => {
        let response = resp.data
        setList(response.data)
        setLoader(false)
      })
      .catch(error => {
        const err = error
        if (err.response) {
        }
        setLoader(false)
      });
  };


  return (

    <ScrollView contentContainerStyle={{ width: '100%', alignItems: 'center' }}>
      <View style={{ height: 20 }} />
      <Text style={styles.labelStyle} >Listings ({list.length})</Text>
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
    marginBottom: 6
  },
});
