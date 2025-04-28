const express = require("express");
const router = express.Router();
const { login, register } = require("../controllers/authController");

router.post("/register", (req, res, next) => {
  register(req, res, next);
});

router.post("/login", (req, res, next) => {
  login(req, res, next);
});

module.exports = router;
