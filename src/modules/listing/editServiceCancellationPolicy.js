import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {FONTS, ICONS} from '../../constant';
import Header1 from './components/data/Header1';
import Btn from '../../common/meduimBtnSP';
import {useDispatch, useSelector} from 'react-redux';
import {setLoader} from '../../redux/loader/loader.action';
import TNIndicator from '../../common/TNIndicator';
import {getListingDetail} from '../../redux/listing/listing.action';

const editServiceCancellationPolicy = props => {
  let recordId = props.route.params.recordId;
  const [progress, setProgress] = useState(0.6);
  const dispatch = useDispatch();
  const loader = useSelector(state => state.loader.loader);
  const token = useSelector(state => state.user.token);

  useEffect(() => {
    dispatch(setLoader(false));
    dispatch(getListingDetail(token, recordId));
    setTimeout(() => {
      setProgress(0.8);
    }, 100);
    return () => {};
  }, []);

  return (
    <View style={styles.container}>
      <Header1
        navigation={props.navigation}
        label="Service"
        progressCount={progress}
      />
      <ScrollView
        contentContainerStyle={{
          width: wp('100'),
          alignItems: 'center',
          paddingBottom: 20,
        }}>
        <View style={styles.subContainer}>
          <Text style={styles.headingStyle}>Cancellation Policy</Text>
          <Text style={styles.subHeading}>
            Please choose your cancellation and refund policy that works best
            for your service
          </Text>
          <View style={styles.detailContainer}>
            <Image
              source={ICONS.greenTick}
              style={{
                width: 15,
                height: 15,
                position: 'absolute',
                top: 11,
                right: 8,
              }}
            />
            <Text style={styles.descTextStyle}>
              Users can cancel and receive a refund up to{' '}
              <Text style={{fontFamily: FONTS.SFSemiBold}}>"24 hours"</Text>{' '}
              before the start date (excluding processing fees).
            </Text>
          </View>
          <View style={styles.detailContainer}>
            <Text style={styles.descTextStyle}>
              Users can cancel and receive a refund up to{' '}
              <Text style={{fontFamily: FONTS.SFSemiBold}}>"7 days"</Text>{' '}
              before the start date (excluding processing fees).
            </Text>
          </View>
          <View style={styles.detailContainer}>
            <Text style={styles.descTextStyle}>
              Users can cancel and receive a refund up to{' '}
              <Text style={{fontFamily: FONTS.SFSemiBold}}>"30 days"</Text>{' '}
              before the start date (excluding processing fees).
            </Text>
          </View>
          <View style={{height: 40}} />
          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate('editServiceCreateCancellationPolicy', {
                recordId: recordId,
              })
            }
            style={{
              width: wp('80'),
              height: 46,
              borderColor: '#61B2D4',
              borderWidth: 1,
              borderRadius: 4,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 10,
            }}>
            <Image source={ICONS.plusIcon} style={{width: 16, height: 16}} />
            <Text
              style={{
                color: '#61B2D4',
                fontSize: wp('3'),
                fontFamily: FONTS.SFRegular,
              }}>
              {' '}
              Create your own policy
            </Text>
          </TouchableOpacity>
          <Btn
            label="Continue"
            onClick={() =>
              props.navigation.navigate('editWaiver', {
                recordId: recordId,
              })
            }
            bgColor="#2C99C6"
          />
          <View style={{height: 15}} />
        </View>
      </ScrollView>
      {loader ? <TNIndicator /> : null}
    </View>
  );
};

export default editServiceCancellationPolicy;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFF',
    alignItems: 'center',
  },
  subContainer: {
    width: wp('80%'),
    alignItems: 'center',
  },

  headingStyle: {
    width: wp('80'),
    color: '#000000',
    fontSize: wp('6.5'),
    fontFamily: FONTS.SFBold,
    marginTop: Platform.OS == 'android' ? 18 : 28,
  },
  subHeading: {
    width: wp('80'),
    color: '#707070',
    fontSize: wp('4'),
    fontFamily: FONTS.SFRegular,
    marginTop: 8,
    marginBottom: Platform.OS == 'android' ? 8 : 8,
  },
  detailContainer: {
    width: wp('80'),
    backgroundColor: 'rgba(255, 255, 255, 1)',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'rgba(21, 72, 143, 0.15)',
    padding: 12,
    marginTop: 16,
  },

  descTextStyle: {
    fontFamily: FONTS.SFRegular,
    fontSize: wp('3.5'),
    color: '#707070',
  },
  placeholderStyle: {
    color: '#707070',
    fontSize: 14,
    fontFamily: FONTS.SFRegular,
  },
  skipBtn: {
    color: 'rgba(44, 153, 198, 1)',
    fontSize: wp('3.5'),
    fontFamily: FONTS.SFMedium,
  },
});
