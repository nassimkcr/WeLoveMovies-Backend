const knex = require('../db/connection')
const mapProperties = require('../utils/map-properties')

const addCritic = mapProperties({preferred_name: "critic.preferred_name",surname: 'critic.surname', organization_name: 'critic.organization_name'})


async function read(reviewId){
    return knex('reviews').select('*').where({review_id: reviewId}).first()
}

async function updateReview(reviewId, updatedReview){
    return knex('reviews').select('*').where({review_id: reviewId}).update(updatedReview, '*')
}

async function getUpdatedRecord(reviewId){
    return knex("reviews as r")
    .join("critics as c", "c.critic_id", "r.critic_id")
    .select("*")
    .where({ review_id: reviewId })
    .first()
    .then(addCritic)
}

async function destroy(review_id){
    return knex('reviews').where({review_id}).del()
}

module.exports= {
    updateReview,
    read,
    delete: destroy,
    getUpdatedRecord
}