var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;


var taskSchema = new Schema({
    text: String,
    completed: Boolean,
    dateCreated: Date,
    dateCompleted: Date,
    creator: { type : ObjectId, ref: 'User'}
});

//Compile taskSchema into mongoose model object
var Task = mongoose.model('Task', taskSchema);

module.exports = Task;

