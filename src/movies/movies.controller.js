const moviesService = require('./movies.service')
const asyncErrorBoundary = require('../errors/asyncErrorBoundary');

async function list(req, res){
if(req.query.is_showing){
    const data = await moviesService.listActiveMovies()
    res.json({data})
}
else{
    const data = await moviesService.list()
    res.json({data})
}

}

async function movieExists(req, res, next){

    movie = await moviesService.read(req.params.movieId)
    if(movie){
        res.locals.movie = movie
       return next();
    }
    
       return next({ status: 404, message: `movie cannot be found.` });
}

async function read(req, res, next){
    const movie= res.locals.movie
    res.json({data: movie})
}

async function listTheaters(req, res){
    const theaters = await moviesService.listTheaters(req.params.movieId)
    res.json({data: theaters})
}

async function listReviews(req, res){
    const reviews = await moviesService.listReviews(req.params.movieId)
    res.json({data: reviews})
}


module.exports={
    list: asyncErrorBoundary(list),
    read:[asyncErrorBoundary(movieExists), asyncErrorBoundary(read)],
    listTheaters,
    listReviews
}