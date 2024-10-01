const express = require('express');
const { registerUser, login ,getCurrentUser } = require('../controller/users');
const Authorized = require('../middleware/Authentication');
const router = express.Router();


router.post("/sign-up",registerUser);
router.get("/current", Authorized, getCurrentUser);
router.post("/sign-in", login);



module.exports = router;