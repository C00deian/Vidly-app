const express = require('express');
const { registerUser, login } = require('../controller/users');
const Authentication = require('../middleware/Authentication');
const router = express.Router();

router.post("/sign-up",registerUser);
router.post("/sign-in", login);



module.exports = router;