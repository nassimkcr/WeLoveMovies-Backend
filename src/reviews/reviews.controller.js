const service = require('./reviews.service')
const asyncErrorBoundary = require('../errors/asyncErrorBoundary');


async function reviewExists(req ,res, next){
    const review = await service.read(req.params.reviewId)
    if(review){
        res.locals.review = review
        return next()
    }
    return next({status: 404, message:'Review cannot be found.'})
}

async function updateReview(req ,res){
    const reviewId = res.locals.review.review_id 
     await service.updateReview(reviewId, req.body.data)

     const data = await service.getUpdatedRecord(reviewId)
    res.json({data})
}

async function destroy(req, res){
    const reviewId = res.locals.review.review_id 
    await service.delete(reviewId)
    res.sendStatus(204)
}

module.exports= {
    update: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(updateReview)],
    delete: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(destroy)]
}