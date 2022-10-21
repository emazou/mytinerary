var express = require('express');
var router = express.Router();
let passport = require('../config/passport')
const { allComments, createComment, getComment, modifyComment, deleteComment } = require('../controllers/commentController')

router.post('/', passport.authenticate('jwt', {session:false}), createComment);
router.get('/', allComments);
router.get('/:id', getComment);
router.delete('/:id', passport.authenticate('jwt', {session:false}), deleteComment);
router.patch('/:id', passport.authenticate('jwt', {session:false}), modifyComment);

module.exports = router