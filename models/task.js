var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectID;


var taskSchema = new Schema({
    text: String,
    completed: Boolean,
    //dateCreated: Date,
    //dateCompleted: Date

    creator: {type: ObjectId, ref: 'User'}
});

var Task = mongoose.model('Task', taskSchema);

module.exports = Task;

