// Dependency imports
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')
const app = express()
const port = process.env.PORT || 3001

// Server imports
const getMedianPrimeNumbers = require('./businessLogic/primeNumbers')

// Required middlewares
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Route endpoints
app.post('/api/prime_numbers', (req,res)=>{
    const median = getMedianPrimeNumbers(req.body.upperLimit)
    console.log('-----------------------------------------')
    console.log(`median = ${median}`)
})

// Serve client UI in production mode
const clientServe = express.static(path.resolve(__dirname, '../client/build'))
if(process.env.NODE_ENV === 'production'){
    app.use('/',clientServe)
}
else{
    app.get('/',(req,res)=>{
        res.send('prime_test says hi');
    })
}

// Server listening on port
app.listen(port, () => console.log(`prime_test ${process.env.NODE_ENV || ""} Server listening on port ${port}!`))