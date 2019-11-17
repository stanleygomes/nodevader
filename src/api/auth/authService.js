const bcrypt = require('bcrypt')
const jwtUtil = require('../../utils/jwtUtils')

const getSessionData = (req, res) => {
  return new Promise((resolve, reject) => {
    const user = {
      id: 1,
      name: 'Fulano',
      email: 'fulano@gmail.com'
    }

    resolve(user)
  })
}

const login = (req, res) => {
  return new Promise((resolve, reject) => {
    const user = {
      id: 1,
      name: 'Fulano',
      email: 'fulano@gmail.com',
      password: bcrypt.hash('123456', 10)
    }

    jwtUtil.generateAuthToken().then(response => {
      user.token = response
      delete user.password
      resolve(response)
      res.header('x-auth-token', response).send(user)
    }).catch(error => {
      res.send(error)
    })
  })
}

module.exports = {
  login,
  getSessionData
}
