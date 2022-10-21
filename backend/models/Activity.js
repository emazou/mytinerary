const mongoose = require('mongoose')
const activitySchema = new mongoose.Schema ({
    name: {type: String, required: true, min: 4, max: 50},
    photo: {type: String, required: true, 
        validate: function (value) {
            if (!value.startsWith('http')) {
                throw new Error('INVALID_URL')
            }
        }
    },
    itinerary: {type: mongoose.Types.ObjectId, ref: 'itineraries'} 
})
const Activity = mongoose.model(
    'activities',
    activitySchema
)
module.exports = Activity