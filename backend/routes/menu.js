const express = require('express');
const router = express.Router();
const { getMenu, updateMenu } = require('../Controller/menuController');
const authmiddleware = require('../middlewares/authmiddleware');

router.get('/', getMenu);
router.put('/:day', authmiddleware, updateMenu);

module.exports = router;
