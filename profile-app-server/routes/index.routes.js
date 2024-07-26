const router = require("express").Router();
const User = require("../models/User.model");
const uploader = require('../config/cloudinary.config');
const passport = require('passport');
const bcrypt = require('bcryptjs');

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

router.post("/auth/signup", (req, res, next) => {
  const { username, password, campus, course } = req.body;

  if (!username || !password || !campus || !course) {
    res.status(400).json({ message: "Provide username, password, campus and course" });
    return;
  }

  if (password.length < 7) {
    res.status(400).json({ message: "Please make your password at last 8 characters long for security purposes." });
    return;
  }

  User.findOne({ username }, (err, foundUser) => {
    if (err) {
      res.status(500).json({ message: "Username check went bad." });
      return;
    }

    if (foundUser) {
      res.status(400).json({ message: "Username taken. Choose another one." });
    }

    const salt = bcrypt.genSaltSync(10);
    const hashPass = bcrypt.hashSync(password, salt);

    const aNewUser = new User({
      username,
      password: hashPass,
      campus,
      course
    });

    aNewUser.save(err => {
      if (err) {
        res.status(400).json({ message: 'Saving user to database went wrong.' });
        return;
      }

      req.login(aNewUser, (err) => {
        if (err) {
          res.status(500).json({ message: 'Login after signup went bad.' });
          return;
        }

        res.status(200).json(aNewUser);
      });
    });
  });
});

router.post("/auth/login", (req, res, next) => {
  passport.authenticate('local', (err, theUser, failureDetails) => {
    if (err) {
      res.status(500).json({ message: 'Something went wrong authenticating user' });
      return;
    }

    if (!theUser) {
      // "failureDetails" contains the error messages
      // from our logic in "LocalStrategy" { message: '...' }.
      console.log(failureDetails);
      res.status(401).json(failureDetails);
      return;
    }

    // save user in session
    req.login(theUser, (err) => {
      if (err) {
        res.status(500).json({ message: 'Session save went bad.' });
        return;
      }

      // We are now logged in (that's why we can also send req.user)
      res.status(200).json(theUser);
    });
  })(req, res, next);
});

router.get("/auth/verify", (req, res, next) => {
  if (req.isAuthenticated()) {
    res.status(200).json(req.user);
    return;
  }
  res.status(403).json({ message: 'Unauthorized' });
});

router.put("/api/users", (req, res, next) => {
  const { image } = req.body;
  res.json("Updated user object");
});

router.get("/api/users", (req, res, next) => {
  res.json("Current user object");
});

router.post("/auth/upload", uploader.single("imageUrl"), (req, res, next) => {
  if (!req.file) {
    next(new Error('No file uploaded!'));
    return;
  }

  res.json({ secure_url: req.file.path });
});

module.exports = router;
