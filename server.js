var express = require('express');
var bodyParser = require('body-parser');
var userCtrl = require('./userCtrl.js')

var app = express();
app.use(bodyParser.json())



app.get('/api', function (req, res) {
  var users = userCtrl.updateUser(1, {email: "Yee@Yee.ye"})

  res.status(200).json(users)
})

app.get('/api/users', function (req, res) {
  var users = []

  if (Object.keys(req.query).length) {
    if (req.query.favorite) {
      users = userCtrl.getUsersByFavorite(req.query.favorite)
    } else if (req.query.age) {
      users = userCtrl.getUsersByAgeLimit(req.query.age)
    } else if (req.query.lastname) {
      users = userCtrl.findUserByQuery('last_name', req.query.lastname)
    } else if (req.query.email) {
      users = userCtrl.findUserByQuery('email', req.query.email)
    }
  } else {
    users = userCtrl.readAll()
  }

  res.status(200).json(users)
})

app.get('/api/users/:id', function (req, res) {
  var users = userCtrl.findUserById(req.params.id)
  if (users) {
    res.status(200).json(users)
  } else {
    res.status(404)
  }


})

app.get('/api/admins', function (req, res) {
  var users = userCtrl.getAdmins()

  res.status(200).json(users)
})
app.get('/api/nonadmins', function (req, res) {
  var users = userCtrl.getNonAdmins()

  res.status(200).json(users)
})

app.put('/api/users/:id', function (req, res) {
  console.log(req.params.id);
  var id = parseInt(req.params.id)
  var users = userCtrl.updateUser(id, req.body)


  res.status(200).json(users)



})

app.post('/api/users', function (req, res) {

  var users = userCtrl.createUser(req.body)


  res.status(200).json(users)



})

app.delete('/api/users/:id', function (req, res) {
  var id = parseInt(req.params.id)
  var users = userCtrl.removeUser(id)


  res.status(200).json(users)



})





module.exports = app
