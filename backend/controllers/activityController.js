const Activity = require('../models/Activity')
const Joi = require('joi')
const validator = Joi.object({
    "name": Joi.string().min(4).max(50).required(),
    "photo": Joi.string().uri().required(),
    "itinerary": Joi.string().required()
})
const activityController = {
    allAtivities: async (req, res) => {
        let activities
        let query = {}
        if (req.query.itinerary) {
            query.itinerary = req.query.itinerary
        }
        try {
            activities = await Activity.find(query)
                .populate('itinerary')
            if (activities) {
                res.status(200).json({
                    message: 'You get activities',
                    response: activities,
                    success: true
                })
            } else {
                res.status(404).json({
                    message: "Could't find activities",
                    success: false
                })
            }
        } catch (error) {
            res.status(400).json({
                message: 'error',
                success: false
            })
        }
    },
    createActivity: async (req, res) => {
        const { name, photo, itinerary } = req.body
        try {
            let result = await validator.validateAsync(req.body)
            await new Activity({ name, photo, itinerary }).save()
            res.status(201).json({
                message: 'Activity created',
                success: true
            })
        } catch (error) {
            res.status(400).json({
                message: 'Activity not created',
                success: false
            })
        } 
    },
    getActivity: async (req, res) => {
        const { id } = req.params
        try {
            let activity = await Activity.findOne({ _id: id })
                .populate('itinerary')
            if (activity) {
                res.status(200).json({
                    message: 'You get one activity',
                    response: activity,
                    success: true
                })
            } else {
                res.status(404).json({
                    message: "Could't find activity",
                    success: false
                })
            }
        } catch (error) {
            res.status(400).json({
                message: 'error',
                success: false
            })
        }
    },
    editActivity: async (req, res) => {
        const { id } = req.params
        const activity = req.body
        try {
            let activitydb = await Activity.findOneAndUpdate({ _id: id }, activity, { new: true })
            if (activitydb) {
                res.status(200).json({
                    message: 'You modified one activity',
                    response: city,
                    success: true
                })
            } else {
                res.status(404).json({
                    message: "Could't find activity",
                    success: false
                })
            }
        } catch (error) {
            res.status(400).json({
                message: 'error',
                success: false
            })
        }
    },
    deleteActivity: async (req, res) => {
        const { id } = req.params
        try {
            let activity = await Activity.findOneAndDelete({ _id: id })
            if (activity) {
                res.status(200).json({
                    message: 'You deleted one activity',
                    response: activity,
                    success: true
                })
            } else {
                res.status(404).json({
                    message: "Could't find activity",
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
module.exports = activityController