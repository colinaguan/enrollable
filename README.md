## How To Run Website (Build)

In the frontend directory, run

### npm install

and then

### npm run build

Then go back to the parent directory, and run

### npm start

## How To Run Website (Dev)

For Linux/Mac users, in package.json, change the start script to

### cd backend && PORT=3001 node ./bin/www

(when work is finished, please change it back to)

### cd backend && node ./bin/www

and then go to the frontend directory and run

### npm install && npm start

This will run the frontend on localhost:3000, and the backend on localhost:3001