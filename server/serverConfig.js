// Dependency imports
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')
const app = express()

// Server imports
const getMedianPrimeNumbers = require('./businessLogic/primeNumbers')
const isValidReqInput = require('./validation')

// Required middlewares
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Route protection dummy middleware (in real life scenario this could be JWT middlewares to verify and ensure tokens)
const verifySecureRequest = (req,res,next) =>{

    // De-Structuring req
    const {
        headers:{
            securetoken
        },
        body:{
            upperLimit
        }
    } = req

    // Check the token (for instance stored in process.env) and server side input validation
    if(securetoken != 'djsklbdakldasjk')
        return res.status(401).json({
            message: 'unauthorized'
        })
    else if(isValidReqInput(upperLimit).error != null){
        return res.status(400).json({
            message: 'Bad Input'
        })
    }
    else
        next()
}

// Route endpoint
app.post('/api/prime_numbers', verifySecureRequest ,(req,res)=>{
    const upperLimit = req.body.upperLimit
    const median = getMedianPrimeNumbers(upperLimit)
    if(median == 0){
        return res.status(500).json({
            message: 'Internal Server Error',
        })
    }
    else{
        return res.status(200).json({
            message: 'OK',
            median
        })
    }
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

module.exports = app
