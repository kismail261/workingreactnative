import React, { } from 'react';
import { View } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const findAddress = (props) => {

  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <GooglePlacesAutocomplete
        placeholder='Find a location'
        minLength={3}
        autoFocus={false}
        listViewDisplayed={false}
        fetchDetails
        renderDescription={(row) => row.terms[0].value}
        onPress={(data, details = null) => {
          props.handler(data, details)
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
            marginTop: 46
          },
          textInputContainer: {
            width: wp('80'),
            height: 46,
            backgroundColor: '#FFFFFF',
            borderWidth: 1,
            borderColor: "#70707026",
            borderRadius: 4,
            color: '#707070',
          }
        }}
        nearbyPlacesAPI='GooglePlacesSearch'
        GoogleReverseGeocodingQuery={{
        }}
        GooglePlacesSearchQuery={{
          rankby: 'distance',
          types: 'address',
        }}
        filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']}
      />
    </View>
  );
}

export default findAddress;

// let array = [
//   { 
//  "geometry": { "location": { "lat": 32.5326731, "lng": 74.3675913 }, "viewport": { "northeast": [Object], "southwest": [Object] } }, "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/airport-71.png", "icon_background_color": "#10BDFF", "icon_mask_base_uri": "https://maps.gstatic.com/mapfiles/place_api/icons/v2/airport_pinlet", "international_phone_number": "+92 52 111 742 575", "name": "Sialkot International Airport", "opening_hours": { "open_now": true, "periods": [[Object]], "weekday_text": ["Monday: Open 24 hours", "Tuesday: Open 24 hours", "Wednesday: Open 24 hours", "Thursday: Open 24 hours", "Friday: Open 24 hours", "Saturday: Open 24 hours", "Sunday: Open 24 hours"] }, "photos": [{ "height": 3000, "html_attributions": [Array], "photo_reference": "Aap_uEBWmY-m-baXq2x1WV-RFBJK3uhWTdt25VA2V9724JWuxIGpW3FqFLvzNgTgDhyZp700u-84t7l3WVSKoRIYzjRlQzdaK3ToeP5epovQZ_Xp32zKRagLoRCF-gQw04MQhUcru4dEBttg-q77nUjQbL5wH64F2tk7X_BxwRhPX6MhX6hB", "width": 4000 }, { "height": 1536, "html_attributions": [Array], "photo_reference": "Aap_uECSjn9aejzQTum9zoWj1JxmKWIxIpyxlu2uoWOKZyyReVacKx6kRa6MF1rcc5XJdp1Fs6sNGNq0tJTRRZIk9DPCkcSAUglgeVM0exv_AVjK3j_wb_JjPKNjsLKgi3M6i3E6s6E-LQFDacL1SiL1Y-40zOaVQIaqiRGarvy7LNlcRZFe", "width": 2048 }, { "height": 1099, "html_attributions": [Array], "photo_reference": "Aap_uEAL8S51nF4a3k0w9aUjjLQ1ZZe5NFf-mSssKE014DhaDNrnv2KqZBCjpag47Dz32NxuukgsOAQ_5NaQRppkeUcB6kVKUbnLL3yU0R99KC4F7ZvOmPDYOPpO9c7WIgrprRZSAIN34bNYHwJ2Ng088l1QKdyMqYeOAp94SQrHbFaTp4At", "width": 1080 }, { "height": 2592, "html_attributions": [Array], "photo_reference": "Aap_uEDZrDkVrrXlKkPJYW-bQXe-zWhoZcURHkwuOC4PplTGWwyVhAnS_eLUxFCc2NCCMBGXHgM3OKv3fyFxD_chj1eGK2KgxgU5NPzac-SR5Xpptzyh_xNRpzaDFXaVMUUOObzEPkfcCsg_KIVHJnRGDxs6tPYf1YiSM0paRM8Pvrn7KZAe", "width": 4608 }, { "height": 2592, "html_attributions": [Array], "photo_reference": "Aap_uEDoCpJCczYTrqkAykv7eQycs-bfgC7G0SfY1wyqO9SIIzb-BWMNR8mbkXP9ud0BppEqAlZlhaRLn4m-gCYycurIrkAext0gslYRYlvlu2IqfDvOCvFvLjIQTN4fc2Aq-28vVDI9SRBelh9ooep9x_-Jo_y20yS_bHrFcCIaiOPf4JLN", "width": 4608 }, { "height": 945, "html_attributions": [Array], "photo_reference": "Aap_uEDC2vZdNAc34MumeW_3wAcfo6TDwJdpzJudaqF22i2RlM2MXsKl9NBOzYNK1KKlV7JOPxUVOYK0qR4vBSydDxcTapo2K9LTDt1JNDrDbKMuAWD3UCoJTPjYBdMylno7MOOOSIHWTBjtdWdcF_hjlQvTlZlTq5RZrTJp6mSC3LMx5ovF", "width": 1080 }, { "height": 3024, "html_attributions": [Array], "photo_reference": "Aap_uECR8TWVbIxm9URuZxyxubCUPs9hJ6tt0zbtDDg-JQ09UA2NMN4MzeXKbbqfNjn1yyug_R0opBY1o9vzVsWyB6yeZDrBc1ofxx6-xEg3tiXLqTw2MziwOmiiWQeucNCyMYqK0UNJHslXBsFj6Kx1e4V7uxeDRKPq6wJpgKBTBZhOF71h", "width": 4032 }, { "height": 4032, "html_attributions": [Array], "photo_reference": "Aap_uECw0HIgJYakVLjO22_dA7R2nWHlPVsdg06cVAYFWwCyHE-_Z4q35ukQOit2Dk6zFqmezVrUJAn9kuxK8DwHfo9unChOXbUdeZQ5J9PuhCVMYE3WtXlpPUq6W3OY5T5G8f324XKfPsb64g7SlP28DsOxc-ZsxAyd7_An-0ogGptj51y3", "width": 1960 }, { "height": 3024, "html_attributions": [Array], "photo_reference": "Aap_uECGa5V4tXdfGh-ittARg8FyE0cHNUY2YOIEF7Fua5VxAhhpNQEmksEceG_Tt1s3SlnbBtMyB3YeF3BPvaeLv6r6LR9Eiy9LfcwBIK37Lb4r1AffMB-na2cF12u4hfl0eufWPtG4swFPK4SyCd-ReNxNfAhOUA0JB6sJ2yo2yre7zkuQ", "width": 4032 }, { "height": 3024, "html_attributions": [Array], "photo_reference": "Aap_uEAcpfoarbyaNxF5QcDu-IOyehOEajYENN12PBJqkpRyVGHYWtZiBCCoj7dd6NH_p12Xp79NTw124H5dzX0yJUfBzKczy_0PiXMbIh-J0XU09eW3hDxs6xdA_VUZB0VIvnk9g3x0tv7DcDyrQz53SZgThHKu3ymExFNUeQUERV4TEcLQ", "width": 4032 }], "place_id": "ChIJVa8qon7mHjkRKgt7do-rxqA", "plus_code": { "compound_code": "G9M9+32 Dhanawali, Pakistan", "global_code": "8J4PG9M9+32" }, "rating": 4.2, "reference": "ChIJVa8qon7mHjkRKgt7do-rxqA", "reviews": [{ "author_name": "Shamas Munir", "author_url": "https://www.google.com/maps/contrib/109286549443535062685/reviews", "language": "en", "profile_photo_url": "https://lh3.googleusercontent.com/a/AATXAJyH6f9YRYzwkzXm7VMxfvQeiIaS7x1zRKKSkVO5=s128-c0x00000000-cc-rp-mo", "rating": 3, "relative_time_description": "a year ago", "text": "It's very good but roads destroyed ☹️", "time": 1599240669 }, { "author_name": "Naeem Iqbal", "author_url": "https://www.google.com/maps/contrib/104217549529141190094/reviews", "language": "en", "profile_photo_url": "https://lh3.googleusercontent.com/a-/AOh14Ggib9ybQuOb1mDCgy-6ItItIWgUBZBOIE9XbJ0_=s128-c0x00000000-cc-rp-mo-ba3", "rating": 2, "relative_time_description": "a year ago", "text": "Road from Wazirabad is unable to drive with mental ease even to ride bike", "time": 1599479285 }, { "author_name": "Shakir Ghani", "author_url": "https://www.google.com/maps/contrib/112843401117283895900/reviews", "language": "en", "profile_photo_url": "https://lh3.googleusercontent.com/a/AATXAJzGYPCm5tDsGnWkcuWo1hpH7lfEJMh1-LF_SHzt=s128-c0x00000000-cc-rp-mo", "rating": 1, "relative_time_description": "a year ago", "text": "No environment and not go to canteens..", "time": 1599521084 }, { "author_name": "Umair Jubran", "author_url": "https://www.google.com/maps/contrib/103429908303093125842/reviews", "language": "en", "profile_photo_url": "https://lh3.googleusercontent.com/a-/AOh14GjbD5AXlfu4xJX61HJ27rKF8Yv6C-NDgvLQeBXzMQ=s128-c0x00000000-cc-rp-mo-ba2", "rating": 5, "relative_time_description": "a year ago", "text": "i use new rood today", "time": 1599750913 }, { "author_name": "Ali Hassan", "author_url": "https://www.google.com/maps/contrib/105257369936208905403/reviews", "language": "en", "profile_photo_url": "https://lh3.googleusercontent.com/a/AATXAJzIyEf4UVWAmlEYI8e5UmIGifSJIF9yuIohpheq=s128-c0x00000000-cc-rp-mo", "rating": 5, "relative_time_description": "a year ago", "text": "Best service", "time": 1600453058 }], "types": ["airport", "point_of_interest", "establishment"], "url": "https://maps.google.com/?cid=11585135724113627946", "user_ratings_total": 2327, "utc_offset": 300, "vicinity": "14 km (8.7 mi) west of, Sialkot Airport Road, Sialkot", "website": "https://www.sial.com.pk/" }
// ]