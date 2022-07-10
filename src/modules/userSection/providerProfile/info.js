import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  Dimensions,
  ScrollView,
  ActivityIndicator
} from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { FONTS, ICONS, ImageUrl, Url } from '../../../constant';


export const Info = (props) => {
  const userId = props.route.params.userId
  const [userDetail, setDetail] = useState(null);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    getCurrentUserDetail()
    return () => {
    }
  }, [])

  const getCurrentUserDetail = () => {
    let headers = {
      "Content-Type": "application/json",
    };
    axios.get(`${Url}api/users/me/${userId}`, { headers: headers })
      .then(resp => {
        let response = resp.data
        setDetail(response)
        setLoader(false)
      })
      .catch(err => {
        setLoader(false)
      });
  }

  return (
    <>
      {
        loader
          ?
          <View style={{ alignSelf: 'center' }} >
            <ActivityIndicator size={'small'} color={'#000000'} />
          </View>
          :
          <>
            {
              userDetail != null && userDetail.isOrganization
                ?
                <ScrollView contentContainerStyle={styles.main}>
                  <View style={{ width: '90%', marginTop: 15.5 }}>
                    <Text style={styles.title}>Personal Info</Text>
                  </View>
                  <View style={{ width: '90%', marginTop: 9 }}>
                    <Text style={styles.subtitle}>Introduction / Bio</Text>
                    <Text style={styles.desc}>{userDetail.organizationInfo.bio != undefined ? userDetail.organizationInfo.bio : 'n/a'}</Text>
                  </View>
                  <View style={{ width: '90%', marginTop: 9 }}>
                    <Text style={styles.subtitle}>Provider Description</Text>
                    <Text style={styles.desc}>{userDetail.organizationInfo.description != undefined ? userDetail.organizationInfo.description : 'n/a'}</Text>
                  </View>
                  <View style={{ width: '90%', marginTop: 18 }}>
                    <Text style={styles.subtitle}>Gallery</Text>
                    <View style={styles.container}>
                      <FlatList
                        nestedScrollEnabled={true}
                        data={userDetail.organizationInfo.image}
                        numColumns={2}
                        renderItem={({ item, index }) => (
                          <Image
                            source={{ uri: ImageUrl + item }}
                            style={[
                              {
                                height: 178,
                                width: '48%',
                                borderRadius: 10,
                                marginBottom: 10,
                              },
                              index % 2 === 0 && { marginRight: '4%' },
                            ]}
                          />
                        )}
                      />
                    </View>
                  </View>
                </ScrollView>
                :
                <ScrollView contentContainerStyle={styles.main}>
                  <View style={{ width: '90%', marginTop: 15.5 }}>
                    <Text style={styles.title}>Personal Info</Text>
                  </View>
                  <View style={{ width: '90%', marginTop: 9 }}>
                    <Text style={styles.subtitle}>Introduction / Bio</Text>
                    <Text style={styles.desc}>{userDetail.providerInfo.bio != undefined ? userDetail.providerInfo.bio : 'n/a'}</Text>
                  </View>
                  <View style={{ width: '90%', marginTop: 9 }}>
                    <Text style={styles.subtitle}>Provider Description</Text>
                    <Text style={styles.desc}>{userDetail.providerInfo.description != undefined ? userDetail.providerInfo.description : 'n/a'}</Text>
                  </View>
                  <View style={{ width: '90%', marginTop: 18 }}>
                    <Text style={styles.subtitle}>Gallery</Text>
                    <View style={styles.container}>
                      <FlatList
                        nestedScrollEnabled={true}
                        data={userDetail.providerInfo.image}
                        numColumns={2}
                        renderItem={({ item, index }) => (
                          <Image
                            source={{ uri: ImageUrl + item }}
                            style={[
                              {
                                height: 178,
                                width: '48%',
                                borderRadius: 10,
                                marginBottom: 10,
                              },
                              index % 2 === 0 && { marginRight: '4%' },
                            ]}
                          />
                        )}
                      />
                    </View>
                  </View>
                </ScrollView>
            }

          </>
      }
    </>

  );
};

const styles = StyleSheet.create({
  main: {
    alignItems: 'center',
    backgroundColor: '#F8FAFF',
  },
  title: {
    fontFamily: FONTS.SFBold,
    color: 'black',
    fontSize: wp('6.5'),
  },
  subtitle: {
    fontFamily: FONTS.SFSemiBold,
    color: 'black',
    fontSize: wp('4.5'),
  },
  desc: {
    fontFamily: FONTS.SFRegular,
    color: 'black',
    fontSize: wp('3.5'),
    opacity: 0.46,
    marginTop: 5,
  },
  img: {
    maxWidth: Dimensions.get('window').width / 3,
    flex: 0.5,
    borderRadius: 10,
  },
  container: {
    justifyContent: 'space-between',
    marginVertical: 10,
  },
});
