const app = require('./serverConfig')
const port = process.env.PORT || 3001
// Server listening on port
app.listen(port, () => console.log(`prime_test ${process.env.NODE_ENV || ''} Server listening on port ${port}!`))