import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({ price }) => {
    const priceForStripe = price*100;
    const publishableKey = 'pk_test_51IVL2SCThnkwCzkyWRZuLXNyHvNpMeKrOffTh1vZxjXdHWRjCneLt9Set4OnmNIeQfr4eghGd7VCDCvQSAeFTIGV00tib0yspk';

    const onToken = token => {
        console.log(token);
        alert('Payment successful');
    };

    return(
        <StripeCheckout
        label='Pay Now'
        name='Crwn Clothing'
        billingAddress
        shippingAddress
        image='https://svgshare.com/i/CUz.svg'
        amount={priceForStripe}
        description={`Your total is $${price}`}
        panelLabel='Pay Now'
        token={onToken}
        stripeKey={publishableKey}
        />
    )
};

export default StripeCheckoutButton;