var express = require('express');
//var ObjectID = require('mongodb').ObjectID;

var router = express.Router();
var Task = require('../models/task');

/* GET home page with all incomplete tasks. */
router.get('/', function(req, res, next) {

  Task.find({completed:false})
    .then((docs) =>{
    res.render('index', {title: 'Incomplete Tasks', tasks: docs})
  }).catch((err)=>{
    next(err); //to the error handler
  });
});

/* POST new task */
router.post('/add', function (req, res, next) {
    if (!req.body || !req.body.text){
      //no task text info, ignore and redirect to home page
        req.flash('error', 'please enter a task');
      res.redirect('/');
    }
    else{
      //Insert into database. New task are assumed to be not complete

      //Create a new Task, an instance of the Task schema, and call save()
      new Task({text: req.body.text, completed: false, dateCreated: new Date()}).save()
        .then((newTask)=>{
          console.log('The new task created is: ', newTask);
          res.redirect('/');
        })
        .catch((err)=>{
          next(err); //most likely to be a database error
        });
    }
});

/* POST task done */
router.post('/done', function (req, res, next) {

    Task.findOneAndUpdate({_id: req.body._id}, {$set : {completed: true, dateCompleted: new Date()}})
        .then((updatedTask)=>{
        //count how many things were updated. Expect to be 1.
        if (updatedTask){ //updatedTask is the document *before* the update
            res.redirect('/'); //one thing was updated. Redirect to home
        }else {
            //if no updatedTask, then no matching document was found to update. 404
            res.status(404).send("Error marking task done: not found");
        }})
        .catch((err)=>{
            next(err);  //For database errors, or malformed ObjectIDs.
        });
});

/* GET completed tasks */
 router.get('/completed', function (req, res, next) {

   Task.find({completed:true})
       .then((docs)=>{
       res.render('tasks_completed', {title: 'Completed tasks', tasks : docs});
     }).catch((err)=>{
     next(err);
   });

 });

 /* POST task delete */
 router.post('/delete', function(req, res, next){

     Task.deleteOne({_id : req.body._id})
         .then((result)=>{
             if (result.deletedCount === 1){
                 res.redirect('/');
             }else {
                 res.status(404).send('Error deleting task: not found');
             }
         })
         .catch((err) => {
             next(err);
         });
 });

 /* POST all tasks done */
router.post('/alldone', function (req, res, next) {

    Task.updateMany({completed : false}, {$set: {completed: true}})
        .then((result) => {
        console.log("how many documents were modified? ", result.n);
        req.flash('info', "All tasks marked as done!");
        res.redirect('/');
        })
        .catch((err) =>{
        next(err);
        })
});

/* GET details about one task */
router.get('/task/:_id', function(req, res, next){

    Task.findOne({_id : req.params._id})
        .then((task) =>{
            if (task){
                res.render('task', {title: 'Task', task: task});
            }else {
                res.status(404).send('Task not found');
            }
        })
        .catch((err) =>{
            next(err);
        })
});

/* POST delete all task that are done */
router.post('/deletedone', function (req, res, next) {
   Task.deleteMany({completed: true})
       .then((docs)=> {
           req.flash('info', 'All Completed Tasks Deleted');
           res.redirect('/');
       })
       .catch((err)=>{
            next(err);
       })
});
module.exports = router;