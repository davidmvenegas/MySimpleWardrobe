const router = require("express").Router()
const KEY = process.env.TEST_STRIPE_KEY
const stripe = require("stripe")(KEY)

router.post("/payment", (req, res) => {
    stripe.charges.create({
        source: req.body.tokenId,
        amount: req.body.amount,
        currency: "usd"
    }, (stripeError, stripeResponse) => {
        if (stripeError) {
            return res.status(500).json(stripeError)
        } else {
            return res.status(200).json(stripeResponse)
        }
    })
})

module.exports = router