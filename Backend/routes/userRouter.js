const express = require('express');
const router = express.Router();
const userController = require("../controllers/userController");

router.post('/', userController.create);
router.post('/login', userController.login);
router.get('/', userController.getUsers);

module.exports.userRouter = router;