const { Schema, model } = require('mongoose')

const UserSchema = new Schema({
	email: {
		type: String,
		unique: true,
		required: true
	},
	username: {
		type: String,
		unique: true,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	lastLoginedDate: {
		type: Date,
		default: Date.now()
	},
	roles: [{ type: String, ref: 'Role' }]
})

module.exports = model('User', UserSchema)
