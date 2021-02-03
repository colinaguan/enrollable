var express = require('express');
var router = express.Router();
var database = require('./db.js');
var classData = database.classData;

router.get('/', function(req, res) {
    var courses = [];
    for (var i in classData){
        for (var j in classData[i]){
            courses.push(classData[i][j]);
        }
    }
    res.send(courses);
});

router.get('/term', function(req,res) {
    res.send(2210);
})

router.get('/ge', function(req,res) {
    res.send(['CC', 'ER', 'IM', 'MF', 'SI', 'SR', 'TA', 'PE-E', 
                'PE-H', 'PE-T', 'PR-E', 'PR-C', 'PR-S', 'C1', 'C2']);
})

router.get('/ge=:geid', function(req,res) {
    var getCourses = [];
    for (var i in classData){
        for (var j in classData[i]){
            for (k in classData[i][j].ge){
                if (classData[i][j].ge[k] == req.params.geid.toUpperCase()){
                    getCourses.push(classData[i][j]);
                }
            }
        }
    }
    if (getCourses.length == 0){
        res.status(404).send("No courses found");
    } else {
        res.send(getCourses);
    }
})

router.get('/type', function(req,res) {
    res.send(['lecture', 'laboratory', 'seminar', 'studio', 'field studies']);
})

router.get('/type=:typeid', function(req,res) {
    var getCourses = [];
    for (var i in classData){
        for (var j in classData[i]){
            if (classData[i][j].type == req.params.typeid.toUpperCase()){
                getCourses.push(classData[i][j]);
                break;
            }
            
        }
    }
    if (getCourses.length == 0){
        res.status(404).send("No courses found");
    } else {
        res.send(getCourses);
    }
})

router.get('/type=:typeid/ge=:geid', function(req,res) {
    var getCourses = [];
    for (var i in classData){
        for (var j in classData[i]){
            if (classData[i][j].type == req.params.typeid.toUpperCase()){
                for (var k in classData[i][j].ge){
                    if (classData[i][j].ge[k] == req.params.geid.toUpperCase()){
                        getCourses.push(classData[i][j]);
                        break;
                    }
                }
            }
            
        }
    }
    if (getCourses.length == 0){
        res.status(404).send("No courses found");
    } else {
        res.send(getCourses);
    }
})

router.get('/course=:courseId', function(req,res) {
    var course;
    for (var i in classData){
        for (var j in classData[i]){
            if(classData[i][j].num == req.params.courseId){
                course = classData[i][j];
            }
        }
    }
    if (!course){
        res.status(404).send("Course not found");
    } else {
        res.send(course);
    }
});


module.exports = router;