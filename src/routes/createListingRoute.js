import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import listingTypes from '../modules/listing/listingTypes';
import addServiceDetail from '../modules/listing/addServiceDetail';
import particulars from '../modules/listing/particulars';
import serviceLocation from '../modules/listing/serviceLocation';
import facilities from '../modules/listing/facilities';
import schedulePrice from '../modules/listing/schedulePrice';
import updateSchedulePrice from '../modules/listing/updateSchedulePrice';
import frequentlyQuestions from '../modules/listing/frequentlyQuestions';
import cancellationPolicy from '../modules/listing/cancellationPolicy';
import createCancellationPolicy from '../modules/listing/createCancellationPolicy';
import releaseLiability from '../modules/listing/releaseLiability';

import addEventDetail from '../modules/listing/events/addEventDetail';
import particularsEvents from '../modules/listing/events/particularsEvents';
import eventLocation from '../modules/listing/events/eventLocation';
import facilitiesEvent from '../modules/listing/events/facilitiesEvent';
import schedulePriceEvents from '../modules/listing/events/schedulePriceEvents';
import frequentlyQuestionsEvent from '../modules/listing/events/frequentlyQuestionsEvent';
import cancellationPolicyEvent from '../modules/listing/events/cancellationPolicyEvent';
import createCancellationPolicyEvent from '../modules/listing/events/createCancellationPolicyEvent';
import releaseLiabilityEvent from '../modules/listing/events/releaseLiabilityEvent';

//facilities
import addFacilityDetail from '../modules/listing/facilities/addFacilityDetail';
import particularsFacilities from '../modules/listing/facilities/particularsFacilities';
import facilityLocation from '../modules/listing/facilities/facilityLocation';
import facilitiesFacy from '../modules/listing/facilities/facilitiesFacy';
import schedulePriceFacility from '../modules/listing/facilities/schedulePriceFacility';
import InsuranceRequirements from '../modules/listing/facilities/InsuranceRequirements';
import frequentlyQuestionsFacility from '../modules/listing/facilities/frequentlyQuestionsFacility';
import cancellationPolicyFacilty from '../modules/listing/facilities/cancellationPolicyFacilty';
import createCancellationPolicyFacility from '../modules/listing/facilities/createCancellationPolicyFacility';
import releaseLiabilityFacility from '../modules/listing/facilities/releaseLiabilityFacility';
import ProviderProfileTopTabs from '../modules/listing/providerProfile/toptabs/toptabs';

//all use
import publishListing from '../modules/listing/publishListing';

import editAddServiceDetail from '../modules/listing/editListing/editAddServiceDetail';
// import editServiceParticular from '../modules/listing/editServiceParticipantParticular';
// import editServiceLocation from '../modules/listing/editServiceLocation';
// import editServiceFacilities from '../modules/listing/editServiceFacilities';
// import editServiceSchedulePrice from '../modules/listing/editServiceSchedulePrice';
// import editServiceFAQ from '../modules/listing/editServiceFAQ';
// import editServiceCancellationPolicy from '../modules/listing/editServiceCancellationPolicy';
// import editServiceCreateCancellationPolicy from '../modules/listing/editServiceCreateCancellationPolicy';
// import editServiceReleaseLiability from '../modules/listing/editServiceReleaseLiability';
// import editEventDetails from '../modules/listing/events/edit/editEventDetails';
// import editEventParticular from '../modules/listing/events/edit/editEventParticipantParticulars';
// import editEventLocation from '../modules/listing/events/edit/editEventLocation';
// import editEventFacilities from '../modules/listing/events/edit/editEventFacilities';
// import editEventSchedulePrice from '../modules/listing/events/edit/editEventSchedulePrice';
// import editFacilityDetails from '../modules/listing/facilities/edit/editFacilityDetails';
// import editFacilityParticular from '../modules/listing/facilities/edit/editFacilityParticipantParticular';
// import editFacilityLocation from '../modules/listing/facilities/edit/editFacilityLocation';
// import editFacilityFacilities from '../modules/listing/facilities/edit/editFacilityFacilities';
// import editFacilitySchedulePrice from '../modules/listing/facilities/edit/editFacilitySchedulePrice';

const Stack = createNativeStackNavigator();
function App() {
  return (
    <Stack.Navigator headerMode={'none'} initialRouteName={'listingTypes'}>
      <Stack.Screen
        name="listingTypes"
        component={listingTypes}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="addServiceDetail"
        component={addServiceDetail}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="particulars"
        component={particulars}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="serviceLocation"
        component={serviceLocation}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="facilities"
        component={facilities}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="schedulePrice"
        component={schedulePrice}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="updateSchedulePrice"
        component={updateSchedulePrice}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="frequentlyQuestions"
        component={frequentlyQuestions}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="cancellationPolicy"
        component={cancellationPolicy}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="createCancellationPolicy"
        component={createCancellationPolicy}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="releaseLiability"
        component={releaseLiability}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="addEventDetail"
        component={addEventDetail}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="particularsEvents"
        component={particularsEvents}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="eventLocation"
        component={eventLocation}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="facilitiesEvent"
        component={facilitiesEvent}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="schedulePriceEvents"
        component={schedulePriceEvents}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="frequentlyQuestionsEvent"
        component={frequentlyQuestionsEvent}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="cancellationPolicyEvent"
        component={cancellationPolicyEvent}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="createCancellationPolicyEvent"
        component={createCancellationPolicyEvent}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="releaseLiabilityEvent"
        component={releaseLiabilityEvent}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="addFacilityDetail"
        component={addFacilityDetail}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="particularsFacilities"
        component={particularsFacilities}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="facilityLocation"
        component={facilityLocation}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="facilitiesFacy"
        component={facilitiesFacy}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="schedulePriceFacility"
        component={schedulePriceFacility}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="InsuranceRequirements"
        component={InsuranceRequirements}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="frequentlyQuestionsFacility"
        component={frequentlyQuestionsFacility}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="cancellationPolicyFacilty"
        component={cancellationPolicyFacilty}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="createCancellationPolicyFacility"
        component={createCancellationPolicyFacility}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="releaseLiabilityFacility"
        component={releaseLiabilityFacility}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="providerProfile"
        component={ProviderProfileTopTabs}
        options={{
          headerShown: false,
        }}
      />

      {/* Edit Service Listing */}

       <Stack.Screen
        name="editAddServiceDetail"
        component={editAddServiceDetail}
        options={{
          headerShown: false,
        }}
      />

      {/* <Stack.Screen
        name="editServiceParticulars"
        component={editServiceParticular}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="editServiceLocation"
        component={editServiceLocation}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="editServiceFacilities"
        component={editServiceFacilities}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="editServiceSchedulePrice"
        component={editServiceSchedulePrice}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="editServiceFAQ"
        component={editServiceFAQ}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="editServiceCancellationPolicy"
        component={editServiceCancellationPolicy}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="editServiceCreateCancellationPolicy"
        component={editServiceCreateCancellationPolicy}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="editWaiver"
        component={editServiceReleaseLiability}
        options={{
          headerShown: false,
        }}
      /> */}

      {/* Edit Event Listing */}

      {/* <Stack.Screen
        name="editEventDetails"
        component={editEventDetails}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="editEventParticulars"
        component={editEventParticular}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="editEventLocation"
        component={editEventLocation}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="editEventFacilities"
        component={editEventFacilities}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="editEventSchedulePrice"
        component={editEventSchedulePrice}
        options={{
          headerShown: false,
        }}
      /> */}

      {/* Edit Facility Listings */}

      {/* <Stack.Screen
        name="editFacilityDetails"
        component={editFacilityDetails}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="editFacilityParticulars"
        component={editFacilityParticular}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="editFacilityLocation"
        component={editFacilityLocation}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="editFacilityFacilities"
        component={editFacilityFacilities}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="editFacilitySchedulePrice"
        component={editFacilitySchedulePrice}
        options={{
          headerShown: false,
        }}
      /> */}

      {/* PublishListing screen is same for all 3 types of listings */}

      <Stack.Screen
        name="publishListing"
        component={publishListing}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

export default App;
