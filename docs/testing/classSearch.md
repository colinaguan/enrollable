# Class Search Page
*Author: Yichen*

### Test Cases
- brief description of test
- test 2

### Test Details

#### brief description of test

Department	GE	Class Type	Favorites	test time	work/not	problem
any				                          10	        work	
	        any			                  15	        work	        no C1/C2/CD
		            any		                  6	        work	
any	        any			                  20	        work	
	        any	    any		                  20	        work	
any		            any		                  20	        work	
any	        any	    any		                  20	        work	
any			                  any	          10	        work	
	        any		          any	          15	        work	
		            any	          any	          6	        work	
any	        any		          any	          5	        work	
	        any	    any	          any	          5	        work	
any		            any	          any	          5	        work	
any	        any	    any	          any	          5	        work	
any	        any	    any	          any	          5 	        work	



**Result:**
SUCCESS

**Description:**
all out put correct
one small error:no CD in ge
#### test 2

set more than 40 favorites classes to favorite class, and check favorite lists

**Result:**
SUCCESS

**Description:**
favorite lists correct

#### test 3
set favorite class and change accont, to check the favorite list save to accont successfully.

**Result:**
Fail

**Description:**
the data is still old one after switch the account. Looks like not clean the Cookie or not read the data form data base when switch the account
