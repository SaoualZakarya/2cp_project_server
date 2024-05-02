import stripe from 'stripe';

const stripeInstance = stripe(process.env.STRIPE_PRIVATE_KEY);

const endpointSecret = process.env.END_POINT_SECRET ;

const createAccountStripe = async (req, res) => {
    try {
        // Extract user information from the request body
        const { email,token } = req.body;

        // Create a Stripe account for the user
        const account = await stripeInstance.accounts.create({
            type: 'custom',
            country:'DZ',
            email,
            default_currency:'dzd',
            capabilities: {
              card_payments: {
                requested: true,
              },
              transfers: {
                requested: true,
              },
            },
            business_type: 'company',
            company:{
              name:'WorkWave',
              tax_id:'123456789',
              address:{
                city:'Algiers',
                country:'DZ',
                line1:'123 Business ST',
                postal_code:'34000',
                state:'State'
              },
            },
            tos_acceptance: {
              service_agreement:'recipient',
              date: Math.floor(Date.now() / 1000),
              ip: req.ip,
            },
            metadate:{
              lessorID:sessionID.toString()
            }
        });

        if (!account) {
            return res.status(500).json({ error: 'Something went wrong with stripe' });
        }

        const bankAccount = await stripeInstance.accounts.createExternalAccount({
          external_account:token,
        });

        if(!bankAccount) {
          return res.status(500).json({ error: 'You can not accept payout' });
        }

        const userDetails = await UserExtraDetails.findOne


        // Return the created account details
        res.status(201).json({ account });
    } catch (error) {
        console.error('Error creating Stripe account:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const webHookFunction =  (request, response) => {
    const sig = request.headers['stripe-signature'];
  
    let event;
  
    try {
      event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
    } catch (err) {
      response.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }
  
    // Handle the event
    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntentSucceeded = event.data.object;
        // Then define and call a function to handle the event payment_intent.succeeded
        break;
      // ... handle other event types
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
  
    // Return a 200 response to acknowledge receipt of the event
    response.send();
} ;




const calculateOrderAmount = (items) => {
    // Replace this constant with a calculation of the order's amount
    // Calculate the order total on the server to prevent
    // people from directly manipulating the amount on the client
    return 1400;
  };

const createPaymentIntent = async (req, res) => {
    const { items } = req.body;
  
    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: calculateOrderAmount(items),
      currency: "eur",
      // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
      automatic_payment_methods: {
        enabled: true,
      },
    });
  
    res.send({
      clientSecret: paymentIntent.client_secret,
    });
} ;

export {webHookFunction,createAccountStripe,createPaymentIntent} ;