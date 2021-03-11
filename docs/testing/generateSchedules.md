# Generate Schedules Page
*Author: Jinghao*

### Test Cases
- Generate test: Generate with 1 class selected with default constrain
- Generate test: Generate with 2 class selected with default constrain
- Generate test: Generate with 3+ class selected with default constrain without time conflict
- Constrain test: units constrain
- Constrain test: units constrain error
- Constrain test: time constrain error
- Constrain test: time constrain
- Constrain test: remove time constrain 
- Generate test: Generate with priority
- Generate test: Generate with selected section
- Refresh page

### Test Details

#### Test 1

Generate test: Generate with 1 class selected with default constrain

**Result:**
SUCCESS

**Description:**
As expected. No possible schedules can be generate with only 1 class.

#### Test 2

Generate test: Generate with 2 class selected with default constrain

**Result:**
SUCCESS

**Description:**
As expected. No possible schedules can be generated with minimum units of 12. 

#### Test 3

Generate test: Generate with 3+ class selected with default constrain without time conflict

**Result:**
SUCCESS

**Description:**
Schedules are successfully generated.

#### Test 4

Constrain test: units constrain

**Result:**
SUCCESS

**Description:**
Error displayed when minimum units is greater then or equal to maximum units.
Schedules are successfully generated if no error in units constrain.

#### Test 5

Constrain test: units constrain error

**Result:**
ERROR

**Description:**
After an error occured, unable to generate even the error is removed.
Set maximum units to 10 when minimum units is 12,
"generate" gets an error message,
adjust the maximum units to 15,
"generate" gets no response.
Generate button not working, unless change made in time constarin.

#### Test 6

Constrain test: time constrain error

**Result:**
ERROR

**Description:**
After an error occured, unable to generate even the error is removed.
Same as test5.
Generate button not working, unless change made in units constarin.

#### Test 7

Constrain test: time constrain

**Result:**
SUCCESS

**Description:**
Error displayed when duplicate and end time is smaller than start time.
Schedules are successfully generated with no conflict to avoid time.

#### Test 8

Constrain test: remove time constrain 

**Result:**
ERROR

**Description:**
When have multiple time constrains, remove one constrain will cause two constrain get removed. 
Unable to remove the desired time constrain. 
Only work when removing from the end of list.

#### Test 9

Generate test: Generate with priority

**Result:**
ERROR

**Description:**
Priority reordering only works among schedules with the same length.
schedules with fewer classes will always be displayed before schedules with more classes. 

#### Test 10

Generate test: Generate with selected section

**Result:**
SUCCESS

**Description:**
Schedules generated with selected section. 

#### Test 11

Refresh page

**Result:**
ERROR

**Description:**
Favor List not loaded when refreshing the page