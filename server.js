require('dotenv').config()
const express = require('express')
const app = express()

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const resellersRouter = require('./routes/resellers')
app.use('/reseller', resellersRouter)

const purshasesRouter = require('./routes/purshases')
app.use('/purshase', purshasesRouter)


app.listen(process.env.API_PORT, () => console.log(`Serving running on ${process.env.API_HOST}:${process.env.API_PORT}`));