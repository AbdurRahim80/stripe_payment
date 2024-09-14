import express from 'express';
import stripe, { Stripe } from 'stripe'

const app = express();
const port = process.env.PORT || 9000;
const MY_DOMAIN = 'http://localhost:5173';


app.post('/create-checkout-session', async (req, res) => {
    try {
        const stripe = new Stripe(process.env.DOMAIN_URL)
        const session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
                    price: 'price_1PygCsAGMM3q7F9qhj9f9AWg',
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${MY_DOMAIN}?success=true`,
            cancel_url: `${MY_DOMAIN}?canceled=true`,
        });

        res.redirect(303, session.url);
    } catch (error) {
        console.log("error", error);
    }
});

app.get('/', (req, res) => {
    res.send("server is running soon.........")
})

app.listen(port, () => {
    console.log(`server is running port is ${port}`);
})