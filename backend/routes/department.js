var express = require('express');
var router = express.Router();
var database = require('./db.js');
var classData = database.classData;

/* GET api page. */
router.get('/', function(req, res) {
  res.send(Object.keys(classData));
});

router.get('/dep=:depid', function(req,res){
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

router.get('/dep=:depId/type=:typeId', function(req,res){
  var courses;
  for (var i in classData){
    if (i === req.params.depId.toUpperCase()){
      courses = [];
      for (var j in classData[i]){
        if (classData[i][j].type === req.params.typeId.toUpperCase()){
          courses.push(classData[i][j]);
        }
      }
    }
  }
  if (!courses){
    res.status(404).send("No classes found");
  } else{
    res.send(courses);
  }
})

router.get('/dep=:depId/ge=:geId', function(req,res){
  var courses = [];
  for (var i in classData){
    if (i === req.params.depId.toUpperCase()){
      for (var j in classData[i]){
        for (var k in classData[i][j].ge){
          if (classData[i][j].ge[k] === req.params.geId.toUpperCase()){
            courses.push(classData[i][j]);
          }
        }
      }
    }
  }
  if (courses.length === 0){
    res.status(404).send("No clases found");
  } else{
    res.send(courses);
  }
})
  
module.exports = router;