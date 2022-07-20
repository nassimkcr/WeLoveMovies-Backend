const router = require('express').Router();
const methodNotAllowed = require('../errors/methodNotAllowed.Js');
const controller = require('./theaters.controller')

router.route('/').get(controller.list).all(methodNotAllowed)

module.exports = router