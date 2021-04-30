const Article = require('../articles/Article')
const errorHandler = require('../utils/errorHandler')

class ArticleController {
	async getAll(req, res) {
		try {
			// получение статей определенного автора
			// const articles = await Article.find({user: req.user.id})
			// res.status(200).json(articles)
			const articles = await Article.find()
			res.json(articles)
		} catch (error) {
			errorHandler(res, error)
		}
	}

	async create(req, res) {
		console.log('request', req.body)
		try {
			// const existed = await Article.findOne({ title: req.body.title })
			// if (existed) {
			// 	return res.status(400).json({ message: 'Статья с таким названием уже существует' })
			// }

			const article = new Article(req.body)
			console.log('article', article)
			await article.save()
			res.status(201).json(article)
		} catch (error) {
			errorHandler(res, error)
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
			errorHandler(res, error)
		}
	}

	async remove(req, res) {
		try {
			await Article.remove({ _id: req.params.id })
			res.status(200).json({ message: 'Статья удалена' })
		} catch (error) {
			errorHandler(res, error)
		}
	}
}

module.exports = ArticleController
