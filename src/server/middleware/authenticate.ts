const { User } = require('./../models/user');

const authenticate = (request, response, next) => {
  const token = request.header('x-auth');
  console.log('Authentication with token', token);
  // findByToken returns a promise so we call .then() to
  User.findByToken(token).then((user) => {
    // If there is no user whose token is the one provided, 
    // then return a rejected promise so the catch below gets executed.
    if (!user) {
      return Promise.reject(null);
    }
    // If the user is found, then manipulate the resquest object and continue with the chain of promises.
    request.user = user;
    request.token = token;
    next();
  }).catch((e) => {
    console.log('Error finding user by token', e);
    response.status(401).send();
  });
};

module.exports = { authenticate };
