const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const expressJWT = require('express-jwt');
const jwt = require('jsonwebtoken');
const SECRET = 'myAuthationcation test';
let users = require('./models').users;
let products = require('./models').products;

app.use(bodyParser.urlencoded({
    extended: true
}));
// parse various different custom JSON types as JSON
// app.use(bodyParser.json({
//     type: 'application/*+json'
// }));

app.use(expressJWT({
    secret: SECRET
}).unless({
    path: ['/', '/login']
}));
app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.send('Welcomen in my JWT TEST AUTHORIZATION!')
})

app.get('/api/prods', function (req, res) {
        res.send(products)
    })
    .post('/api/prods', function (req, res) {
        res.send({
            title: req.title,
            status: 'OK'
        })
    });

app.post('/login', function (req, res) {
    let body = req.body;
    if (!body.userName) {
        res.status(400).send('userName required');
        return;
    };
    if (!body.passWord) {
        res.status(400).send('passWord required');
        return;
    };

    let user = users.find((u) => u.userName === body.userName &&
        u.passWord === body.passWord);
    if (!user) {
        res.status(401).send('Invalid credentials');
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
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})
