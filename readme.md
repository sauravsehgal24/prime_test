# Prime Test
A Full-Stack Web App to calculate median of prime numbers between the given range. View live app here: https://medianprimeherokuapp.com/ 

## Tech Stack
ReactJS, NodeJS

## Developer configuration

### *prerequisites*
- Node
- npm

### How to set up the project to run on local machine?

### Front-End
1. Clone the project from master to your file system
2. Your root folder should be ***/prime_test***
3. Navigate to ***/prime_test/client***
4. Run ```npm install``` in the terminal or cmd to install all the React dependencies
5. Run ```npm run test``` in the terminal or cmd to test the UI rendering
6. Run ```npm start``` in the terminal or cmd to start client UI 
7. Open browser and navigate to ```http://localhost:3000``` to see if it is running

### Back-End
1. Navigate to ***/prime_test/server***
2. Run ```npm install``` in the terminal or cmd to install all the Node dependencies
3. Run ```npm i nodemon --save``` in the terminal or cmd (sometimes it gives error -> nodemon not found)
4. Run ```npm test``` in the terminal or cmd to test the Server
5. Run ```node server.js``` in the terminal or cmd to start server on ```http://localhost:3000```

### (Easy way) Running the project

#### Running Development version with hot-reloading
1. Navigate to ***/prime_test/server***
2. Run ```npm run dev``` in the terminal or cmd 
3. Open browser and navigate to ```http://localhost:3000``` and explore
4. Note that client is running on ```http://localhost:3000``` and server is running on ```http://localhost:3001```

#### Running Production version 
1. Navigate to ***/prime_test/server***
2. Run ```npm run prod``` in the terminal or cmd 
3. Open browser and navigate to ```http://localhost:3001``` and explore
4. Note that client being served as static content from server and server is running on ```http://localhost:3001```











