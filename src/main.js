const express = require('express')
const path = require('path')
const {v4} = require ('uuid')
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(cors())

let ARTICLES = [
	{id: v4(), name: 'Статья-1', description: 'Описание к статье-1', content: 'Текст статьи 1', group: 'JS', published: true, createdDate: '', updatedDate: ''},
	{id: v4(), name: 'Статья-2', description: 'Описание к статье-2', content: 'Текст статьи 2', group: 'CSS3', published: true, createdDate: '', updatedDate: ''},
	{id: v4(), name: 'Статья-3', description: 'Описание к статье-3', content: 'Текст статьи 3', group: 'HTML5', published: true, createdDate: '', updatedDate: ''},
	{id: v4(), name: 'Статья-4', description: 'Описание к статье-4', content: 'Текст статьи 3', group: 'JS', published: true, createdDate: '', updatedDate: ''},
	{id: v4(), name: 'Статья-1', description: 'Описание к статье-1', content: 'Текст статьи 1', group: 'JS', published: true, createdDate: '', updatedDate: ''},
	{id: v4(), name: 'Статья-2', description: 'Описание к статье-2', content: 'Текст статьи 2', group: 'CSS3', published: true, createdDate: '', updatedDate: ''},
	{id: v4(), name: 'Статья-3', description: 'Описание к статье-3', content: 'Текст статьи 3', group: 'HTML5', published: true, createdDate: '', updatedDate: ''},
	{id: v4(), name: 'Статья-4', description: 'Описание к статье-4', content: 'Текст статьи 3', group: 'JS', published: true, createdDate: '', updatedDate: ''},
	{id: v4(), name: 'Статья-2', description: 'Описание к статье-2', content: 'Текст статьи 2', group: 'CSS3', published: true, createdDate: '', updatedDate: ''},
	{id: v4(), name: 'Статья-3', description: 'Описание к статье-3', content: 'Текст статьи 3', group: 'HTML5', published: true, createdDate: '', updatedDate: ''},
	{id: v4(), name: 'Статья-5', description: 'Описание к статье-4', content: 'Текст статьи 3', group: 'JS', published: true, createdDate: '', updatedDate: ''}
]

let USERS = [
	{id: v4(), email: 'aa@mail.ru', password: 'Описание к статье-1', login: 'Текст статьи 1', group: 'JS', lastLoginDate: true},
	{id: v4(), email: 'bb@mail.ru', password: 'Описание к статье-1', login: 'Текст статьи 1', group: 'JS', lastLoginDate: true},
	{id: v4(), email: 'cc@mail.ru', password: 'Описание к статье-1', login: 'Текст статьи 1', group: 'JS', lastLoginDate: true},
	{id: v4(), email: 'dd@mail.ru', password: 'Описание к статье-1', login: 'Текст статьи 1', group: 'JS', lastLoginDate: true},
	{id: v4(), email: 'eeail.ru', password: 'Описание к статье-1', login: 'Текст статьи 1', group: 'JS', lastLoginDate: true}
]

//GET articles
app.get('/api/articles', (req, res) => {
	res.status(200).json(ARTICLES)
})

//POST article
app.post('/api/articles', (req, res) => {
	const article = {...req.body, id: v4()}
	ARTICLES.push(article)

	console.log('POST articles:', ARTICLES)	
	console.log('article:', article)

	res.status(201).json(article)
})

//DELETE article
app.delete('/api/articles/:id', (req, res) => {
	ARTICLES = ARTICLES.filter(a => a.id !== req.params.id)
	res.status(200).json({message: 'Статья была удалена'})
})

//PUT articles
app.put('/api/articles/:id', (req, res) => {
	const idx = ARTICLES.findIndex(a => a.id === req.params.id)
	ARTICLES[idx] = req.body
	res.json(ARTICLES[idx])
})

app.put('/api/articles/publish/:flag', (req, res) => {
	const ids = req.body

})


//GET users
app.get('/api/users', (req, res) => {
	res.status(200).json(USERS)
})

//POST user
app.post('/api/users', (req, res) => {
	const user = {id: v4(), ...req.body}
	USERS.push(user)
	res.status(201).json(user)
})

//DELETE user
app.delete('/api/users/:id', (req, res) => {
	USERS = USERS.filter(u => u.id !== req.params.id)
	res.status(200).json({message: 'User был удален'})
})

//PUT users
app.put('/api/users/:id', (req, res) => {
	const idx = USERS.findIndex(u => u.id === req.params.id)
	USERS[idx] = req.body
	res.json(USERS[idx])
})


// app.use(express.static(path.resolve(__dirname, 'client')))

// app.get('/', (req, res) => {
// 	res.sendFile(path.resolve(__dirname, 'client', 'index.html'))
// })

const PORT = 3000

app.listen(PORT, () => console.log(`run server on http://localhost:${PORT}`))
