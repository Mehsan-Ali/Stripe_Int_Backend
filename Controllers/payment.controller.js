const dotenv = require('dotenv')
dotenv.config()
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

const checkoutPayment = async (req, res) => {
	try {
		const { cartItems } = req.body;

		if (!cartItems || cartItems.length === 0) {
			return res.status(400).json({ message: 'Cart is empty' });
		}

		// Map cart items to Stripe's expected format
		const line_items = cartItems.map(item => ({
			price_data: {
				currency: 'usd',
				product_data: {
					name: item.name,
				},
				unit_amount: item.price * 100, // Ensure prices are in cents
			},
			quantity: item.quantity,
		}));

		// Create a Stripe checkout session
		const session = await stripe.checkout.sessions.create({
			line_items,
			mode: 'payment',
			success_url: `${process.env.BASE_URL}/checkout-success`,
			cancel_url: `${process.env.BASE_URL}/cancel`,
		});

		console.log(session);
		res.status(200).json({ url: session.url });
	} catch (e) {
		console.log(e)
	}
}


module.exports = { checkoutPayment }
