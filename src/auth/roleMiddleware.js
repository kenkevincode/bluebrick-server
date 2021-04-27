const jwt = require('jsonwebtoken')
const { secret } = require('../config')

module.exports = function (roles) {
	return function (req, res, next) {
		if (req.method === 'OPTIONS') {
			return next()
		}

		try {
			// const token = req.headers.authorization.split(' ')[1]
			const [ bearer, token ] = req.headers.authorization.split(' ')
			if (!token) {
				return res.status(403).json({ message: 'Пользователь не авторизован' })
			}
			const { roles: userRoles } = jwt.verify(token, secret)
			let hasRole = false
			userRoles.forEach((role) => {
				if (roles.includes(role)) {
					hasRole = true
				}
			})
			if (!hasRole) return res.status(403).json({ message: 'У вас нет доступа' })
			return next()
		} catch (e) {
			return res.status(403).json({ message: 'Пользователь не авторизован catch' })
		}
	}
}
