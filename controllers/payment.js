import stripe from 'stripe';
import User from '../modules/user.js'
import createNotification from '../utils/notifcation.js'
import Project from '../modules/project.js'
import validateMongoDbId from '../utils/validate_mongodb_id.js';

const stripeInstance = stripe(process.env.STRIPE_PRIVATE_KEY);

const domainUrl = 'http://localhost:5173' ;

const joinUs = async (req, res, next) => {

  //  from req.user
  const userId = '662146a6be275abc9c8932ae' ;
  // from req.user
  const fullName = 'freelencerName' ;

  const {email, token} = req.body ;

  try {

    if (!email || !token) {
      res.status(400)
      throw new Error('please fill in all requered fields')
    }

    const account = await stripeInstance.accounts.create({
      type: 'custom',
      country: 'DZ',
      email,
      default_currency: 'dzd',
      capabilities: {
        card_payments: {
          requested: false,
        },
        transfers: {
          requested: true,
        },
      },
     
      business_type: 'company',
      company: {
        name: fullName ,
        tax_id: '123456789',
        address: {
          city: 'Algiers',
          country: 'DZ',
          line1: '123 Business St',
          postal_code: '12345',
          state: 'algiers',
        },
      },
      tos_acceptance: {
        service_agreement: 'recipient',
        date: Math.floor(Date.now() / 1000),
        ip: req.ip,
      }
    })
   
    if (!account) {
      res.status(500)
      throw new Error('something went wrong with Stripe account creation!')
    }

    const bankAccount = await stripeInstance.accounts.createExternalAccount(account.id, {
      external_account: token,
    });

    if (!bankAccount) {
      res.status(500)
      throw new Error('you can not accept payouts, contact us to solve you problem')
    }

    const userDetails = await User.findOneAndUpdate(
      { _id: userId  },
      {
        stripeAccountId: account.id,
      },
      {
        new: true,
      }
    );

    await createNotification('Your account on stripe has been create successfully',userId,'payment')

    res.status(200).json({ message: 'Join us process successful' })

  } catch (err) {
    next(err)
  }

}

// On the user side
const createCheckoutSession = async (req, res, next) => {

  // req.user
  const { _id: clientID } = '6621482abe275abc9c8932b7'

  //  req.params  
  const {id:projectId} = '6627e10e4b756d919cd006ae'

  // accepted freelencer id 
  const {id:freelencerId} = req.body

  
 
  try {

    validateMongoDbId(clientID);
    validateMongoDbId(projectId);
    validateMongoDbId(freelencerId);

    // Inputs Validation
    if (!isValidObjectId(projectId)) {
      res.status(400)
      throw new Error('enter a valid data !')
    }
   
    // Get the stripe id from the freeelencer
    const freelencer = await User.findOneById(freelencerId) ;

    const lessorStripeAccountId = freelencer.stripeAccountId ;

    if (!freelencer || !freelencer?.stripeAccountId) {
      res.status(400)
      throw new Error('Freelencer not found !')
    }
   
    // Calculate total price

    const project = await Project.findOneById(projectId) ;

    const totalPrice = project?.amount ;

    if (!project || !project?.amount) {
      res.status(400)
      throw new Error('There is not project !')
    }

    // Create payment session
    const session = await stripeInstance.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [
        {
          quantity: 1,
          price_data: {
            unit_amount: totalPrice,
            currency: "dzd",
            // Details about payment page
            product_data: {
              name: project.title,
              description: project.description
            }
          }
        }
      ],
      success_url: `${domainUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      
      // يرجعو اذا فسدت  //  The project page

      cancel_url: `${domainUrl}/payment2`,
      metadata: {
        projectId,
        // freelencer  id
        clientID: freelencerId,
      },
      payment_intent_data: {
        // fees for our application
        application_fee_amount: Math.round( totalPrice * 0.2),
        transfer_data: {
          destination: lessorStripeAccountId,
        },
      },
    })

    // Send notification
    await createNotification(`The payment on the project ${project?.title} has been created successfully `,clientID,'payment')

    return res.status(200).json({sessionId: session.id})
   
  } catch (error) {
    next(error)
  }
}




export const createReservationWebhook = async (req, res, next) => {

  const event = req.body

  console.log(event)
 
  if (event.type === 'checkout.session.completed') {
    const {clientID, projectId} = event.data.object.metadata

    const project = await Project.findByIdAndUpdate(projectId,{
      payed:true 
    },{
      new:true
    })

    await createNotification(`You have been payed successfully on the project ${project?.title}` , project.acceptedFreelencer , 'payment'  )
 
    if (!project) {
      res.status(500)
      throw new Error('error happend, contact us to refund your amount')
    }
 
    return res.status(201).json({ message: 'Payment successfully created.' })
  }

}



export default  {joinUs,createCheckoutSession,createReservationWebhook} ;