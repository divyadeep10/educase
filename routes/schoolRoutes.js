const express = require('express');
const { addSchool, listSchools } = require('../controllers/schoolController');
const { validateAddSchool, validateListSchools } = require('../middleware/validation');

const router = express.Router();

// School routes
router.post('/addSchool', validateAddSchool, addSchool);
router.get('/listSchools', validateListSchools, listSchools);

module.exports = router;