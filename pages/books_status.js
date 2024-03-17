let BookInstance = require('../models/bookinstance');


function getAllBooks(){
  return ;
}
exports.show_all_books_status = function(res) {
  BookInstance.find({'status': {$eq: 'Available'}})
  .populate('book')
  .exec()
  .then(list => 
    {
      res.send(list.map(function(bookInstance){
      return bookInstance.book.title+" :"+bookInstance.status;
  }));
}).catch(err => res.send('Status not found'));
}