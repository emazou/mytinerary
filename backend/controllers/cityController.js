const City = require('../models/City')
const Joi = require('joi')

const validator = Joi.object({
    "_id": Joi.string(),
    "city": Joi.string().min(2).max(30).required().messages({message:'INVALID_CITY'}),
    "country": Joi.string().min(4).required().messages({errorType:'INVALID_COUNTRY'}),
    "photo": Joi.string().uri().required().messages({errorType:'INVALID_URL'}),
    "population": Joi.number().min(1000).max(100000000).required().messages({errorType:'INVALID_POPULATION'}),
    "fundation": Joi.number().min(1).max(2022).required().messages({errorType:'INVALID_FUNDATION'}),
})

const cityController = {
    allCities: async(req,res) => {
        let cities
        let query = {}
        if(req.query.city){
            const queryString = new RegExp(`^${req.query.city}`)
            query.city =  {$regex: queryString, $options: 'ix'}
        }
        try{
            cities = await City.find(query)
            if (cities) {
                res.status(200).json({
                    message: 'You get cities',
                    response: cities,
                    success: true
                })
            } else {
                res.status(404).json({
                    message: "Could't find cities",
                    success: false
                })
            }
        }catch(error){
            res.status(400).json({
                message: 'error',
                success: false
            })
        }
    },
    createCity: async (req, res) => {
        const { city, country, photo, population, fundation } = req.body
        try {
            let result = await validator.validateAsync(req.body)

            await new City({ city, country, photo, population, fundation }).save()
            res.status(201).json({
                message: 'City created',
                success: true
            })
        } catch (error) {
            console.log(error)
            res.status(400).json({
                message: error.message,
                success: false
            })
        }
    },
    getCity: async (req, res) => {
        const { id } = req.params
        try {
            let city = await City.findOne({ _id: id })
            if (city) {
                res.status(200).json({
                    message: 'You get one city',
                    response: city,
                    success: true
                })
            } else {
                res.status(404).json({
                    message: "Could't find city",
                    success: false
                })
            }
        } catch (error) {
            console.log(error)
            res.status(400).json({
                message: 'error',
                success: false
            })
        }
    },
    modifyCity: async (req, res) => {
        const { id } = req.params
        const citydb = req.body
        try {
            let result = await validator.validateAsync(req.body)

            let city = await City.findOneAndUpdate({ _id: id }, citydb, { new: true })
            if (city) {
                res.status(200).json({
                    message: 'You modified one city',
                    response: city,
                    success: true
                })
            } else {
                res.status(404).json({
                    message: "Could't find city",
                    success: false
                })
            }
        } catch (error) {
            console.log(error.message)
            res.status(400).json({
                message: error.message,
                success: false
            })
        }
    },
    removeCity: async (req, res) => {
        const { id } = req.params
        try {
            let city = await City.findOneAndDelete({ _id: id })
            if (city) {
                res.status(200).json({
                    message: 'You deleted one city',
                    response: city,
                    success: true
                })
            } else {
                res.status(404).json({
                    message: "Could't find city",
                    success: false
                })
            }
        } catch (error) {
            console.log(error)
            res.status(400).json({
                message: 'error',
                success: false
            })
        }
    }
}
module.exports = cityController