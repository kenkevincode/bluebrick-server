const { Schema, model } = require('mongoose')

const Article = new Schema({
	author: {
		type: String,
		required: true
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
		default: Date.now
	},
  updatedDate: {
		type: Date,
		default: Date.now
	}
})

module.exports = model('Article', Article)