import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, ActivityIndicator } from 'react-native';
import { View, ScrollView } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { FONTS, Url } from '../../../constant';
import { ReviewCard } from './components/reviewCard';
import axios from 'axios';


export const Review = (props) => {
  const userId = props.route.params.userId
  const [reviewsList, setReviewsList] = useState([]);
  const [loader, setLoader] = useState(true)


  useEffect(() => {
    getReviews()
    return () => {
    }
  }, [])

  const getReviews = () => {
    let headers = {
      "Content-Type": "application/json",
    };
    axios.get(`${Url}api/reviews?recieverId=${userId}`, { headers: headers })
      .then(resp => {
        let response = resp.data
        // console.log("response: ", response.data)
        setReviewsList(response.data)
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
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      {
        loader
          ?
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
            <ActivityIndicator color={"#000000"} size={'small'} />
          </View>
          :
          <View style={styles.main}>
            <View style={{ width: '90%', marginTop: 10 }}>
              <Text style={styles.labelStyle} >Reviews ({reviewsList.length})</Text>
              {
                reviewsList.map((item, index) => {
                  return (
                    <ReviewCard key={index} data={item} />
                  )
                })
              }
            </View>
          </View>

      }
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F8FAFF',
  },
  labelStyle: {
    color: '#000000',
    fontSize: wp('7'),
    fontFamily: FONTS.SFBold,
    marginTop: 10
  },
});
