import React from 'react';
import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';
import { Button } from '@chakra-ui/react';

export default function PaymentBtn({children}) {
  const config = {
    public_key: 'FLWPUBK-37bab4fd2cbbc27af95dc48a57ce834b-X',
    tx_ref: Date.now(),
    amount: 100,
    currency: 'KES',
    payment_options: 'card,mobilemoney',
    customer: {
      email: 'user@gmail.com',
       phone_number: '070********',
      name: 'john doe',
    },
    customizations: {
      title: 'my Payment Title',
      description: 'Payment for items in cart',
      logo: 'https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg',
    },
  };

  const handleFlutterPayment = useFlutterwave(config);

  return (
      <Button
        w='full' 
        p='2' 
        my='4' 
        bg='#3874ff'
        onClick={() => {
          handleFlutterPayment({
            callback: (response) => {
               console.log(response);
                closePaymentModal() // this will close the modal programmatically
            },
            onClose: () => {},
          });
        }}
      >
        {children}
      </Button>
  );
}