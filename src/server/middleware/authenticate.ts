var {User} = require('./../models/user');

var authenticate = (request, response, next) => {
  var token = request.header('x-auth');

  // findByToken returns a promise so we call .then() to
  User.findByToken(token).then((user) => {
    // If there is no user whose token is the one provided, then return a rejected promise so the catch below get executed.
    if (!user) {
      return Promise.reject(null);
    }
    // If the user is found, then manipulate the resquest object and continue with the chain of promises.
    request.user = user;
    request.token = token;
    next();
  }).catch((e) => {
    response.status(401).send();
  });
};

module.exports = {authenticate};
