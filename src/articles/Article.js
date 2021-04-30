const { Schema, model } = require('mongoose')

const articleSchema = new Schema({
	author: {
		type: String,
		required: false,
		default: 'lex'
	},
	title: {
		type: String,
		unique: true,
		required: true
	},
	description: {
		type: String,
		required: true
	},
  content: {
		type: String,
		required: true
	},
  group: {
		type: String,
		required: true
	},
  published: {
		type: String,
		default: true,
		required: true
	},
  createdDate: {
		type: Date,
		default: Date.now()
	},
  updatedDate: {
		type: Date,
		default: Date.now()
	}
})

articleSchema.set('toJSON', {
	transform: function(doc, ret, options) {
		ret.id = ret._id
		delete ret._id
		delete ret.__v
	}
})

module.exports = model('Article', articleSchema)