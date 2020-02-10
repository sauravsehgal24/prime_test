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

// Route protection dummy middleware (in real life scenario this could be JWT middlewares to verify and ensure tokens)
const verifySecureRequest = (req,res,next) =>{
    const {securetoken} = req.headers

    // Check the token (for instance stored in process.env)
    if(securetoken != 'djsklbdakldasjk')
        return res.status(401).json({
            message: 'unauthorized'
        })
    else
        next()
}

// Route endpoint
app.post('/api/prime_numbers', verifySecureRequest ,(req,res)=>{
    
    const upperLimit = req.body.upperLimit
    if(!upperLimit || upperLimit <= 0 || upperLimit == 1) return res.status(400).json({
        message: 'Bad Input',
    })

    const median = getMedianPrimeNumbers(upperLimit)
    return res.status(200).json({
        message: 'OK',
        median
    })
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
app.listen(port, () => console.log(`prime_test ${process.env.NODE_ENV || ''} Server listening on port ${port}!`))