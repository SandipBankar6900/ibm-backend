
const mongoose = require('mongoose');

const bugSchema = new mongoose.Schema({
  title: String,
  description: String ,
  source:String,
  gender: String,
  severity:String,
  raised_by:mongoose.Schema.Types.ObjectId,
  
  
});


const BugModel = mongoose.model('bug', bugSchema);
module.exports = {
    BugModel
}