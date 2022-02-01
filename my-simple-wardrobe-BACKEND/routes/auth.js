const router = require("express").Router()
const User = require("../models/User")
const CryptoJS = require("crypto-js")
const JWT = require("jsonwebtoken")

router.post("/register", async (req, res) => {
    // CREATE NEW USER
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.PASSWORD_SECRET).toString(),
        isAdmin: req.body.isAdmin
    })
    try {
        // CHECK EMAIL
        const email = await User.findOne({email: req.body.email})
        if (email) return res.status(401).json("Email already taken")
        // CREATE USER
        const savedUser = await newUser.save()
        // SIGN TOKEN
        const accessToken = JWT.sign({id: savedUser._id, isAdmin: savedUser.isAdmin}, process.env.JWT_SECRET, {expiresIn: "3d"})
        // SEND RESPONSE
        const {password, ...otherUserData} = savedUser._doc;
        return res.status(201).json({accessToken, ...otherUserData})
    } catch(e) {
        return res.status(500).json(e)
    }
})

router.post("/login", async (req, res) => {
    try {
        // CHECK USERNAME
        const user = await User.findOne({email: req.body.email})
        if (!user) return res.status(401).json("Email not found")
        // CHECK PASSWORD
        const originalPassword = CryptoJS.AES.decrypt(user.password, process.env.PASSWORD_SECRET).toString(CryptoJS.enc.Utf8)
        if (originalPassword !== req.body.password) return res.status(401).json("Wrong password")
        // SIGN TOKEN
        const accessToken = JWT.sign({id: user._id, isAdmin: user.isAdmin}, process.env.JWT_SECRET, {expiresIn: "3d"})
        // SEND RESPONSE
        const {password, ...otherUserData} = user._doc;
        return res.status(200).json({accessToken, ...otherUserData})
    } catch(error) {
        return res.status(500).json(error)
    }
})

module.exports = router