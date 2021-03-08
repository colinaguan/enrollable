<p>&nbsp  </p>  

# Generation

## Generation Request object

    “minUnits”: int,
    “maxUnits”: int,
    “avoidTimes”: [
        {
            "days": [string],
            "start": string (24-hour format: 00:00),
            "end": string (24-hour format: 00:00)
        }
    ],
    "classes": [
        {
            "num": int,
            "title": string,
            "dayTime": string,
            “unit”: int,
            “days”: [string],
            "start": string (24-hour format: 00:00),
            "end": string (24-hour format: 00:00),
            "priority": int,
            "sections": [
                {
                    "num": int,
                    “days”: [string],
                    "start": string (24-hour format: 00:00),
                    "end": string (24-hour format: 00:00)
                }
            ]
        }
    ]


## Routes

### enrollable/api/generate
Body: A single generate request object.  
Return: A single generate return object.


## Generation Return Object
    “successful”: boolean, true: generated schedules(followed by schedules), false: no viable  schedule(followed by conflict pairs)  

    “schedules”:  [      // array of schedules if error is false   
                                          
        “classes”: [  // array of class objects
            {
                "num": int,
                “unit”: int,
                “days”: [string],
                "start": string (24-hour format: 00:00),
                "end": string (24-hour format: 00:00),
                "priority": int,
                "sections": [
                    {
                        "num": int,
                        "days": [string],
                        "start": string (24-hour format: 00:00),
                        "end": string (24-hour format: 00:00)
                    }
                ]
            }
        ]
    ]

    OR


    “schedules”: [  // array of array of conflicted classes if error is true
        [class, class] // array of classes
    ]


## Generation Psuedocode

    // global variable storing pairs of time conflicts
    var conflictPair = [ ]

    // generate possible schedules through DFSFunction(), then filter schedules with constraints
    // return a list of schedule (list of classes) if schedules can be generated
    // return an empty list if no possible schedules can be created
    generateSchedules(object){
        possibleSchedules = getNoConflictSchedules(object.classes)
        If !possibleSchedules {
            Return {true, conflictPair}
            // [true, schedule1, schedule2]
            // [false, conflictpair1, conflictpair2]
        }
        priorityScores = [ ]
        For (schedule in possibleSchedules) {
            unitSum = 0
            // conflict : variable indicates whether class is conflict with time constraints
            Conflict = false
            For class in schedule {
                If conflictAvoidTime(object.avoidTimes, class) {
                    conflict = true;
                    break;
                }
                unitSum += class.unit
                // check possible sections 
                If class.sections {
                    For section in class.sections{
                        // remove from class.sections array if conflict with schedule
                        // or avoid time list
                        If checkTimeConflict(schedule, section) && conflictAvoidTime(object.avoidTimes, section) {
                            class.sections.remove(section)
                        }
                    }
                }
            }
            // check time restriction
            If (conflict) {
                possibleSchedules.remove(schedule)
                continue; 
            }

            // check unit restriction
            If (unitSum < object.minUnits || unitSum > object.maxUnits) {    
                possibleSchedules.remove(schedule)
                continue;
            }    

            // sum priority score for this schedule
            For class in schedule {
                score += class.priority
            }

            priorityScores.append(score)
        }

        // priority reorder based on priority score
        // the schedule with minimum score means higher priority
        // will be reordered and displayed in the front of the list
        temp = priorityScores 
        While temp != empty {
            Min = Infinity
            For score in temp {
                If score < Min 
                    Min = score
            }
            temp.remove(min)
            resultList.append(possibleSchedule[priorityScore.indexOf(min)])
        }
        Return {false, resultList}
    }

    // takes a list of classes
    // returns all possible schedules 
    getNoConflictSchedules(classesList):
        possibleSchedules = [ ] 
        // go through all courses except the last course
        For course in classesList - 1: 
            stack= new stack
            stack.push([course])
            While stack is not empty:
                schedule= stack.pop()
                    For course in successor(schedule, classesList):
                        If !checkTimeConflict(schedule, course):
                            schedule.append(course)
                            possibleSchedules.append(schedule)
                            stack.push(schedule)                    
        Return possibleSchedules

    // return courses that have larger index than current schedule’s last course
    // e.g. [1,3], [1,2,3,4]
    // return [4]
    successor(schedule, selectedList) {
        lastCourse = schedule[schedule.length-1]
        Successor = [ ]
        For (i = selectedList.indexOf(lastCourse) + 1 to selectedList.length-1):
            If i >= selectedList.length
                Return successor 
            successor.append(selectedList[i])
        Return successor
    }

    // return true if there is a conflict, and add conflicted course pairs
    // global variable storing pairs of time conflicts 
    var conflictPair = [ ]
    checkTimeConflict(schedule, newClass) {
        for class in schedule{
            classDate = class.days
            courseDate = newClass.days
            intersectDate = intersect(classDate, courseDate)
            If (len(intersectDate) ==0 )
                    continue
            // check overlap
            If (class.start<=newClass.end && class.end>=newClass.start){
                // if the conflict pair was not recorded, append to the list
                If (conflictPair.indexOf((newClass, class)) == -1) {
                    conflictPair.append((newClass, class))
                }
                Return true
            }
        }
        Return false
    }


    “avoidTimes”: [
            {
                "days": [string],
                "start": string (24-hour format: 00:00),
                "end": string (24-hour format: 00:00)
            }
        ],
    // input: class can be class or section
    // returns true if the class is conflict with time constraints
    conflictAvoidTime(avoidTimes, newClass) {
        for time in avoidTimes{
            classDates = newClass.days
            avoidTimeDates = avoidTime.days
            intersectDates = intersect(classDates, avoidTimeDates)
            If (len(intersectDates) ==0 )
                    continue
            // check overlap
            If (class.start<=avoidTimeDates.end && class.end>=avoidTimeDates.start){
                Return true
            }
        }
        Return false
    }




