const mongoose = require("mongoose")
const express = require("express")
const dotenv = require("dotenv")
const cors = require("cors")
const app = express()
dotenv.config()

const authRoute = require("./routes/auth")
const usersRoute = require("./routes/users")
const productsRoute = require("./routes/products")
const cartRoute = require("./routes/cart")
const wishlistRoute = require("./routes/wishlist")
const reviewsRoute = require("./routes/reviews")
const ordersRoute = require("./routes/orders")
const stripeRoute = require("./routes/stripe")

mongoose.connect(process.env.MONGO_URL).then(console.log("CONNECTED")).catch((error) => console.error(error))

app.use(cors())
app.use(express.json())
app.use("/api/auth", authRoute)
app.use("/api/users", usersRoute)
app.use("/api/products", productsRoute)
app.use("/api/cart", cartRoute)
app.use("/api/wishlist", wishlistRoute)
app.use("/api/reviews", reviewsRoute)
app.use("/api/orders", ordersRoute)
app.use("/api/checkout", stripeRoute)

app.listen(process.env.PORT || 5000, () => console.log("listening..."))