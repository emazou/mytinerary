var express = require('express')
let passport = require('../config/passport')
var router = express.Router()
const {allItineraries, createItinerary, editItinerary, deleteItinerary, getItinerary, likeDislike} = require('../controllers/itineraryController')

router.post('/', createItinerary)
router.get('/',allItineraries)
router.patch('/likes/:idItinerary', passport.authenticate('jwt', {session:false}), likeDislike)
router.get('/:id', getItinerary)
router.patch('/:id', editItinerary)
router.delete('/:id', deleteItinerary) 

module.exports = router