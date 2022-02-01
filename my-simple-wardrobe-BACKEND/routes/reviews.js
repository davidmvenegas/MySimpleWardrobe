const router = require("express").Router()
const Review = require("../models/Review")

// CREATE REVIEW
router.post("/", async (req, res) => {
    const newReview = new Review(req.body)
    try {
        const productId = await Review.findOne({productId: req.body.productId})
        if (productId) return res.status(401).json("Duplicate Product")
        const savedReview = await newReview.save()
        res.status(200).json(savedReview)
    } catch (error) {
        return res.status(500).json(error)
    }
})

// UPDATE REVIEW
router.patch("/:productId", async (req, res) => {
    try {
        const filter = {productId: req.params.productId}
        const updatedReview = await Review.findOneAndUpdate(filter, req.body, {new: true})
        return res.status(200).json(updatedReview)
    } catch (error) {
        return res.status(500).json(error)
    }
})

// DELETE REVIEW
router.delete("/:id", async (req, res) => {
    try {
        await Review.findByIdAndDelete(req.params.id)
        return res.status(200).json("Review has been deleted")
    } catch (error) {
        return res.status(500).json(error)
    }
})

// GET SINGLE REVIEW
router.get("/:productId", async (req, res) => {
    try {
        const review = await Review.findOne({productId: req.params.productId})
        return res.status(200).json(review)
    } catch (error) {
        return res.status(500).json(error)
    }
})

// GET ALL REVIEWS
router.get("/", async (req, res) => {
    try {
        const reviews = await Review.find()
        res.status(200).json(reviews)
    } catch (error) {
        return res.status(500).json(error)
    }
})

module.exports = router