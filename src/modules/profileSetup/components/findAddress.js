import React from 'react';
import {View} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';

const findAddress = props => {
  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <GooglePlacesAutocomplete
        // currentLocation={true}
        enablePoweredByContainer={false}
        placeholder="Find a location"
        minLength={3}
        autoFocus={false}
        listViewDisplayed={false}
        fetchDetails
        renderDescription={row => row.terms[0].value}
        onPress={(data, details = null) => {
          props.handler(data, details);
        }}
        getDefaultValue={() => {
          return '';
        }}
        query={{
          key: 'AIzaSyCY8HPmdM0-oEjuON67iWUQmuMDGMXtw4w',
          language: 'en',
        }}
        styles={{
          listView: {
            width: wp('80'),
            position: 'absolute',
            zIndex: 10,
            backgroundColor: '#FFFFFF',
            marginTop: 46,
          },
          textInputContainer: {
            width: wp('80'),
            height: 46,
            backgroundColor: '#FFFFFF',
            borderWidth: 1,
            borderColor: '#70707026',
            borderRadius: 4,
            color: '#707070',
          },
        }}
        nearbyPlacesAPI="GooglePlacesSearch"
        GoogleReverseGeocodingQuery={{}}
        GooglePlacesSearchQuery={{
          rankby: 'distance',
          types: 'address',
        }}
        filterReverseGeocodingByTypes={[
          'locality',
          'administrative_area_level_3',
        ]}
      />
    </View>
  );
};

export default findAddress;
