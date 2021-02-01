var express = require('express');
var router = express.Router();
var fetch = require('node-fetch');
var json = require('json');

var classData = {};
var items = {};
var items2 = {};

const getData=()=>{
    console.log("get data start");
    console.time('parse');
    fetch('https://andromeda.miragespace.net/slugsurvival/data/fetch/terms/2210')
    .then(res => res.json()) 
    .then(json => {
        items = json;
        getData2();
      });
}

const getData2=()=>{
  fetch('https://andromeda.miragespace.net/slugsurvival/data/fetch/courses/2210')
  .then(res => res.json())
  .then(json => {
    items2 = json;
    console.log('get data completed');
    parsedata();
  })
}

getData();

function parsedata() {
  console.log("Started parse data");
  Object.entries(items).map(department => {
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

      for (var i in items2){
        if (i == newClass.num){
          newClass.ge = items2[i].ge;
          newClass.type = items2[i].ty;
          if (newClass.type){
            newClass.type = newClass.type.toUpperCase();
          }
          break;
        }
      }

      classData[department[0]].push(newClass);
    });

    });
  console.log("completed parsedata");
  console.timeEnd('parse');
}

router.get('/', function(req, res) {
    res.send(classData);
  });

module.exports = router;
module.exports.classData = classData;