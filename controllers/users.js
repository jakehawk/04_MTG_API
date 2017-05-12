var User = require("../models/User");

// Method called when signing up a new user
module.exports.create = (req, res, next)=> {
  if (!req.body.password) {
    return res.status(422).send('Missing required fields');
  }
  
  User
    .create(req.body)
    .then(function(user) {
      res.json({
        success: true,
        message: 'Successfully created user.',
        data: {
          email : user.email,
          id    : user._id
        }
      });
    }).catch(function(err) {
      if (err.message.match(/E11000/)) {
        err.status = 409;
      } else {
        err.status = 422;
      }
      next(err);
    });
};

// Method called to return index of all users
module.exports.index = (req, res, next)=> {
  User.find((err, users)=> {
    if (err) res.json({ message: `Could not find any users b/c: ${err}`});

    res.json({ users: users });
  }).select('-__v');
};

// Method called to return specific user
module.exports.me = (req, res, next)=> {
  User
    .findOne({ email: req.decoded.email }).exec()
    .then(function(user) {
      res.json({
        success : true,
        message : 'Successfully retrieved user data.',
        data    : user
      });
    })
    .catch(function(err) {
      next(err);
    });
};