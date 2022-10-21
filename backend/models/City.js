const mongoose = require('mongoose')
const schema = new mongoose.Schema({
    city: {type: String, required: true, min: 2, max: 30},
    country:{type: String, required: true, min: 4},
    photo:{type: String, required: true,
        validate: function (value) {
            if (!value.startsWith('http') && !value.endsWith('png') || !value.endsWith('jpg') ) {
                throw new Error('INVALID_URL')
            }
        }},
    population:{type: Number, required: true, min: 1000, max: 100000000},
    fundation: {type: Date, required: true},
})
const City = mongoose.model(
    'cities',
    schema
)
module.exports = City
