const express = require('express');
const router = express.Router();

const CartServices = require('../services/cart_services')
const Stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

const { checkIfAuthenticated } = require('../middlewares');

router.get('/', checkIfAuthenticated, async (req, res) => {
    const cart = new CartServices(req.session.user.id);

    // get all the items from the cart
    let items = await cart.getCart();

    // step 1 - create line items
    let lineItems = [];
    let meta = [];
    for (let i of items) {
       const lineItem = {
            'quantity': i.get('quantity'),
            'price_data': {
                'currency':'SGD',
                'unit_amount': i.related('poster').get('cost'),
                'product_data':{
                    'name': i.related('poster').get('title'),  
                    
                }
            }
   
        }
        if (i.related('poster').get('image_url')) {
             lineItem.price_data.poster_data.images = [ i.related('poster').get('image_url')];
        }
        lineItems.push(lineItem);
        // save the quantity data along with poster id
        meta.push({
            'poster_id' : i.get('poster_id'),
            'quantity': i.get('quantity')
        })
    }

    // step 2 - create stripe payment
    let metaData = JSON.stringify(meta);
    const payment = {
        payment_method_types: ['card'],
        mode:'payment',
        line_items: lineItems,
        success_url: "http://www.google.com",
        cancel_url: "http://www.yahoo.com",
        metadata: {
            'orders': metaData
        }
    }

    // step 3: register the session
    let stripeSession = await Stripe.checkout.sessions.create(payment)
    res.render('checkout/checkout', {
        'sessionId': stripeSession.id, // 4. Get the ID of the session
        'publishableKey': process.env.STRIPE_PUBLISHABLE_KEY
    })


})

module.exports = router;