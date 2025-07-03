const express = require('express');
const router = express.Router();

const UserController = require('../controllers/userController');

router.post('/add', UserController.addUser);
router.get('/get', UserController.ViewAllUser);


router.delete('/delete/:id', UserController.deleteUser);
router.put('/update/:id', UserController.updateUser);

module.exports = router;
