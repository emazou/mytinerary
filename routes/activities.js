var express = require('express')
var router = express.Router()

const { allAtivities, createActivity, getActivity, editActivity, deleteActivity} = require('../controllers/activityController')

router.post('/', createActivity);
router.get('/', allAtivities);
router.get('/:id', getActivity);
router.patch('/:id', editActivity);
router.delete('/:id', deleteActivity);

module.exports = router