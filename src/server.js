const express = require('express')
const mongoose = require('mongoose')
const router = require('./router')
const cors = require('cors')
const { PORT, dbUrl } = require('./config')

const app = express()

app.use(cors())
app.use(express.json())
app.use('/api', router)

const start = async () => {
	try {
		await mongoose.connect(dbUrl, { useUnifiedTopology: true, useNewUrlParser: true })
		app.listen(PORT, () => console.log(`server started on port: ${PORT}`))
	} catch (e) {
		console.log(e)
	}
}

start()
