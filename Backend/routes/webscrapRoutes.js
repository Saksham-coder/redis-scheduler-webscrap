const express = require('express');
const router = express.Router();

const WebscrapController = require('./../controllers/WebscrapController')

router.route('/create').post(WebscrapController.postWebscrap)
router.route('/abort').post(WebscrapController.abortWebscrap)
router.route('/delete').post(WebscrapController.deleteWebscrap)
router.route('/').get(WebscrapController.getAllWebscrap)

module.exports = router