var express = require('express');
const { stack } = require('./db.js');
var router = express.Router();
var database = require('./db.js');
var classData = database.classData;

var conflictPairs = [];

router.post('/', function(req, res) {
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
    if (!possibleSchedules) {
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
        var newStack = [];
        newStack.push([course]);
        while (!newStack.length) {
            schedule = newStack.pop();
            for (newClass in successor(schedule, classesList)) {
                if (!checkTimeConflict(schedule, newClass)) {
                    schedule.append(newClass);
                    possibleSchedules.append(schedule);
                    newStack.push(schedule);
                }
            }
        }	
    }

    return possibleSchedules;
}

function successor(schedule, classesList) {
	lastCourse = schedule[schedule.length-1];
	successors = [];
	for (var i=selectedList.indexOf(lastCourse)+1; i<classesList.length; i++) {
		if (i >= selectedList.length) {
            return successors; 
        }
        successors.append(classesList[i]);
    }
	return successors;

}

function checkTimeConflict(schedule, newClass) {
    for (classData in schedule) {
        classDate = classData.days;
        courseDate = newClass.days;
        intersectDate = intersect(classDate, courseDate);
        if (len(intersectDate) === 0) {
            continue;
        }
        // check overlap
        if (classData.start<=newClass.end && classData.end>=newClass.start){
            // if the conflict pair was not recorded, append to the list
            if (conflictPair.indexOf((newClass, classData)) === -1) {
                conflictPair.append((newClass, classData));
            }

            return true;
        }
    }

   return false;
}

function conflictAvoidTime(avoidTime, newClass) {
    for (time in avoidTimes) {
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

module.exports = router;
