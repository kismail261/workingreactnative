import React, {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SportsExplore} from '../../modules/userSection/p4m1/explore';
import {SportsEventDetails} from '../../modules/userSection/p4m1/details';
import {SportsFilter} from '../../modules/userSection/p4m1/filter';
import userBottomTab from '../../modules/userSection/bottomTab';
import {SelectSchedule} from '../../modules/userSection/p4m2/booking/selectSchedule';
import chatHistory from '../../modules/chat/chatHistory';
import notifications from '../../modules/notifications';
import notificationsList from '../../modules/notifications';
import {BookingFor} from '../../modules/userSection/p4m2/booking/bookineFor';
import {ConfirmBooking} from '../../modules/userSection/p4m2/booking/confirmBooking';
import {AddChild} from '../../modules/userSection/p4m2/addAChlid';
import {UpdateChlid} from '../../modules/userSection/p4m2/updateChlid';
import {ChildAdded} from '../../modules/userSection/p4m2/successScreens/childAdded';
import {ReferAFriend} from '../../modules/p3m8/referAfriend';
import {Payment} from '../../modules/userSection/p4m2/payment/payment';
import {CardDetails} from '../../modules/userSection/p4m2/payment/addCardDetail';
import {SelectCard} from '../../modules/userSection/p4m2/payment/selectCard';
import {PaymentSuccessful} from '../../modules/userSection/p4m2/successScreens/paymentSuccessful';
import {BookingSuccessful} from '../../modules/userSection/p4m2/successScreens/bookingSuccessful';
import BookingsStack from '../../modules/userSection/userCancelBookings/stack';
import userReviewStack from '../../modules/userSection/reviewRating/stack';
import bookingDetail from '../../modules/userSection/userCancelBookings/userBookingdetail';
import {InsuranceDocument} from '../../modules/userSection/p4m2/booking/insuranceDocument';
import {GiveAReview} from '../../modules/p4m8/review/giveReview';
import rateandGiveReview from '../../modules/p4m8/review/rateandGiveReview';
import recieveReview from '../../modules/p4m8/review/recieveReview';
import {AddContact} from '../../modules/p4m8/addContact';
import accountVerificationStack from '../../modules/userSection/accountVerification/stack/accountVerificationStack';
// import userProfileDetail from '../../modules/userSection/userProfile/toptabs/toptabs';
import childStack from '../../modules/p4m8/children/stack';
import {NoPaymentMethod} from '../../modules/p4m8/payment/noPaymentMethod';
import providerDetail from '../../modules/userSection/providerProfile/toptabs/toptabs';
import {SportyClub} from '../../modules/p4m7/sportClub';
import {SportClubGold} from '../../modules/p4m7/sportClubGold';
import {RedeemPoints} from '../../modules/p4m7/redeem';
import {Notifications} from '../../modules/p3m8/notifications';
import {FavoritesTopTabs} from '../../modules/p4m8/favorites/toptabs';
import {AccountOffline} from '../../modules/p4m8/account/offline';
import {AccountHibernate} from '../../modules/p4m8/account/hibernate';
import {ConfirmHibernate} from '../../modules/p4m8/account/confirmHibernate';
import {CloseSuccess} from '../../modules/p4m8/account/closeSucces';
import {ConfirmClose} from '../../modules/p4m8/account/confirmClose';
import {HibernateSuccess} from '../../modules/p4m8/account/hibernateSuccess';
import {ViewPolicies} from '../../modules/userSection/p4m1/viewPolicies';
import {ViewLiability} from '../../modules/userSection/p4m1/viewLiability';
import {ViewFaq} from '../../modules/userSection/p4m1/viewFaq';
import {AllReviews} from '../../modules/userSection/p4m2/reviews/allReviews';
import {useSelector} from 'react-redux';

const Stack = createNativeStackNavigator();
function App() {
  const token = useSelector(state => state.user.token);
  useEffect(() => {
    return () => {};
  }, []);

  return (
    // token != null ? 'SportsExplore' : 'userBottomTab' 
    <Stack.Navigator headerMode={'none'} initialRouteName={token != null ? 'userBottomTab' : 'SportsExplore'}>
      <Stack.Screen
        name="SportsExplore"
        component={SportsExplore}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SportsEventDetails"
        component={SportsEventDetails}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="AccountOffline"
        component={AccountOffline}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ConfirmHibernate"
        component={ConfirmHibernate}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ConfirmClose"
        component={ConfirmClose}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="HibernateSuccess"
        component={HibernateSuccess}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="AccountHibernate"
        component={AccountHibernate}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="CloseSuccess"
        component={CloseSuccess}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="SportsFilter"
        component={SportsFilter}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="userBottomTab"
        component={userBottomTab}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SelectSchedule"
        component={SelectSchedule}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="chatHistory"
        component={chatHistory}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Notifications"
        component={notifications}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="notificationsList"
        component={notificationsList}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="bookineFor"
        component={BookingFor}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="AddChild"
        component={AddChild}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="UpdateChlid"
        component={UpdateChlid}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ChildAdded"
        component={ChildAdded}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ConfirmBooking"
        component={ConfirmBooking}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="InsuranceDocument"
        component={InsuranceDocument}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ReferAFriend"
        component={ReferAFriend}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Payment"
        component={Payment}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="CardDetails"
        component={CardDetails}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="SelectCard"
        component={SelectCard}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="PaymentSuccessful"
        component={PaymentSuccessful}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="BookingSuccessful"
        component={BookingSuccessful}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="BookingsList"
        component={BookingsStack}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="userReviewStack"
        component={userReviewStack}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="bookingDetail"
        component={bookingDetail}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="GiveAReview"
        component={GiveAReview}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="AddContact"
        component={AddContact}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="rateandGiveReview"
        component={rateandGiveReview}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="recieveReview"
        component={recieveReview}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="accountVerificationStack"
        component={accountVerificationStack}
        options={{
          headerShown: false,
        }}
      />
      {/* <Stack.Screen
        name="userProfileDetail"
        component={userProfileDetail}
        options={{
          headerShown: false,
        }}
      /> */}
      <Stack.Screen
        name="childStack"
        component={childStack}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="NoPaymentMethod"
        component={NoPaymentMethod}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="providerDetail"
        component={providerDetail}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="SportyClub"
        component={SportyClub}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SportClubGold"
        component={SportClubGold}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="RedeemPoints"
        component={RedeemPoints}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="NotificationSetting"
        component={Notifications}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="FavoritesTopTabs"
        component={FavoritesTopTabs}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ViewPolicies"
        component={ViewPolicies}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ViewLiability"
        component={ViewLiability}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ViewFaq"
        component={ViewFaq}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="AllReviewsUser"
        component={AllReviews}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

export default App;
