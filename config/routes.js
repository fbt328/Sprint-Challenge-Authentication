const axios = require('axios');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { authenticate, generateToken } = require('../auth/authenticate');
const Users = require('../database/userModel')

module.exports = server => {
  server.post('/api/register', register);
  server.post('/api/login', login);
  server.get('/api/jokes', authenticate, getJokes);
};

function register(req, res) {
  // implement user registration
  let user = req.body
  const hash = bcrypt.hashSync(user.password, 10)
  user.password = hash;

  Users.add(user)
    .then(saved => {
      res.status(201).json({message: 'registration complete'});
    })
    .catch(err => {
      res.status(500).json({message:'registration failed'})
    })
}

 // implement user login
function login(req, res) {
  let { username, password } = req.body;
  Users.findBy({ username })
    .first()
    .then( user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);
        console.log(token);
        res.status(200).json({token, message: `welcome, ${user.username}`})
      } else {
        res.status(401).json({message: 'wrong username and/or password'})
      }
    })
    .catch(err => {
      res.status(500).json({message: 'failure at .catch'})
    })
}

function getJokes(req, res) {
  const requestOptions = {
    headers: { accept: 'application/json' },
  };

  axios
    .get('https://icanhazdadjoke.com/search', requestOptions)
    .then(response => {
      res.status(200).json(response.data.results);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Fetching Jokes', error: err });
    });
}
