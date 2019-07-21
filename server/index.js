const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const htmlPdf = require('html-pdf')

const PORT = process.env.PORT || 5000;
const pdfTemplate = require('./templates/index')
const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.post('/api/v1/create-pdf', (req, res) => {
    htmlPdf.create(pdfTemplate(req.body), {}).toFile('result.pdf', err => {
        if (err) {
            res.send(Promise.reject())
        }
        res.send(Promise.resolve())
    })
})

app.post('/api/v2/create-pdf', (req, res) => {
    htmlPdf.create(pdfTemplate(req.body), {}).toBuffer((err, buffer) => res.send(Buffer.from(buffer)))
})

app.get('/api/fetch-pdf', (req, res) => res.sendFile(`${__dirname}/result.pdf`))

app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`))