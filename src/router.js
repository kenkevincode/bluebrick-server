const Router = require('express')
const AuthController = require('./auth/AuthController')
const ArticleController = require('./articles/ArticleController')
const { check } = require('express-validator')
const roleMiddleware = require('./auth/roleMiddleware')

const router = new Router()
const authController = new AuthController()
const articleController = new ArticleController()

router.post(
	'/registration',
	[
		check('username', 'Имя пользователя не моежет быть пустым').notEmpty(),
		check('password', 'Пароль должен быть более 4 и менее 10 символов').isLength({ min: 4, max: 10 })
	],
	authController.registration
)
router.post('/login', authController.login)
router.get('/users', roleMiddleware('ADMIN'), authController.getUsers)

router.get('/articles', articleController.getAll)
router.post('/articles', articleController.create)
router.put('/articles/:id', articleController.update)
router.delete('/articles/:id', articleController.remove)

module.exports = router
