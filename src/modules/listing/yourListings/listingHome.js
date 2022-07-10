import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useDispatch, useSelector } from 'react-redux';
import { FONTS, ICONS } from '../../../constant';
import Header from './components/header';
import ActiveBooking from './components/activeBooking';
import InactiveBooking from './components/inactiveBooking';
import DraftBooking from './components/draftBooking';
import {
  getListingArray,
  publishList,
} from '../../../redux/listing/listing.action';
import TNIndicator from '../../../common/TNIndicator';
import { showMessage } from '../../../helpers/replaceDigitsWithAesteriks';
import { OptionCard } from '../providerProfile/dashComponents/optionCard';

const listingHome = props => {
  const dispatch = useDispatch();
  const loader = useSelector(state => state.loader.loader);
  const token = useSelector(state => state.user.token);
  const currentUser = useSelector(state => state.user.currentUser);
  const listingArray = useSelector(state => state.listing.listingArray);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);

  useEffect(() => {
    dispatch(getListingArray(token));

    if (listingArray == null) {
      //Alert No Data
      showMessage('no record available');
    } else {
      console.log(listingArray)
    }

    return () => { };
  }, []);

  // const EmptyArray = () => {
  //   // if (listingArray === null) {
  //     //Alert No Data
  //   // }
  // };
  const EmptyListMessage = ({ item }) => {
    return (
      // Flat List Item
      <Text style={styles.emptyListStyle} onPress={() => getItem(item)}>
        No Data Found
      </Text>
    );
  };

  const goListLive = id => {
    dispatch(publishList(token, id, props.navigation, currentUser._id, 1));
  };

  const renderItems = ({ item }) => (
    <View>
      {item.status == 'draft' ? (
        <DraftBooking
          onClick={goListLive.bind()}
          data={item}
          navigation={props.navigation}
        />
      ) : null}
      {item.status == 'active' ? (
        <ActiveBooking
          img={ICONS.providerGallery}
          data={item}
          navigation={props.navigation}
        />
      ) : null}
      {item.status == 'completed' ? (
        <InactiveBooking
          img={ICONS.providerGallery}
          data={item}
          navigation={props.navigation}
        />
      ) : null}
    </View>
  );

  return (
    <View style={styles.container}>
      <Header navigation={props.navigation} />
      <View style={styles.divider} />

      <View style={{ marginTop: 20, width: '90%' }}>
        <OptionCard
          name="Create New Listings"
          desc="Add more choice, get more customers, make more money"
          onPress={() => props.navigation.navigate('Create New Listing')}
          icons={[
            {
              source: ICONS.ball,
              size: 25,
            },
            {
              source: ICONS.tanis,
              size: 25,
            },
            {
              size: ICONS.cycle,
              size: 25,
            },
          ]}
        />
      </View>

      <View style={styles.titleRow}>
        <Text style={styles.titleStyle}>Your Listings</Text>
        {/* <TouchableOpacity>
          <Image
            source={ICONS.dropdownIcon}
            style={{ width: 16, height: 11 }}
            resizeMode="contain"
          />
        </TouchableOpacity> */}
      </View>
      <FlatList
        ListEmptyComponent={EmptyListMessage}
        contentContainerStyle={{ width: wp('100%'), alignItems: 'center' }}
        data={listingArray}
        renderItem={renderItems}
        keyExtractor={item => item._id}
      // onEndReached={handleLoadMore}
      // onEndReachedThreshold={50}
      />
      {loader ? <TNIndicator /> : null}
    </View>
  );
};

export default listingHome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFF',
    alignItems: 'center',
  },
  divider: {
    width: wp('100'),
    height: 1,
    backgroundColor: '#15488F26',
  },
  titleRow: {
    width: wp('90'),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 16,
    marginBottom: 12,
  },
  titleStyle: {
    color: '#2A2A2A',
    fontSize: wp('8'),
    fontFamily: FONTS.SFBold,
  },
  emptyListStyle: {
    padding: 10,
    fontSize: 18,
    textAlign: 'center',
    justifyContent: 'center',
  },
});
