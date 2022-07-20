const knex = require('../db/connection')
const mapProperties = require('../utils/map-properties')

const addCritic = mapProperties({preferred_name: "critic.preferred_name",surname: 'critic.surname', organization_name: 'critic.organization_name', created_at: 'critic.created_at',updated_at: 'critic.updated_at'
})

async function list(){
    return knex('movies').select('*')
}

async function listActiveMovies(){
    return knex('movies_theaters').distinct('movie_id').where('is_showing', true)
}

async function read(movieId){
    return knex('movies').select('*').where({movie_id: movieId}).first()
}

async function listTheaters(movieId){
    return knex('theaters as t').join('movies_theaters as mt', 't.theater_id', 'mt.theater_id').select('t.*', 'mt.*').where({'mt.movie_id': movieId})
}

async function listReviews(movieId){
    return knex('reviews as r').join('critics as c', 'r.critic_id', 'c.critic_id').select('r.*', 'c.*').where({'r.movie_id': movieId}).then(reviews =>reviews.map(review => addCritic(review)))
}

module.exports={
    list,
    listActiveMovies,
    read,
    listTheaters,
    listReviews
}