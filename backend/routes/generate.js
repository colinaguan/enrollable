var express = require('express');
const { stack } = require('./db.js');
var router = express.Router();
var database = require('./db.js');
var classData = database.classData;

var conflictPairs = [];

router.post('/', function(req, res) {
    conflictPairs = [];
    var generateRequest = req.body;
    var generateResult = generateSchedules(generateRequest);
    res.send(generateResult);
});

function generateSchedules(requestObject) {
    result = {};
    priorityScores = [];
    possibleSchedules = getNoConflictSchedules(requestObject.classes);
    // if no possible schedules generated return the conflict pairs
    if (possibleSchedules.length === 0) {
        result.successful = false;
        result.schedules = conflictPairs;
        return result;
    }

    minUnits = requestObject.minUnits;
    maxUnits = requestObject.maxUnits;
    avoidTimes = requestObject.avoidTimes;

    // check unit constraint
    possibleSchedules = unitConstraint(possibleSchedules, minUnits, maxUnits);
    if (possibleSchedules.length === 0) {
        // console.log("no schedule satisfy unit constraints")
        result.successful = false;
        result.schedules = [];
        return result;
    }
    
    // check time constraint
    // console.log(avoidTimes)
    possibleSchedules = avoidTimesConstraint(possibleSchedules, avoidTimes);
    if (possibleSchedules.length === 0) {
        // console.log("no schedule satisfy avoid constraints")
        result.successful = false;
        result.schedules = [];
        return result;
    }
    
    // remove unfit sections
    possibleSchedules = sectionConstraint(possibleSchedules, avoidTimes);

    // priority reorder
     possibleSchedules = priorityReorder(possibleSchedules);

    result.successful = true;
    result.schedules = possibleSchedules;

    return result;
}

function getNoConflictSchedules(classesList) {
    possibleSchedules = []; 
    // go through all courses except the last course
    for (var i=0; i<classesList.length-1; i++) {
        var course = classesList[i];
        var newStack = [];
        newStack.push([course]);
        while (newStack.length) {
            schedule = newStack.pop();
            successors = successor(schedule, classesList);
            // a copy for schedule, so when add new class for successors origin one won't be affected 
            // needs to be a copy, not reference
            temp = JSON.parse(JSON.stringify(schedule));
            if(successors.length !== 0){
                for(var newClass of successors){
                    // reinitialize schedule here
                    schedule = JSON.parse(JSON.stringify(temp));
                    conflict = checkTimeConflict(schedule, newClass)
                    if (!conflict) {
                        schedule.push(newClass);
                        possibleSchedules.push(schedule);
                        newStack.push(schedule);
                    }
                    // console.log("possible schdule", possibleSchedules)
                }
            }
        }	
    }

    return possibleSchedules;
}

function unitConstraint(possibleSchedules, minUnits, maxUnits){
    for (var i=0; i<possibleSchedules.length; i++) {
        schedule = possibleSchedules[i];
        unitSum = 0;
        // conflict : variable indicates whether class is conflict with time constraints
        conflict = false;
        for (var classData of schedule) {
            unitSum += classData.unit;
        } 
        // check unit restriction
        if (unitSum < minUnits || unitSum > maxUnits) {	
            possibleSchedules.splice(i, 1);
            // consider one item has been removed
            i-=1;
            continue;
        }  
    }

    return possibleSchedules;
}

// function to check avoidTime constraint
function avoidTimesConstraint(possibleSchedules, avoidTimes){
    for (var i=0; i<possibleSchedules.length; i++) {
        schedule = possibleSchedules[i];
        for (var classData of schedule) {
            // check conflict with avoid time list
            // if conflict remove schedule from possibleSchedules
            if (conflictAvoidTime(avoidTimes, classData)) {
                possibleSchedules.splice(i, 1);
                i-=1;
                break;
            }
        } 
    }

    return possibleSchedules;
}

function sectionConstraint(possibleSchedules, avoidTimes){
    newPossibleSchedules = [];
    for (var i=0; i<possibleSchedules.length; i++) {
        schedule = possibleSchedules[i];

        for (var classData of schedule) {
            // make a copy of current class
            classCopy = JSON.parse(JSON.stringify(classData));
            if (classData.sections) {
                for (var section of classData.sections) {
                    // remove from class.sections array if conflict with schedule
                    // or avoid time list
                    if (checkTimeConflict(schedule, section) || conflictAvoidTime(avoidTimes, section)) {
                        classCopy.sections.splice(classData.sections.indexOf(section), 1);
                    }
                }
            }
            // store the new class information
            schedule[schedule.indexOf(classData)] = classCopy;
        } 
        newPossibleSchedules.push(schedule);
    }

    return newPossibleSchedules;
}

function priorityReorder(possibleSchedules) {
    priorityScores = [];
    reorderedList = [];
    // get priorityScores for each schedule
    for (var i=0; i<possibleSchedules.length; i++) {
        schedule = possibleSchedules[i];
        score = 0;
        for (var classData of schedule) {
            score += classData.priority;
        }
        priorityScores.push(score);
    }

    // priority reorder based on priority score
    // the schedule with minimum score means higher priority
    // will be reordered and displayed in the front of the list
    priorityScoresCopy = [...priorityScores];
    while (priorityScoresCopy && priorityScoresCopy.length) {
        min = Infinity;
        for (var score of priorityScoresCopy) {
            if (score < min) {
                min = score;
            }
        }
        // push the index to the new list
        reorderedList.push(possibleSchedules[priorityScoresCopy.indexOf(min)]);
        // remove the sorted index in possibleSchedules
        possibleSchedules.splice(priorityScoresCopy.indexOf(min), 1);
        // remove the sorted index in priorityScoresCopy
        priorityScoresCopy.splice(priorityScoresCopy.indexOf(min), 1);
    }

    return reorderedList
}

function successor(schedule, classesList) {
    index = schedule.length-1;
    lastCourse = schedule[index];

	successors = [];
	for (var i=classesList.indexOf(lastCourse)+1; i<classesList.length; i++) {
        if (i >= classesList.length) {
            return successors; 
        }

        successors.push(classesList[i]);
    }

	return successors;
}

function checkTimeConflict(schedule, newClass) {
    for (var i = 0; i < schedule.length; i++) {
        classData = schedule[i];
        classDate = classData.days;
        courseDate = newClass.days;
        intersectDate = intersect(classDate, courseDate);
        if (intersectDate.length !== 0) {
            // check overlap
            if (classData.start<=newClass.end && classData.end>=newClass.start){
                // if the conflict pair was not recorded, append to the list
                conflictPair = [newClass, classData];
                if (!alreadyInArray(conflictPair)) {
                    conflictPairs.push(conflictPair);
                }

                return true;
            }
        }
    }

    return false;
}

function alreadyInArray(conflictPair) {
    // check if conflict pair already in conflictPairs
    for (var pair of conflictPairs) {
        if (conflictPair === pair) {
            return true;
        }
    }
    return false;
}

function conflictAvoidTime(avoidTimes, newClass) {
    classDates = newClass.days;
    for (var avoidTime of avoidTimes) {
        avoidTimeDates = avoidTime.days;
        intersectDates = intersect(avoidTimeDates, classDates);
        if (intersectDates.length === 0) {
            continue;
        }
        // check overlap
        if (avoidTime.start<=newClass.end && avoidTime.end>=newClass.start){
            return true;
        }
    }

    return false;
}

function intersect(arrA, arrB) {
    let intersection = arrA.filter(x => arrB.includes(x));
    
    return intersection
}

module.exports = router;