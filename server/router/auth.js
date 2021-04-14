const express = require('express');
const router = express.Router();


const requireLogin = require('../middleware/requireLogin')

const {
  Home, Session, Posting, SeePosting
} = require('../controllers/home');

const {
  LoginPage,
  Login,
  RegisterPage,
  Register,
  Logout
} = require('../controllers/auth');

router.get("/", (req,res) => {
  return res.redirect('/home')
})

router.get("/home", requireLogin, Home)
router.get('/session', Session)
router.get('/see_posting', SeePosting)
router.post('/posting', Posting )


router.get('/login', LoginPage).post('/login', Login);
router.get('/register', RegisterPage).post('/register', Register)
router.get('/logout', Logout)








module.exports = router;