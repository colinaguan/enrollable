# Saved Schedules Page
*Author: Dina*

## Test Cases
- test 1: save a schedule(select a section if there are sections
- test 2: modify schedule title, description on schedule modal
- test 3: delete a schedule
- test 4: save multiple schedules from one generation
- test 5: save schedules with section options
- test 6: save schedules with section options all left empty
- test 7: generate Modal test(section)
- test 8: generate Modal test(modify title & description)

## Test Details

### test 1 (save a schedule)
on Generate Schedule page:
- select multiple classes
- click "generate"
- go to one Schedule card, click "Save Schedule", set title "test1", description "test1des"
-ngo to saved schedule page

**Result:**
SUCCESS

**Description:**
Schedule was saved successfully on the saved schedule page, with the user-entered title and description

### test 2 (modify schedule title, description on schedule modal)
on Save Schedule page
- click on "Edit Schedule" on one of the schedule cards, modify title, description
- click "save" button
- click "Edit Schedule" again

**Result:**
SUCCESS

**Description:**
new title and description are updated on the schedule card, and schedule Modal

### test 3 (delete a schedule)
on Save Schedule page
click "Edit Schedule", click "Delete" button

**Result:**
ERROR

**Description:**
although Modal is closed, deleted schedule is still on the page
need to go to another page and come back to see update(deleted schedule disappear from the list)

### test 4 (save multiple schedules from one generation)

on Generate Schedule page:
- select classes, click "generate"
- among the generated schedules, click "Save" to save multiple of them
- go to saved schedule page

**Result:**
SUCCESS

**Description:**
the saved schedules are displayed on saved schedule page

### test 5 (save schedules with section options)

on Generate Schedule page:
- select classes(with multiple sections), click generate.
- save one of the generated schedule: click "Save schedule"
- select one section for classes that has sections and click "Save"
- go to saved schedule page

**Result:**
SUCCESS

**Description:**
classes and corresponding sections are saved correctly

### test 6 (save schedules with section options all left empty)

on Generate Schedule page:
- select classes(with multiple sections), click generate.
- save one of the generated schedule: click "Save schedule"
- leave all sections empty click "Save"
- go to saved schedule page

**Result:**
ERROR

**Description:**
classes are saved correctly, but all listed sections are saved(should not save any)

### test 7 (generate Modal test)

on Generate Schedule page:
- select classes(with multiple sections), click generate.
- click "Save schedule"
- for class with sections, select a section and click "Cancel",
- click Edit schedule(the same schedule) again, leave all sections options empty
- click "Save"
- go to saved schedule page

**Result:**
ERROR

**Description:**
classes are saved, the section was once selected but not selecting when returned and saved schedule was also saved(should not save sections)

### test 8 (generate Modal test2)
on Generate Schedule page:
- select classes, click "generate"
- click "Save schedule"
- modify title and description
- click "Cancel"
- on the same schedule card, click "Save schedule" again

**Result:**
ERROR

**Description:**
 modified title and description was saved on the Modal, same happen when click "Save" other than "Cancel"
