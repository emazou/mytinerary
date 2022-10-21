var express = require('express');
var router = express.Router();
const {allCities,createCity,getCity,removeCity,modifyCity} = require('../controllers/cityController');

router.post('/', createCity);
router.get('/', allCities);
router.get('/:id', getCity);
router.patch('/:id', modifyCity);
router.delete('/:id', removeCity);

module.exports = router;