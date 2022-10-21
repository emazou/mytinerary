const mongoose = require('mongoose')
const userSchema = new mongoose.Schema ({
    name: {type: String, required: true, min: 3, max: 12},
    lastName: {type: String, required: true, min: 2, max: 30},
    mail: {
        type: String, required: true, 
        validate: function (value) {
            if (!value.endsWith('gmail.com')) {
                throw new Error('INVALID_EMAIL')
            }
        }},
    password: [{type: String, required: true, min: 6}],
    photo: {
        type: String, required: true, 
        validate: function (value) {
            if (!value.startsWith('http')) {
                throw new Error('INVALID_URL')
            }
        }},
    country: {type: String, required: true, min: 4,},
    from: [{type:String, required:true, 
        validate: function (value) {
            if (value.length === 0) {
                throw new Error('INVALID_FROM')
            }
        }}],
    logged: {type:Boolean, required:true},
    verified: {type:Boolean, required:true},
    role: {type:String, required:true,
        validate: function (value) {
            if (value.length === 0) {
                throw new Error('INVALID_ROLE')
            }
        }},
    code: {type:String, required:true},
})
const User = mongoose.model(
    'users',
    userSchema
)
module.exports = User