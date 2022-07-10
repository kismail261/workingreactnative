import React, { useState, useEffect } from 'react';
import {
    showMessage,
    View
} from 'react-native';
import { useStripe } from '@stripe/stripe-react-native';
import axios from 'axios'
import { Url } from '../constant';
import Button from '../common/largeBtnSP';
import { showMessage } from '../helpers/replaceDigitsWithAesteriks';


const AddressScreen = () => {
    const { initPaymentSheet, presentPaymentSheet } = useStripe();
    const [clientSecret, setClientSecret] = useState('');

    useEffect(() => {
        fetchPaymentSheetParams();
    }, []);
    useEffect(() => {
        if (clientSecret) {
            initializePaymentSheet();
        }
    }, [clientSecret]);


    const fetchPaymentSheetParams = async () => {
        let headers = {
            "Content-Type": "application/json",
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImdvZ2lAYm94aW1haWwuY29tIiwiX2lkIjoiNjFiZTI4NGIyYjE4NzIwMDE2NDA0M2JlIiwiaXNWZXJpZmllZCI6ZmFsc2UsImlhdCI6MTY0MDIwMTc0Mn0.kBruuiaXAcChAQETzCMIw0kMYbK9AB8hWqQHoeQzrNY"
        };
        let data = {
            amount: 10
        }
        axios.post(`${Url}api/payments`, data, { headers: headers })
            .then(resp => {
                let response = resp.data
                // console.log("response: ", response)
                setClientSecret(response.client_secret)
            })
            .catch(error => {
                const err = error
                if (err.response) {
                    showMessage(err.response.data.message)
                }
            });
    };

    const initializePaymentSheet = async () => {
        if (!clientSecret) {
            return;
        }
        const { error } = await initPaymentSheet({
            paymentIntentClientSecret: clientSecret,
        });
        console.log('success');
        if (error) {
            showMessage(error);
        }
    };

    const onCheckout = () => {
        openPaymentSheet();
    };
    const openPaymentSheet = async () => {
        if (!clientSecret) {
            return;
        }
        const { error } = await presentPaymentSheet({ clientSecret });

        if (error) {
            showMessage(`Error code: ${error.code}`, 'warning', 'top', error.message);
            console.log(error.message)
        } else {
            showMessage('Your payment is confirmed!', 'success');
        }
    };



    // <KeyboardAvoidingView
    // behavior = { Platform.OS === 'ios' ? 'padding' : 'height' }
    // keyboardVerticalOffset = { Platform.OS === 'ios' ? 10 : 0 }

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
            <Button label="Checkout" onClick={onCheckout} bgColor={"red"} />
        </View>
    );
};

export default AddressScreen;