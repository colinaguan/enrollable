var express = require('express');
var router = express.Router();
var fetch = require('node-fetch');
var json = require('json');

var classData = [];
var items = {};

const getData=()=>{
    fetch('https://andromeda.miragespace.net/slugsurvival/data/fetch/terms/2210')
    .then(res => res.json()) 
    .then(json => {
        items = json;
        console.log(items);
        //return json;
      });
}

getData();

router.get('/', function(req, res) {
    //res.send("Test\n");
    var departmentList = [];
    Object.entries(items).map(item =>
        departmentList.push(item[0]));
    res.send(departmentList);
  });

//export {items};
module.exports = router;