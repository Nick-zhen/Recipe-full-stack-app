const express = require('express')
const router = express.Router()
const {
  registerUser,
  loginUser,
  getMe,
} = require('../controllers/userController')
const { protect } = require('../middleware/authMiddleware')
const users = [
  { id: "1", name: 'Stephanie' },
  { id: "2", name: 'Ian' },
  { id: "3", name: 'Danya' }
];
// router.get('/', function (req, res, next) {
//   return res.send(users);
// });

// router.get('/:userId', function (req, res, next) {
//   const foundUser = users.find(user => user.id === req.params.userId);
  
//   if (!foundUser) return res.status(404).send({ message: 'User not found' });

//   return res.send(foundUser);
// });

router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/me', protect, getMe)

// update user
router.put('/:userId', function (req, res, next) {
  const foundUser = users.find(user => user.id === req.params.userId);
  
  if (!foundUser) return res.status(404).send({ message: 'User not found' });
  const updUser = req.body;
  users.forEach((user => {
    if (user.id === req.params.userId) {
      user.name = updUser.name ? updUser.name : user.name; 
      res.json({msg: 'User updated', user});
    }
  }))
  return res.send(foundUser);
});

// delete user
router.delete('/:userId', function (req, res, next) {
  const foundUser = users.find(user => user.id === req.params.userId);
  
  if (!foundUser) return res.status(404).send({ message: 'User not found' });

  
  res.json({
    msg: 'User deleted', 
    deletedUser: foundUser,
    users: users.filter((user => user.id !== req.params.userId))
  });

  
});

module.exports = router;
