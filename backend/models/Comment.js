const mongoose = require('mongoose')
const commentSchema = new mongoose.Schema({
    comment: { type: String, required: true, min: 1, max: 300 },
    user: { type: mongoose.Types.ObjectId, ref: 'users', required: true },
    itinerary: { type: mongoose.Types.ObjectId, ref: 'itineraries', required: true },
})
const Comment = mongoose.model(
    'comments',
    commentSchema
)
module.exports = Comment