# Enrollable API Documentation
<p>&nbsp</p>

# Database

## Database Class Object

    code = 101,
    name =  ‘Introduction to Psychology’,
    num = 44321,
    dep = ‘PSY’,
    location = ‘Coastbio 115’,
    instructor = ‘Sinervo,B.R.’,
    day = [‘Monday’, ‘Wednesday’, ‘Friday’],
    start = ‘12:15’,
    end = ‘1:45’,
    ge = [‘CC’, ‘PR-C’],
    requirements = “PSYC 1 or PSYC 20; and AM 3 or AM 6”,
    description = “An introduction to elementary statistical principles and techniques...”,
    type = ‘LECTURE’
    credits = 5,
    sections = [
        {
        secName = “01A”,
        num = 43326,
        instructor = “staff”
        start = ‘13:30’
        end = ‘14:30’
        day = [‘Monday’]
        location = “Remote Instruction”
        },
    ]

##   Routes
Port: 3001
### enrollable/api/course
Parameters: None  
Return: Array of every Database Class Object

### enrollable/api/course?type=:typeId(&ge=:geId)(&dep=:depId)(&course=:courseId)
Paremeters: 
* (optionsal) typeId is a string representing a class type
* (optional) geId is a string representing a GE code
* (optional) depId is a string representing a department id    
* (optional) courseId is a string representing a course id  

Return: An array of Database Class Objects thats type matches a provided typeId, thats ge matches any provided geId, thats department matches any provided depId, and thats course matches any provided courseId
Return Errors: 404 if no course is found

### enrollable/api/course/course=:id
Parameters: Single course id  
Return: A single Database Class Object whose 'num' attribute matches the course id parameter  
Return Errors: 404 if no course is found

### enrollable/api/course/term
Parameters: None  
Return: Integer of the current term number

### enrollable/api/course/ge
Paremeters: None  
Return: A list of each General Education requirement and its associated GE code

### enrollable/api/course/type
Parameters: None  
Return: A list of strings representing each class type (ex. Laboratory, Lecture).

### enrollable/api/department
Parameters: None
Return: A list of string representing each department name and its associated department id

### enrollable/api/department/details
???

### enrollable/api/department?type=:typeId(&ge=:geId)(&dep=:depId)
Paremeters: 
* (optionsal) typeId is a string representing a class type
* (optional) geId is a string representing a GE code
* (optional) depId is a string representing a department id    

Return: An array of Database Class Objects thats type matches a provided typeId, thats ge matches any provided geId, and thats department matches any provided depId
   