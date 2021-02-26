var express = require('express');
const { stack } = require('./db.js');
var router = express.Router();
var database = require('./db.js');
var classData = database.classData;

var conflictPairs = [];

router.post('/', function(req, res) {
    conflictPairs = [];
    var generateRequest = req.body;
    //console.log(generateRequest);
    var generateResult = generateSchedules(generateRequest);
    console.log(generateResult);
    res.send(generateResult);
});

function generateSchedules(requestObject) {
    result = {};
    priorityScores = [];
    console.log(requestObject.classes);
    possibleSchedules = getNoConflictSchedules(requestObject.classes);
    if (possibleSchedules.length === 0) {
        console.log("conflictPairs",conflictPairs)
        result.successful = false;
        result.schedules = conflictPairs;
        return result;
    }
    
    // // TODO: after generate all schedules without conflict
    // for (var schedule in possibleSchedules) {
    //     unitSum = 0;
    //     // conflict : variable indicates whether class is conflict with time constraints
    //     conflict = false;
    //     for (var classData in schedule) {
    //         if (conflictAvoidTime(requestObject.avoidTimes, classData)) {
    //             conflict = true;
    //             break;
    //         }
    //         unitSum += classData.unit;
    //         // check possible sections 
    //         if (classData.sections) {
    //             for (var section in classData.sections) {
    //                 // remove from class.sections array if conflict with schedule
    //                 // or avoid time list
    //                 if (checkTimeConflict(schedule, section) && conflictAvoidTime(requestObject.avoidTimes, section)) {
    //                     classData.sections.remove(section);
    //                 }
    //             }
    //         }
    //     }   
    //     // check time restriction
    //     if (conflict) {
    //         possibleSchedules.remove(schedule);
    //         continue; 
    //     }	
    //     // check unit restriction
    //     if (unitSum < requestObject.minUnits || unitSum > requestObject.maxUnits) {	
    //         possibleSchedules.remove(schedule);
    //         continue;
    //     }	
    //     // sum priority score for this schedule
    //     for (var classData in schedule) {
    //         score += classData.priority;
    //     }
    //     priorityScores.append(score);
    // }
    // // priority reorder based on priority score
    // // the schedule with minimum score means higher priority
    // // will be reordered and displayed in the front of the list
    // priorityScoresCopy = priorityScores;
    // while (!priorityScoresCopy.isEmpty()) {
    //     min = Infinity;
    //     for (var score in priorityScoresCopy) {
    //         if (score < min) {
    //             min = score;
    //         }
    //     }
    //     priorityScoresCopy.remove(min);
    //     resultList.append(possibleSchedule[priorityScore.indexOf(min)]);
    // }

    result.successful = true;
    // for testing getNoConflictSchedules function
    result.schedules = possibleSchedules;
    // for testing other filters
    //result.schedules = resultList;

    return result;
}

function getNoConflictSchedules(classesList) {
    possibleSchedules = []; 
    // go through all courses except the last course
    for (var i=0; i<classesList.length-1; i++) {
        var course = classesList[i];
        console.log("course root: ", course);
        var newStack = [];
        newStack.push([course]);// newStack.push([course]);
        console.log("stack: ", newStack);
        while (newStack.length) { //
            console.log("enter");
            schedule = newStack.pop();
            console.log("pop: ", schedule);
            successors = successor(schedule, classesList)
            if(successors.length !== 0){
                successors.forEach(newClass=>{
                    console.log("newClass: ", newClass);
                    conflict = checkTimeConflict(schedule, newClass)
                    console.log("conflict", conflict)
                    if (!conflict) {
                        console.log("no conflict pass")
                        schedule.push(newClass);
                        console.log("schedule: ", schedule);
                        possibleSchedules.push(schedule);
                        newStack.push(schedule);
                    }
                    console.log("possible schdule", possibleSchedules)
                })
            }
        }	
    }

    return possibleSchedules;
}

function successor(schedule, classesList) {
    // note: can't use type of(), because it will return "object" for array of objects 
    // if(!Array.isArray(schedule)) {// if(typeof(schedule) === 'object') { //case when schdule is a single course
    //     console.log("not array")
    //     index = 0
    //     lastCourse = schedule
    // }else{
    //     console.log("is array")
    //     index = schedule.length-1
    //     lastCourse = schedule[index];
    // }
    index = schedule.length-1;
    lastCourse = schedule[index];

    console.log("last course: ", lastCourse);
	successors = [];
	for (var i=classesList.indexOf(lastCourse)+1; i<classesList.length; i++) {
        if (i >= classesList.length) {
            return successors; 
        }

        successors.push(classesList[i]);
    }
    console.log("successors");
    console.log(successors);
	return successors;

}

function checkTimeConflict(schedule, newClass) {
    for (var i = 0; i < schedule.length; i++) {
        classData = schedule[i];
        classDate = classData.days;
        courseDate = newClass.days;
        intersectDate = intersect(classDate, courseDate);
        console.log("intersect", intersectDate);
        if (intersectDate.length !== 0) {
             // check overlap
            console.log("classData.start", classData.start)
            console.log("newClass.end", newClass.end)
            console.log("-")
            console.log("classData.end", classData.end)
            console.log("newClass.start", newClass.start)
            console.log("classData.start<=newClass.end",classData.start<=newClass.end)
            console.log("classData.end>=newClass.start", classData.end>=newClass.start)
            if (classData.start<=newClass.end && classData.end>=newClass.start){
                console.log("detected conflcit")
                // if the conflict pair was not recorded, append to the list
                conflictPair = [newClass, classData];
                if (conflictPairs.indexOf([newClass, classData]) === -1) {
                    conflictPairs.push(conflictPair);
                }

                return true;
            }
        }
    }
    return false;
}

function conflictAvoidTime(avoidTimes, newClass) {
    for (var avoidTime of avoidTimes) {
        classDates = newClass.days;
        avoidTimeDates = avoidTime.days;
        intersectDates = intersect(classDates, avoidTimeDates);
        if (len(intersectDates) === 0) {
            continue;
        }
        // check overlap

        if (avoidTimeDates.start<=newClass.end && avoidTimeDates.end>=newClass.start){
            return true;
        }
    }

    return false;
}

function intersect(arrA, arrB) {
    console.log("arrA", arrA)
    console.log("arrB", arrB)
    let intersection = arrA.filter(x => arrB.includes(x));
    return intersection
}

module.exports = router;
