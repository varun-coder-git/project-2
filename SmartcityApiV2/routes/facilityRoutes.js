const express = require('express');
const router = express.Router();
const FacilityController = require('../controller/FacilityController');
const auth = require('../middleware/auth');
const app = express();
router.use(auth);

router.post('/GetFacility', function (req, res) {
    FacilityController.getFacilityLocation(req, res);
});

router.put('/UpdateFacility', function (req, res) {
    FacilityController.updateLocation(req, res);
});

router.put('/RegisterFacility', function (req, res) {
    FacilityController.registerFacility(req, res);
})

router.post('/DeleteFacility', function (req, res) {
    FacilityController.deleteFacility(req, res);
})

router.post('/GetFacilityCount', function (req, res) {
    FacilityController.getFacilityCount(req, res);
})

router.post('/GetFacilityCategory', function (req, res) {
    FacilityController.getFacilityCategory(req, res);
})

router.post('/GetFacilityById', function (req, res) {
    FacilityController.getFacilityById(req, res);
})

app.use('/',router);
module.exports = router;