var express = require('express');
var router = express.Router();
const cityRouter = require('./cities')
const commentRouter = require('./comments')
const itinerariesRouter = require('./itineraries')
const authRouter = require('./auth')
const activityRouter = require('./activities')
router.get('/', function(req, res, next) {
  res.json()
});
router.use('/auth',authRouter)
router.use('/itineraries', itinerariesRouter)
router.use('/activities', activityRouter)
router.use('/cities',cityRouter)
router.use('/comments', commentRouter)


module.exports = router;
