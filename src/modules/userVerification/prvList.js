/**
 * @format
 */
import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Header from './components/header';
import VerifiedProvider from './components/verifiedProvider';
import Support from './components/support';
import GovtIdNeeded from './components/govtIDNeeded';
import UploadingFront from './components/uploadingFront';
import UploadingBack from './components/uploadingBack';
import ReviewInformation from './components/reviewInformation';
import ReviewAgain from './components/reviewAgain';

const prvList = props => {
  const [state, setState] = useState(1);

  const moveForward = () => {
    setState(state + 1);
  };

  const moveBackward = () => {
    setState(state - 1);
  };

  switch (state) {
    case 1:
      return (
        <ScrollView>
          <Header
            navigation={props.navigation}
            label="Verified Provider"
            progressCount={0}
          />
          <ScrollView contentContainerStyle={styles.contentContainer}>
            <ScrollView contentContainerStyle={styles.contentContainer}>
              <VerifiedProvider nextStep={moveForward} />
            </ScrollView>
          </ScrollView>
        </ScrollView>
      );
      break;

    case 2:
      return (
        <ScrollView>
          <Header
            navigation={props.navigation}
            label="Support"
            progressCount={0}
          />
          <ScrollView contentContainerStyle={styles.contentContainer}>
            <ScrollView contentContainerStyle={styles.contentContainer}>
              <Support nextStep={moveForward} />
            </ScrollView>
          </ScrollView>
        </ScrollView>
      );
      break;

    case 3:
      return (
        <ScrollView>
          <Header
            navigation={props.navigation}
            label="Verified Provider"
            progressCount={0}
          />
          <ScrollView contentContainerStyle={styles.contentContainer}>
            <ScrollView contentContainerStyle={styles.contentContainer}>
              <GovtIdNeeded nextStep={moveForward} />
            </ScrollView>
          </ScrollView>
        </ScrollView>
      );
      break;

    case 4:
      return (
        <ScrollView>
          <Header
            navigation={props.navigation}
            label="Verified Provider"
            progressCount={0}
          />
          <ScrollView contentContainerStyle={styles.contentContainer}>
            <ScrollView contentContainerStyle={styles.contentContainer}>
              <UploadingFront nextStep={moveForward} />
            </ScrollView>
          </ScrollView>
        </ScrollView>
      );
      break;

    case 5:
      return (
        <ScrollView>
          <Header
            navigation={props.navigation}
            label="Verified Provider"
            progressCount={0}
          />
          <ScrollView contentContainerStyle={styles.contentContainer}>
            <ScrollView contentContainerStyle={styles.contentContainer}>
              <UploadingBack nextStep={moveForward} />
            </ScrollView>
          </ScrollView>
        </ScrollView>
      );
      break;

    case 6:
      return (
        <ScrollView>
          <Header
            navigation={props.navigation}
            label="Verified Provider"
            progressCount={0}
          />
          <ScrollView contentContainerStyle={styles.contentContainer}>
            <ScrollView contentContainerStyle={styles.contentContainer}>
              <ReviewInformation nextStep={moveForward} />
            </ScrollView>
          </ScrollView>
        </ScrollView>
      );
      break;

    case 7:
      return (
        <ScrollView>
          <Header
            navigation={props.navigation}
            label="Verified Provider"
            progressCount={0}
          />
          <ScrollView contentContainerStyle={styles.contentContainer}>
            <ScrollView contentContainerStyle={styles.contentContainer}>
              <ReviewAgain nextStep={moveForward} />
            </ScrollView>
          </ScrollView>
        </ScrollView>
      );
      break;

    default:
      break;
  }
};

const styles = StyleSheet.create({
  container: {},
  contentContainer: {
    paddingHorizontal: wp(4),
  },
});

export default prvList;
