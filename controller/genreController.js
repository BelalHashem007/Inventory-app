const query= require('../db/queries')

async function getBooksByGenre(req,res,next){
    const genre = req.params.name;
    const books = await query.getBooksByGenre(genre);
    if (!books) return next(new Error('There is no books for this genre'));
    res.render('display',{title:genre, books});
}

module.exports = {getBooksByGenre};