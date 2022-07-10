/**
 * @format
 */
import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import ConfirmYourPhone from './components/confirmYourPhone';
import Header from './components/header';
import IndividualContactDetails from './components/individualContactDetails';
import IndividualProviderDetails from './components/individualProviderDetails';
import IndividualProviderDetailsDOB from './components/individualProviderDetailsDOB';
import IndividualProviderDetailsService from './components/individualProviderDetailsService';
import VerificationSummaryBank from './components/verificationSummaryBank';
import VerificationSummaryDebit from './components/verificationSummaryDebit';
import PayoutDetails from './components/payoutDetails';

const paymentList = props => {
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
        <View>
          <Header
            navigation={props.navigation}
            label="Payout Method"
            progressCount={0.25}
          />
          <ScrollView contentContainerStyle={styles.contentContainer}>
            <ScrollView contentContainerStyle={styles.contentContainer}>
              <IndividualContactDetails
                backStep={moveBackward}
                nextStep={moveForward}
              />
            </ScrollView>
          </ScrollView>
        </View>
      );
      break;

    case 2:
      return (
        <ScrollView>
          <Header
            navigation={props.navigation}
            label="Payout Method"
            progressCount={0.1}
          />
          <ScrollView>
            <ConfirmYourPhone backStep={moveBackward} nextStep={moveForward} />
          </ScrollView>
        </ScrollView>
      );

    case 3:
      return (
        <ScrollView>
          <Header
            navigation={props.navigation}
            label="Payout Method"
            progressCount={0.2}
          />
          <ScrollView contentContainerStyle={styles.contentContainer}>
            <IndividualProviderDetails
              backStep={moveBackward}
              nextStep={moveForward}
            />
          </ScrollView>
        </ScrollView>
      );

    case 4:
      return (
        <ScrollView>
          <Header
            navigation={props.navigation}
            label="Payout Method"
            progressCount={0.2}
          />
          <ScrollView contentContainerStyle={styles.contentContainer}>
            <IndividualProviderDetailsService
              backStep={moveBackward}
              nextStep={moveForward}
            />
          </ScrollView>
        </ScrollView>
      );

    case 5:
      return (
        <ScrollView>
          <Header
            navigation={props.navigation}
            label="Payout Method"
            progressCount={0.22}
          />
          <ScrollView contentContainerStyle={styles.contentContainer}>
            <IndividualProviderDetailsDOB
              backStep={moveBackward}
              nextStep={moveForward}
            />
          </ScrollView>
        </ScrollView>
      );

    case 6:
      return (
        <ScrollView>
          <Header
            navigation={props.navigation}
            label="Payout Method"
            progressCount={0.25}
          />
          <ScrollView contentContainerStyle={styles.contentContainer}>
            <PayoutDetails backStep={moveBackward} nextStep={moveForward} />
          </ScrollView>
        </ScrollView>
      );

    case 7:
      return (
        <ScrollView>
          <Header
            navigation={props.navigation}
            label="Payout Method"
            progressCount={0.25}
          />
          <ScrollView contentContainerStyle={styles.contentContainer}>
            <VerificationSummaryDebit
              backStep={moveBackward}
              nextStep={moveForward}
            />
          </ScrollView>
        </ScrollView>
      );

    case 8:
      return (
        <ScrollView>
          <Header
            navigation={props.navigation}
            label="Payout Method"
            progressCount={0.25}
          />
          <ScrollView contentContainerStyle={styles.contentContainer}>
            <VerificationSummaryBank
              nextStep={() => {
                setState(1);
              }}
            />
          </ScrollView>
        </ScrollView>
      );
      
    default:
      break;
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFF',
    alignItems: 'center',
  },
  contentContainer: {
    paddingHorizontal: wp(6),
  },
});

export default paymentList;
