const router = require('express').Router()
const methodNotAllowed = require('../errors/methodNotAllowed.Js')
const controller = require('./reviews.controller')

router.route('/:reviewId').put(controller.update).delete(controller.delete).all(methodNotAllowed)

module.exports= router