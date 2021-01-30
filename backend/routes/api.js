var express = require('express');
var router = express.Router();
//import {classData} from './db.js'

const courses = [
    {id: 1, name: 'cse101'},
    {id: 2, name: 'cse102'},
    {id: 3, name: 'cse103'}
];

const subjects = ['cse', 'am', 'phys', 'bio', 'eng'];
const courseDatabase = {};
for (i = 0; i < 5; i++){
    courseDatabase[subjects[i]] = {};
    for (j = 0; j < 5; j++){
        courseDatabase[subjects[i]].j = 5;
    }
}

/* GET api page. */
router.get('/', function(req, res) {
  //res.send('hello world');
  res.send(courseDatabase);
});

router.get('/:subject', function(req, res) {
    const course = courses.find(c => c.id === parseInt(req.params.subject));
    if (!course) res.status(404).send('no courses in that subject');
    res.send(course);
});

module.exports = router;
