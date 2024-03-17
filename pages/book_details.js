let async = require('async');
let Book = require('../models/book');
let BookInstance = require('../models/bookinstance');

function get_book(id) {
  //validations 
    if (typeof id !== "string") {
        return ({status: "error"});
    }
    //right way to use params is to sanitise them using $ and {}
    return Book.findOne({'_id': {$eq: id}}).populate('author');//join
}

//doing projection-need only two properties(select)
function get_book_dtl(id) {
  return BookInstance
          .find({ 'book': id }) //using Id directly which can cause scurity vulnerabilities.
          .select('imprint status');
}

//to exceute indepent operations , using promise instead of populate
exports.show_book_dtls = async (res, id) => {
  const results = await Promise.all([get_book(id).exec(), get_book_dtl(id).exec()])
  try {
    let book = await results[0];
    let copies = await results[1];
    res.send({
      title: book.title,
      author: book.author.name,
      copies: copies,
    });
  }
  catch(err) {
    res.send(`Book ${id} not found`);
  } 
}
