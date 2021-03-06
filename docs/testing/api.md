# API
*Author: Brenden*

## Test Cases
- route: /api/course
- route: /api/course/term
- route: api/course/ge
- route: api/course/type
- route: api/course?type=___
- route: course?ge=___
- route: course?dep=___
- route: course?course=___
- rotue: department
- route: department/details
- route: department?type=lecture
- route: department?ge=PR-C
- route: department?dep=THEA
- route: department?type=studio&ge=pr-c&dep=thea

## Test Details

### route: /api/course

This test was run by using a browser to call enrollable.herokuapp.com/api/course then picking 3 courses from the results psudorandomly and looking those courses up at pisa.ucsc.edu/class_search to make sure they both exist and store information correctly. 

**Result:**
SUCCESS

**Description:**
Returned 304 status code and a list of database course objects as described in the api documentation, courses by the number 62431, 62539, and 62377 were tested against the exisiting pisa school database.

### route: api/course/term

This test was run by using a browser to call enrollable.herokuapp.com/api/course/term.

**Result:**
SUCCESS

**Description**
Returned a 200 status code with data "{"code":"2212","term":"2021 Spring Quarter"} which is exactly what it was supposed to return.

### route: api/course/ge
This test was run by using a browser to call enrollable.herokuapp.com/api/course/ge.

**Result:**
SUCCESS

**Description**
Returned a 200 status code with a json object that had a key for every General Education shorthand (CC, PR-C, etc.) and each value corresponding to the long form General Education requirement (Cross-Cultural Analysis, Creative Process, etc.).

### route: api/course/type
This test was run by using a browser to call enrollable.herokuapp.com/api/course/type.

**Result**
SUCCESS

**Description**
Returned a 304 status code with an array of class types ["lecture", "laboratory", "seminar", "studio", "field studies"] as expected.

### route: api/course?type=___
This test was run by using a browser to make several calls to the route including enrollable.herokuapp.com/api/course?type=laboratory .../course?type=LABORATORY .../course?type=lecture .../course?type=Lecture .../course?type=seminar .../course?type=SEMINAR .../course?type=studio .../course?type=stuDIO .../course?type=field seminar .../course?type=math

**Result**
SUCCESS

**Description** 
Each route call besides .../course?type=math returned a 304 status code and a list of database class objects, from which 3 classes were picked randomly and tested against the pisa school database. The ../course?type=math call failed as expected with a 404 error and text "No course found" because "math" is not a valid course type.

### route: api/course?ge=___ 
This test was run by using a browser to make a call to the route enrollable.herokuapp.com/api/course?ge=CC

**Result**
SUCCESS

**Description** 
Returned status code 200 with an array of database course objects of which I randomly picked 3 (course ids 62713, 64201, 63303) and checked the pisa database to make sure they correctly fulfilled ge requirement CC and had all the correct information.
 
### route: api/course?dep=___ 
This test was run by using a browser tom ake a call to the route enrollable.herokuapp.com/api/course?dep=art.

**Result**
FAILURE

**Description**
Returns status code 200 and an array of database course objects. The problem is it returns every database course object with no apparent filtering for department.


### route: api/course?course=___ 
This test was run by using a browser to make 3 calls to the route enrollable.herokuapp.com/api/course?course=___ with parameters 62587, 64178, 62541.

**Result**
SUCCESS

**Description**
Each call returns status code 304 and a single database class object. In each case the values of the returned object were compared to the pisa course database to make sure the correct class was returned and that it contained all the correct information.

### route: api/department
This test was run by using a browser to make a call to the route enrollable.herokuapp.com/api/department.

**Result**
SUCCESS

**Description**
Returned status code 200 with a list of strings, each string being a shortened department name (ex "ART", "BME", "CSE", etc.). The list was checked against each of the departments in the pisa database.

### route: api/department/details
This test was run using a browser to make a call to the route enrollable.herokuapp.com/api/department/details.

**Result**
SUCCESS

**Description**
Returned status code 200 with a json object where each key is a shortened deparment name ("ART", "BME", "CSE") and each value is the long form department name ("Art", "Biomolecular Engineering", "Computer Science and Engineering").

### route: api/department?type=___
This test was run by using Postman to make a call to route enrollable.herokuapp.com/api/department?type=lecture

**Result**
SUCCESS

**Description**
Returned status code 304 and an array of database class objects from which 3 classes were picked from random (62581, 62618, 62575) and compared to the pisa database to make sure they actually were of the correct type and contained all the correct information.

### route: api/department?ge=___
This test was run by using Postman to make a call to route enrollable.herokuapp.com/api/department?ge=PR-C.

**Result**
SUCCESS

**Descirption**
Returned status code 200 and an array of databse class objects from which 3 classes were picked from random (63854, 62692, 63317) and compared to the pisa database to make sure they actually fullfilled the PR-C ge requirement and contained all the correct information for those classes.

### route: api/department?dep=____
This test was run by using Postman to make a call to route enrollable.herokuapp.com/api/department?dep=thea

**Result**
SUCCESS

**Description**
Returned status code 200 and an array of database class objects from which 3 classes were picked from random (63328, 63307, 63796) and compared to the pisa database to make sure they acutally were from the Theatre department and contained all the correct information for those classes.


### route: api/department?(type=___)&(ge=___)&(dep=___)
This test was run by using Postman to make a GET call to route enrollable.herokuapp.com/api/department?type=studio&ge=pr-c&dep=thea to ensure it returned the correct class of class id 63306 which I found by searching the pisa database to find a class which fulfills a ge.

**Result**
SUCCESS

**Description**
Returned status code 200 and a sigle database class object which I compared to the class of id 63306 on the pisa database to make sure it contained all the correct information.

### route: api/generate
This test was run by using Postman to make a POST request to route enrollable.herokuapp.com/api/generate. The body of the request was a Generation Request Object as detailed in the generate api documentation. The full request body is

    {"minUnits":12,
    "maxUnits":19,
    "avoidTimes":[],
    "classes":[
        {"num":44438,
        "title":"CSE 3",
        "unit":5,
        "days":["Tuesday","Thursday"],
        "start":"11:40",
        "end":"13:15",
        "dayTime":"TuTh 11:40AM - 1:15PM",
        "priority":2,
        "sections":[]
        },
        {"num":43530,
        "title":"CSE 12",
        "unit":5,
        "days":["Tuesday","Thursday"],
        "start":"09:50",
        "end":"11:25",
        "dayTime":"TuTh 9:50AM - 11:25AM",
        "priority":1,
        "sections":[]
        },
        {"num":43521,
        "title":"HIS 2A",
        "unit":5,
        "days":["Monday","Wednesday","Friday"],
        "start":"10:40",
        "end":"11:45",
        "dayTime":"MWF 10:40AM - 11:45AM",
        "priority":1,
        "sections":[]
        },
        {"num":42949,
        "title":"HIS 141A",
        "unit":5,
        "days":["Tuesday","Thursday"],
        "start":"13:30",
        "end":"15:05",
        "dayTime":"TuTh 1:30PM - 3:05PM",
        "priority":1,
        "sections":[]
        }]
    }

**Result**
Failure

**Description**
The call returned a single generation return object as detailed in the generation api documentation. This object had the excepted output with successful value set to 'true' and the schedules value set to an array of all possible schedule combinations based on the generation request object.  
All of this was working appropriately.
However I also attempted variations of the generate request object to see what was returned. When the min units was higher than the max units it returned 'successful': false and no schedules. When the max units was below the required limit it also returned false with no schedules. 
When I sent a request object with incorrectly formatted avoidtimes, I received a 500 error as expected.  
When i sent a request object with a string of "test" as the max units rather than an int the api incorrectly returned a successful generate request object.
When other variables of the request object (unit, num, title, days, start, end, dayTime, priority) were sent with invalid values the api continued to return successful responses instead of errors. While the frontend does a good job of ensuring only valid generation request objects are sent, the api not properly catching errors does violate the contract between front and backend and could result in difficulty when debugging the frontend in the future.

