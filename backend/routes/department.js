var express = require('express');
var router = express.Router();
var database = require('./db.js');
var classData = database.classData;

/* GET api page. */
router.get('/', function(req, res) {
  res.send(Object.keys(classData));
});

router.get('/:depid', function(req,res){
  var courses;
  for (var i in classData){
    if (i === req.params.depid.toUpperCase()){
      courses = classData[i];
    }
  }
  if (!courses){
    res.status(404).send("department not found");
  } else{
    res.send(courses);
  }
})
  
module.exports = router;