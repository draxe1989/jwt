const Router = require('express').Router
const userContoller = require('../controllers/user-controller')
const {body} = require('express-validator')
const authMiddleware = require('../middlewares/auth-middleware')

const router = new Router()

router.post('/registration',
    body('email').isEmail(),
    body('password').isLength({min: 3, max: 32}),
    userContoller.registration
)
router.post('/login', userContoller.login)
router.post('/logout', userContoller.logout)
router.get('/activate/:link', userContoller.activate)
router.get('/refresh', userContoller.refresh)
router.get('/users', authMiddleware, userContoller.getUsers)

module.exports = router