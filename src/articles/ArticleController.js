const Article = require('../articles/Article')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator')
const { secret } = require('../config')

class ArticleController {
	async getAll(req, res) {
		try {
			// получение статей определенного автора
			// const articles = await Article.find({user: req.user.id})
			// res.status(200).json(articles)
			const articles = await Article.find()
			res.json(articles)
		} catch (e) {
			console.log(e)
		}
	}

	async create(req, res) {
		try {
			// const existed = await Article.findOne({ title: req.body.title })
			// if (existed) {
			// 	return res.status(400).json({ message: 'Статья с таким названием уже существует' })
			// }

			const article = new Article(req.body)
			await article.save()
			res.status(201).json({ message: 'Статья создана' })
		} catch (error) {
			res.status(500).json({ message: `Error: ${error}` })
		}
	}

	async update(req, res) {
		const data = {
			...req.body,
			updatedDate: Date.now()
		}
		// if (data.createdDate) delete data['createdDate']
		try {
			const updatedArticle = await Article.findOneAndUpdate({ _id: req.params.id }, { $set: data }, { new: true })
			res.status(200).json(updatedArticle)
		} catch (error) {
			res.status(500).json({ message: `Error: ${error}` })
		}
	}

	async remove(req, res) {
		try {
			await Article.remove({ _id: req.params.id })
			res.status(200).json({ message: 'Статья удалена' })
		} catch (error) {
			res.status(500).json({ message: `Error: ${error}` })
		}
	}
}

module.exports = ArticleController
