var express = require('express');
var router = express.Router();
var fetch = require('node-fetch');
var json = require('json');

var classData = {};
var items = {};

const getData=()=>{
    fetch('https://andromeda.miragespace.net/slugsurvival/data/fetch/terms/2210')
    .then(res => res.json()) 
    .then(json => {
        items = json;
        parsedata();
        //console.log(items);
        //return json;
      });
}

getData();

function parsedata() {
  console.log("Started parse data");
  //console.log(items);
  Object.entries(items).map(department => {
    //console.log(department[0]);
    classData[department[0]]= [];
    var newDepartment = {};
    Object.entries(department[1]).map(course => {
      var newClass = {};
      newClass.code = course[1].c;
      newClass.name = course[1].n;
      newClass.num = course[1].num;
      newClass.dep = department[0];

      if (course[1].loct[0].t != null && typeof(course[1].loct[0].loc) != 'undefined'){
        newClass.location = course[1].loct[0].loc;
      } else{
        newClass.location = '';
      }

      if (course[1].ins.d != null){
        newClass.instructor = course[1].ins.d[0];
      } else {
        newClass.instructor = '';
      }

      if (course[1].loct[0].t != null && typeof(course[1].loct[0].t.day) != 'undefined'){
        newClass.day = course[1].loct[0].t.day;
      } else {
        newClass.day = [];
      }

      if (course[1].loct[0].t != null && typeof(course[1].loct[0].t.time) != 'undefined'){
        newClass.start = course[1].loct[0].t.time.start;
        newClass.end = course[1].loct[0].t.time.end;
      } else {
        newClass.start = '';
        newClass.end = '';
      }

      classData[department[0]].push(newClass);
      //console.log(newClass);

    });

    });
  console.log("completed parsedata");
  //console.log(classData);
}

//parsedata();

router.get('/', function(req, res) {
    res.send(classData);
  });

router.get('/departments', function(req,res){
  res.send(Object.keys(classData));
})

router.get('/departments/:depid', function(req,res){
  var courses;
  for (var i in classData){
    //console.log(i);
    if (i === req.params.depid.toUpperCase()){
      //console.log("found course" + i);
      courses = classData[i];
      //console.log(classData[i]);
    }
  }
  if (!courses){
    res.status(404).send("department not found");
  } else{
    res.send(courses);
  }
})

//export {items};
module.exports = router;