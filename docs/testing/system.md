# System
*Author: Colina*

## Test Cases
- switching routes through browser
- refreshing a page
- API unsuccessful

## Test Details

### switching routes through browser

typed in all possible frontend routes in browser:
- /
- /search
- /generate
- /saved

**Result:**
ERROR (in all pages except the root)

**Description:**
"Not Found" is shown; this is probably because Express cannot find any of the frontend routes when the client requests it. We would need to figure out a way to better integrate our frontend build and backend in order for this error to go away.

### refreshing a page

Refreshing the page on the following routes:
- /
- /search
- /generate
- /saved

**Result:**
ERROR (in all pages except the root)

**Description:**
"Not Found" is shown; this is probably because Express cannot find any of the frontend routes when the client requests it. We would need to figure out a way to better integrate our frontend build and backend in order for this error to go away.

### API unsuccessful

when the API does not get its information fast enough

**Result:**
ERROR

**Description:**
There is no backup or placeholder for API data when the API is down.
