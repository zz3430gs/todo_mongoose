var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var taskSchema = new Schema({
    text: String,
    completed: Boolean
});

var Task = mongoose.model('Task', taskSchema);

module.exports = Task;

