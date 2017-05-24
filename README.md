# jwt-authentication
JWT Authentication with NodeJS

This is a siple example which explains how to use the JWT, the example was  built  following the tutorial in:
https://jwt.io/introduction/

#START UP
- Open a command line inside the project folder
- RUN "npm install"
- RUN "node server" 

#TEST
- Download Postman which helps to make http request (this optional since you can use any other tool or  use your own client to make request)
- in Postman:
  - URL: http://localhost:3000/api/prods
   - Method: GET
- you should get an error since any login was not  done yet
- in Postamn:
  - URL: http://localhost:3000/login
  - Method: POST
  - x-wwww-form-urlencoded: create 2 keys for your body (userName: test,  passWord: test-pwd or userName: admin, passWord: admin-pwd)
- you should get the response 
  {
    "message": "test is now logged in.",
    "userType": "Normal",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6InRlc3QiLCJpYXQiOjE0OTU2MzgxNDh9.jul0qpw2PIHEkK6VPLQeCcmHW-wEQ9ak9NEZixTDUlM"
  }
  the attrite "token" is what you need to use to make your next request
 - in Postman:
    - URL: http://localhost:3000/api/prods
    - Method: GET
    - Headers: create a key "Authorization" with "value" Bearer {{token atribute previosly retrieved from our login}}
      ex:
      Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6ImFkbWluIiwiaWF0IjoxNDk1NjM2NDUxfQ.CrnjTx_v2wFKd0dyQ2xi3Iin2RQ63nJczDdCcjGTr1w 
  - you should get the response
    [
    {
      "title": "prod-1",
      "desc": "prod-desc-1",
      "available": false
    },
    {
      "title": "prod-1",
      "desc": "prod-desc-2",
      "available": true
    }
  ]
    
#DESCRIPTION   
#DEPENDENCY LIBRARY
#BASIC LIBRARIES
  const express = require('express');
  const app = express();
  
#JWT LIBRARIES FOR "EXPRESS"
  const bodyParser = require('body-parser');
  const expressJWT = require('express-jwt');
  const jwt = require('jsonwebtoken');
  const SECRET = 'myAuthationcation test';

- ExpressJWT AND jwt are the main libraries to use JWT
- Firstly the "secret key" to use 
  app.use(expressJWT({
      secret: SECRET
  })
- Secondly call the method "unless" to set the list of route paths which do not need to have a token validation, 
  in the most common cases could be "./login"
.unless({
    path: ['/login']
}));

- in "'/login'" route we send to the client the token which needs to be sent in any request
app.post('/login', function (req, res) {
.......
    if (!user) {
      .....
    } else {
        var mmyToken = jwt.sign({
            userName: user.userName
        }, SECRET);
        res.status(200).send({
            message: `${user.userName} is now logged in.`,
            userType: `${user.isAdmin ? 'Admin' : 'Normal'}`,
            token: mmyToken
        });
    }
....
}

- THAT'S IS WHAT YOU BASICALLY NEED TO MAKE USE JWT, I AM LEARNING ABOUT THAT, HOPE THIS EXAMPLE CAN HELP ANYONE
     
