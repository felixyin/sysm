/**
 * Created by fy on 15-12-22.
 */
'use strict';
const express = require('express');
const router = express.Router();
const fs = require('fs');
const utils = require('../../lib/utils');
const settingsService = require('../../service/settings/index');

router.get('/', function (req, res, next) {
    res.render('settings/index');
});

router.get('/user', function (req, res, next) {
    res.render('settings/user');
});


module.exports = router;
