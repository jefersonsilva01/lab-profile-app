const router = require("express").Router();
const User = require("../models/User.model");
const uploader = require('../config/cloudinary.config');

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

router.post("/auth/signup", (req, res, next) => {
  const { username, password, campus, course } = req.body;
  User.create({
    username,
    password,
    campus,
    course
  })
    .then(response => res.json(response))
    .catch(err => res.json(err));
});

router.post("/auth/login", (req, res, next) => {
  const { username, password } = req.body;
  res.json("Authentication Token");
})

router.get("/auth/verify", (req, res, next) => {
  const { image } = req.body;
  res.json("Current user object");
})

router.put("/api/users", (req, res, next) => {
  res.json("Updated user object");
})

router.get("/api/users", (req, res, next) => {
  res.json("Current user object");
})

router.post("/auth/upload", uploader.single("imageUrl"), (req, res, next) => {
  if (!req.file) {
    next(new Error('No file uploaded!'));
    return;
  }

  res.json({ secure_url: req.file.path });
})


module.exports = router;
