import React, { useState, useEffect } from 'react';
import {
    Alert,
    View,
    ActivityIndicator
} from 'react-native';
import { CardField, CardForm, useStripe } from '@stripe/stripe-react-native';
import Button from '../common/largeBtnSP';


const AddressScreen = () => {
    const { createToken } = useStripe();
    const [clientSecret, setClientSecret] = useState('');
    const [loader, setLoader] = useState(false);

    const pay = async () => {
        console.log("clientSecret: ", clientSecret)
        let data = {
            "brand": "Visa",
            "complete": true,
            "expiryMonth": 2,
            "expiryYear": 22,
            "last4": "4242",
            "postalCode": "6788"
        }
        setLoader(true)
        await createToken(data).then(function (result) {
            console.log("result: ", result)
            setLoader(false)
        }).catch((error) => {
            console.log(error)
            setLoader(false)
        })
    };


    // <KeyboardAvoidingView
    // behavior = { Platform.OS === 'ios' ? 'padding' : 'height' }
    // keyboardVerticalOffset = { Platform.OS === 'ios' ? 10 : 0 }

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
            <CardField
                postalCodeEnabled={true}
                placeholder={{
                    number: '4242 4242 4242 4242',
                }}
                cardStyle={{
                    backgroundColor: '#FFFFFF',
                    textColor: '#000000',
                    fontSize:10

                }}
                style={{
                    width: '100%',
                    height: 50,
                    marginVertical: 30,
                }}
                onCardChange={(cardDetails) => {
                    console.log("cardDetails: ", cardDetails)
                    setClientSecret(cardDetails)
                }}
                onFocus={(focusedField) => {
                    console.log('focusField', focusedField);
                }}
            />
            
            {
                loader
                    ?
                    <ActivityIndicator />
                    :
                    <Button label="Checkout" onClick={pay} bgColor={"green"} />
            }

        </View>
    );
};

export default AddressScreen;