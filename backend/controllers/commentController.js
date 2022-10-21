const Comment = require('../models/Comment')
const Joi = require("joi");
const validator = Joi.object({
    user: Joi.object().required(),
    comment: Joi.string().min(1).max(300).required(),
    itinerary: Joi.string().required()
})
const commentController = {
    allComments: async (req, res) => {
        let query = {}
        if (req.query.itinerary) {
            query.itinerary = req.query.itinerary
        }
        try {
            let comments = await Comment.find(query)
                .populate('user', { name: 1, lastName: 1, photo: 1, country: 1 })
                .populate('itinerary')
            if (comments) {
                res.status(200).json({
                    message: 'You get comments',
                    response: comments,
                    success: true
                })
            } else {
                res.status(404).json({
                    message: "Could't find comments",
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
    createComment: async (req, res) => {
        const { comment, itinerary } = req.body
        const user = req.user.id
        try {
            let result = await validator.validateAsync({ comment, user, itinerary });
            await new Comment({ comment, user, itinerary }).save()
            res.status(201).json({
                message: 'Comment created',
                success: true
            })
        } catch (error) {
            res.status(400).json({
                message: 'Comment not created',
                success: false
            })
        }
    },
    getComment: async (req, res) => {
        const { id } = req.params
        try {
            let comment = await Comment.findOne({ _id: id })
            if (comment) {
                res.status(200).json({
                    message: 'You get one comment',
                    response: comment,
                    success: true
                })
            } else {
                res.status(404).json({
                    message: "Could't find comment",
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
    modifyComment: async (req, res) => {
        const { id } = req.params
        const { comment } = req.body
        try {
            let commentdb = await Comment.findOneAndUpdate({ _id: id }, {comment}, { new: true })
            if (commentdb) {
                res.status(200).json({
                    message: 'You modified one comment',
                    comment: commentdb,
                    success: true
                })
            } else {
                res.status(404).json({
                    message: "Could't find comment",
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
    deleteComment: async (req, res) => {
        const { id } = req.params
        try {
            let comment = await Comment.findOneAndDelete({ _id: id })
            if (comment) {
                res.status(200).json({
                    message: 'You deleted one comment',
                    success: true
                })
            } else {
                res.status(404).json({
                    message: "Could't find comment",
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
}
module.exports = commentController