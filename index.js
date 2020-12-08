
const express = require('express')
const app = express()
const port = process.env.PORT || 4000
const { users } = require('./state')

app.use(express.json())

/* BEGIN - create routes here */

app.get('/users', function (req, res) {
  res.json(users)
})

app.get('/users/:id', function (req, res) {
  res.json(users.filter(user =>user._id === parseInt(req.params.id)))
})

app.post('/users', function (req, res) {
  // res.send(req.body)

  const newUser = {
    
    _id: users.length + 1,
    name: req.body.name,
    occupation: req.body.occupation,
    avatar: req.body.avatar
  }

  users.push(newUser);
  res.json(users)
})

app.put('/users/:id', function (req, res) {
  // res.json(users.filter(user =>user._id === parseInt(req.params.id)))

  const updateUser = req.body;

  users.forEach(user => {
    if(user._id === parseInt(req.params.id)) {
      user.name = updateUser.name ? updateUser.name : user.name;
      user.occupation = updateUser.occupation ? updateUser.occupation  : user.occupation;
      res.json({msg: 'User updated', user})
    }
})
})

app.delete('/users/:id', function (req, res) {
  res.json(users.filter(user =>user._id !== parseInt(req.params.id)))
})

app.delete('/users/active/:id', function (req, res) {
  deletedUser = users.filter(user =>user._id === parseInt(req.params.id))
  deletedUser[0].isActive = "false"
  res.json(deletedUser)
})


/* END - create routes here */

app.listen(port, () => 
  console.log(`Example app listening on port ${port}!`))