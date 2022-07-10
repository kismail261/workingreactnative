import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {FONTS, ICONS, Url} from '../../constant';
import React, {useEffect, useState} from 'react';
import {ImageUrl} from '../../constant';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {useDispatch, useSelector} from 'react-redux';
import Header from '../../common/headerBLC';
import CheckboxList from 'rn-checkbox-list';
import {DropDownSingleReview} from '../../common/dropdownComponents/dropDownSingleReview';
import TNIndicator from '../../common/TNIndicator';
import {getListingArray} from '../../redux/listing/listing.action';
import {setLoader} from '../../redux/loader/loader.action';
import {showMessage} from '../../helpers/replaceDigitsWithAesteriks';

const renderItem = ({item}) => {
  return (
    <View
      style={{
        width: wp('80'),
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <Image
        source={item.src}
        // resizeMode='cover'
        style={{width: wp('7'), height: wp('7'), marginLeft: wp('1')}}
      />
      <Text
        numberOfLines={1}
        style={{
          width: '100%',
          fontSize: wp('3.2'),
          fontFamily: FONTS.SFRegular,
          color: '#000000',
          margin: wp('3'),
        }}>
        {item.name}
      </Text>
    </View>
  );
};

const theme = '#21D17F';
const border = '#BDDBE8';
const SelectReviewingUsers = props => {
  const dispatch = useDispatch();
  const token = useSelector(state => state.user.token);
  const loader = useSelector(state => state.loader.loader);
  const listingArray = useSelector(state => state.listing.listingArray);
  const [loaderUser, setLoaderUser] = useState(false);
  const [list, setList] = useState('Select Listing for Review');
  const [listID, setListID] = useState('');
  const [users, setUserList] = useState([]);
  const [usersDetails, setUserDetailList] = useState([]);
  const [listData, setListData] = useState([]);
  const [usersList, setUsersList] = useState([]);

  useEffect(() => {
    dispatch(setLoader(true));
    getUsers();
    dispatch(getListingArray(token));
    return () => {};
  }, [dispatch, getUsers, token]);

  useEffect(() => {
    setListingDropdown();
    return () => {};
  }, [listingArray, setListingDropdown]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getUsers = async () => {
    setLoaderUser(true);
    await fetch('https://api2.sporforya.com/api/users', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => response.json())
      .then(res => {
        const data = res.data;
        let tempData = [];
        data.forEach(element => {
          // console.log(element.firstName != undefined ? element.firstName : 'n/a')
          tempData.push({
            id: element._id,
            name: element.firstName != undefined ? element.firstName : 'n/a',
            src: ICONS.userIcon,
            // src: element.profile.avatar != undefined ?  ICONS.userIcon : ImageUrl + element.profile.avatar  ,
          });
        });
        setUsersList(tempData);
        setLoaderUser(false);
        return;
      })
      .catch(error => {
        const err = error;
        if (err.response) {
          showMessage(err.response.data.message);
        }
        setLoaderUser(false);
        return;
      });
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const setListingDropdown = () => {
    let tempData = [];
    listingArray.forEach(element => {
      tempData.push({
        id: element._id,
        name: element.title,
      });
    });
    setListData(tempData);
  };

  const getList = value => {
    setList(value);
  };
  const getListID = value => {
    setListID(value);
  };

  const getUserList = (item, ids) => {
    // let select = item.ids;
    setUserDetailList(item);
    setUserList(ids);
  };

  const addReviewClicked = () => {
    if (list == 'Select Listing for Review') {
      showMessage('Please select list for review');
    } else if (users.length == 0) {
      showMessage('Please select users for review');
    } else {
      let datais = {
        lisitngId: listID,
        reciverIds: users,
      };
      props.navigation.navigate('reviewProvider', {
        data: datais,
        users: usersList,
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={props.navigation} label="Review Users" />

      {loader ? (
        <TNIndicator />
      ) : (
        <KeyboardAvoidingView
          style={{flex: 1, width: '100%', alignItems: 'center'}}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 10 : 0}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{width: wp(90), alignItems: 'center'}}>
              <Text style={styles.headingStyle}>Review your Users</Text>
              <Text style={styles.subheadingStyle}>
                Share your experience with your Users for the Sporforya
                Community by giving them a Review
              </Text>
              <DropDownSingleReview
                name={list}
                data={listData}
                getValue={getList.bind(this)}
                label=""
                getListID={getListID.bind(this)}
              />

              <View style={{height: 20}} />
              <ScrollView
                showsVerticalScrollIndicator={false}
                nestedScrollEnabled={true}
                onResponderMove={() => {}}
                style={{
                  width: wp('85'),
                  maxHeight: hp('55'),
                  backgroundColor: '#F8FAFF',
                }}>
                <CheckboxList
                  headerName="Select All Users"
                  headerStyle={{
                    padding: 0,
                    backgroundColor: '#F8FAFF',
                    flexDirection: 'row',
                    alignItems: 'center',
                    alignSelf: 'center',
                    width: Platform.OS == 'android' ? wp('85') : wp('79'),
                    borderBottomWidth: 1,
                    borderBottomColor: '#D9D9D9',
                    paddingBottom: 10,
                    text: {
                      color: '#4D4D4D',
                      fontFamily: FONTS.SFSemiBold,
                      fontSize: wp('3'),
                    },
                  }}
                  theme={theme}
                  listItems={loaderUser ? [] : usersList}
                  onChange={({item, ids}) => {
                    getUserList(item, ids);
                  }}
                  onLoading={() => (
                    <View
                      style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <ActivityIndicator size="small" color="#555555" />
                      <Text style={{fontSize: 12, color: '#555555'}}>
                        Loading....
                      </Text>
                    </View>
                  )}
                  selectedListItems={users}
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
                  listItemStyle={{
                    paddingLeft: 0,
                    width: Platform.OS == 'android' ? wp('85') : wp('79'),
                    alignSelf: 'center',
                  }}
                  renderItem={renderItem}
                />
              </ScrollView>
              {Platform.OS == 'ios' ? <View style={{height: hp('5')}} /> : null}
              <TouchableOpacity
                onPress={addReviewClicked}
                style={styles.btnStyle}>
                <Text style={styles.btnText}>Add Review</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      )}
    </SafeAreaView>
  );
};

export default SelectReviewingUsers;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F8FAFF',
  },
  btnStyle: {
    width: wp('80'),
    height: 46,
    borderWidth: 1,
    borderColor: '#2C99C6',
    backgroundColor: '#2C99C6',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '8%',
  },
  btnText: {
    color: '#FFFFFF',
    fontFamily: FONTS.SFMedium,
    fontSize: wp('3.2'),
  },
  headingStyle: {
    width: wp('80'),
    color: '#000000',
    fontSize: wp('5'),
    fontFamily: FONTS.SFBold,
    marginBottom: Platform.OS == 'android' ? 5 : 10,
    marginTop: 12,
  },
  subheadingStyle: {
    width: wp('80'),
    color: '#707070',
    fontSize: wp('3.3'),
    fontFamily: FONTS.SFRegular,
    marginBottom: Platform.OS == 'android' ? -16 : -16,
  },
});
