import React, {useState, useEffect} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import Header from '../../../common/headerLogoBI';
import {SportsEventCard} from './components/eventCard';
import {EventSearchbar} from './components/eventSearchBar';
import {useDispatch, useSelector} from 'react-redux';
import TNActivityIndicator from '../../../common/TNIndicator';
import {FiltersDisplay} from './components/filtersDisplay';
import axios from 'axios';
import {Url} from '../../../constant';
import {getfavouriteList} from '../../../redux/favourite/favourite.action';

var listBackup = [];

export const SportsEvents = props => {
  const dispatch = useDispatch();
  const token = useSelector(state => state.user.token);
  const currentUser = useSelector(state => state.user.currentUser);
  const filterData = useSelector(state => state.user.filterData);
  const filterParams = useSelector(state => state.user.filterParams);
  const searchText = useSelector(state => state.listing.searchText);
  const favouriteList = useSelector(state => state.favourite.favouriteList);
  const [listings, setListings] = useState([]);
  const [loader, setLoader] = useState(true);
  const [serach, setSearch] = useState(searchText);

  useEffect(() => {
    console.log(filterData);
    if (token != null) {
      dispatch(getfavouriteList(token, 'listing', currentUser._id));
    }
    getListings();
  }, [filterData]);
  // useEffect(() => {
  //   console.log(listings);
  // }, [listings]);
  const getListings = async () => {
    //console.log('called after filter');
    setLoader(true);
    let params = {};
    if (filterData.sort != '') {
      params['sort'] = filterData.sort;
    }
    if (filterData.sport != '') {
      params['sport'] = filterData.sport;
    }
    if (filterData.type != '') {
      params['type'] = filterData.type;
    }
    if (filterData.gender != '') {
      params['gender'] = filterData.gender;
    }
    if (filterData.abilityLevel != '') {
      params['abilityLevel'] = filterData.abilityLevel;
    }
    if (filterData.goodfor != '') {
      params['goodfor'] = filterData.goodfor;
    }
    if (filterData.suitable != '') {
      params['suitable'] = filterData.suitable;
    }
    if (filterData.facilites != '') {
      params['facilites'] = filterData.facilites;
    }
    if (filterData.amenities != '') {
      params['amenities'] = filterData.amenities;
    }
    if (filterData.price.start != '') {
      params['price'] = filterData.price;
    }
    // if (filterData.duration.start != '') {
    //   params["duration"] = filterData.duration
    // }
    if (filterData.age.from != '') {
      params['age'] = filterData.age;
    }
    //console.log(filterData);
    let headers = {
      'Content-Type': 'application/json',
    };
    axios
      .get(
        `${Url}api/listing/sort-filters`,
        {
          params: params,
        },
        {headers: headers},
      )
      .then(resp => {
        setLoader(false);
        console.log(resp);
        let data = resp.data;
        setListings(data.data);
        listBackup = data.data;
        searchFilter(serach);
      })
      .catch(error => {
        const err = error;
        if (err.response) {
        }
        setLoader(false);
      });
  };

  const searchFilter = item => {
    setSearch(item);
    var categories_list = listBackup;
    const filteredCatogries = categories_list
      ? categories_list.filter(
          filterCatogry =>
            filterCatogry.title.toLowerCase().includes(item.toLowerCase()) ||
            (filterCatogry.location != undefined &&
              filterCatogry.location.shortName
                .toLowerCase()
                .includes(item.toLowerCase())) ||
            (filterCatogry.location != undefined &&
              filterCatogry.location.description
                .toLowerCase()
                .includes(item.toLowerCase())),
        )
      : [];
    setListings(filteredCatogries);
  };

  //console.log(listings);

  return (
    <View style={styles.main}>
      <Header navigation={props.navigation} />
      <ScrollView style={{width: '100%'}}>
        <View style={{width: '100%', alignItems: 'center'}}>
          <View style={{width: '90%', marginTop: 20}}>
            <EventSearchbar
              placeholder="Enter name  to search "
              navigation={props.navigation}
              getValue={searchFilter.bind(this)}
              value={serach}
            />
          </View>
          <FiltersDisplay />
          <View style={{width: '90%'}}>
            <SportsEventCard
              navigation={props.navigation}
              listings={listings.reverse()}
            />
          </View>
        </View>
      </ScrollView>
      {loader ? <TNActivityIndicator /> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F8FAFF',
  },
  filter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 122,
    height: 30,
    backgroundColor: '#61B2D4',
    borderRadius: 4,
    padding: 5,
  },
});
