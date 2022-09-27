const express = require('express');
const router = express.Router();
const FacilityTypeController = require('../controller/FacilityTypeController');
const auth = require('../middleware/auth');
const app = express();
router.use(auth);

//hotspot route

router.post('/GetFacilityType', function (req, res) {
    FacilityTypeController.getFacilityType(req, res);
});

router.put('/RegisterFacilityType', function (req, res) {
    FacilityTypeController.registerFacilityType(req, res);
});

router.put('/UpdateFacilityType', function (req, res) {
    FacilityTypeController.updateFacilityType(req, res);
});

router.post('/DeleteFacilityType', function (req, res) {
    FacilityTypeController.deleteFacilityType(req, res);
});

app.use('/',router);
module.exports = router;