var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var AuthorSchema = new Schema(
  {
    first_name: {type: String, required: true, maxLength: 100},
    family_name: {type: String, required: true, maxLength: 100},
    date_of_birth: {type: Date},
    date_of_death: {type: Date},
  }
);

// Virtual for author's full name
//encapsulation property
AuthorSchema
.virtual('name')
.get(function () {
// To avoid errors in cases where an author does not have either a family name or first name
// We want to make sure we handle the exception by returning an empty string for that case
  var fullname = '';
  if (this.first_name && this.family_name) {
    fullname = this.family_name + ', ' + this.first_name
  }
  if (!this.first_name || !this.family_name) {
    fullname = '';
  }
  return fullname;
});

// Virtual for author's lifespan
//node models/author.js --to test
AuthorSchema.virtual('lifespan').get(function() {

  var res =' ';
  if(this.date_of_birth){
    res = this.date_of_birth.getYear().toString() +" - ";
  }
  if(this.date_of_death){
    res=res+this.date_of_death.getYear();
  }
  return res;

});

//Export model
module.exports = mongoose.model('Author', AuthorSchema);
