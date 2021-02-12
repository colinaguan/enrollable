var express = require('express');
var router = express.Router();
var fetch = require('node-fetch');
var json = require('json');

var classData = {};
var items = {};
var items2 = {};
var rmpMap = {};

const getData=()=>{
    console.log("get data start");
    console.time('parse');
    fetch('https://andromeda.miragespace.net/slugsurvival/data/fetch/terms/2210')
    .then(res => res.json()) 
    .then(json => {
        items = json;
        //get second json file from slug survival
        getData2();
      });
}

const getData2=()=>{
  fetch('https://andromeda.miragespace.net/slugsurvival/data/fetch/courses/2210')
  .then(res => res.json())
  .then(json => {
    items2 = json;
    getRmpMap();
    console.log('get data completed');
    //after all data has been received
    //parse data into our new javascript object
    //parsedata();
  });
}

//Get mapping of prof FirstnameLastname to rate my proffessor id
const getRmpMap=()=>{
  fetch('https://andromeda.miragespace.net/slugsurvival/data/fetch/rmp.json')
  .then(res => res.json())
  .then(json => {
    rmpMap = json;
    //console.timeEnd('parse');
    parsedata();
    //console.log(rmpMap);  
  });
}

/*
  //Old attempt at getting rate my professor data for each class
  //Because fetch is slow this will take a huge amount of time
  //Because fetch is also asychnronous there are additional problems with using it 1,300 times
  //in the middle of parsing a bunch of data
const getRmpInfo=(id)=>{
  fetch('https://andromeda.miragespace.net/slugsurvival/data/fetch/rmp/scores/' + id)
  .then(res => res.json())
  .then(json => {
    json = {};
    //console.log(json);
    return json;
  });
}
*/

const getRmpInfo2 = async (rmpId) => {
  //var temp = {};
  const ret = await fetch('https://andromeda.miragespace.net/slugsurvival/data/fetch/rmp/scores/' + rmpId);
  const json = await ret.json();
  console.log(json);
}

//get first json file from slugsurvival
getData();

function parsedata() {
  var test = true;
  console.log("Started parse data");
  //for each department create a new empty object
  Object.entries(items).map(department => {
    classData[department[0]]= [];
    var newDepartment = {};
    //for each class in a department create a new empty class object
    //then fill that object with information from the 2 json files
    //that were retrieved from slug survival
    Object.entries(department[1]).map(course => {
      var newClass = {};
      newClass.code = course[1].c;
      newClass.clasSection = course[1].s;
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

      if (course[1].ins.f != null && course[1].ins.l != null){
        var temp = course[1].ins.f + course[1].ins.l;
        for (var fl in rmpMap){
          if (fl === temp){
            newClass.instructorId = rmpMap[fl];
            //console.log(getRmpInfo(newClass.instructorId));
            break;
          }
        }
      } else {
        newClass.instructorId = '';
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

      //var printone = true;
      for (var i in items2){
        if (i == newClass.num){
          newClass.ge = items2[i].ge;
          newClass.description = items2[i].desc;
          newClass.requirements = items2[i].re;
          newClass.type = items2[i].ty;
          newClass.credits = parseInt(items2[i].cr);
          newClass.sections = [];

          for (var j in items2[i].sec){
            var newSection = {};
            newSection.secName = items2[i].sec[j].sec;
            newSection.num = items2[i].sec[j].num;
            newSection.instructor = items2[i].sec[j].ins;
            
            if (items2[i].sec[j].loct[0].t != null && 
                typeof(items2[i].sec[j].loct[0].t.time) != 'undefined'){
                  newSection.start = items2[i].sec[j].loct[0].t.time.start;
                  newSection.end = items2[i].sec[j].loct[0].t.time.end;
            } else {
              newSection.start = '';
              newSection.end = '';
            }

            if (items2[i].sec[j].loct[0].t != null && 
                typeof(items2[i].sec[j].loct[0].t.day) != 'undefined') {
                  newSection.day = items2[i].sec[j].loct[0].t.day;
            } else {
              newSection.day = [];
            }
            
            if (items2[i].sec[j].loct[0].t != null && 
                typeof(items2[i].sec[j].loct[0].loc) != 'undefined'){
                  newSection.location = items2[i].sec[j].loct[0].loc;
            } else {
              newSection.location = '';
            }
             
            newClass.sections.push(newSection);

          }
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