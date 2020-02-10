const supertest = require('supertest')
const app = require('./serverConfig')
const request = supertest(app)
const getMedianPrimeNumbers = require('./businessLogic/primeNumbers')

// Test getMedianPrimeNumbers function
describe('Test getMedianPrimeNumbers function',()=>{
    it('should return 0 if upperLimit is string',()=>{
        const result = getMedianPrimeNumbers('jmdsas')
        expect(result).toBe(0)
    })
    it('should return 0 if upperLimit is negative',()=>{
        const result = getMedianPrimeNumbers(-1)
        expect(result).toBe(0)
    })
    it('should return 0 if upperLimit is less than 3',()=>{
        const result = getMedianPrimeNumbers(2)
        expect(result).toBe(0)
    })
    it('should return 0 if upperLimit is more than 10000000',()=>{
        const result = getMedianPrimeNumbers(10000001)
        expect(result).toBe(0)
    })
    it('should not return 0 if upperLimit is validated true',()=>{
        const result = getMedianPrimeNumbers(12)
        expect(result).not.toBe(0)
        expect(result[0]).toBe(5)
    })
    it('should return median if upperLimit is validated true',()=>{
        const result = getMedianPrimeNumbers(8)
        expect(result).not.toBe(0)
        expect(result[0]).toBe(3)
        expect(result[1]).toBe(5)
    })
})

// Test Server API end point
describe('Test Server API end point',()=>{
    it('should be listning on 3001',()=>{
        const server = app.listen(3001)
        expect(server).not.toBe(null)
        server.close()
    })
    it('should be 404',async (callback)=>{
        const response = await request.get('/api/prime_numbers')
        expect(response.status).toBe(404)
        callback()
    })
    it('should be 401 without secure token',async (callback)=>{
        const response = await request.post('/api/prime_numbers')
        expect(response.status).toBe(401)
        callback()
    })
    it('should be 400 with bad input (no payload)',async (callback)=>{
        const response = await request.post('/api/prime_numbers').set('securetoken','djsklbdakldasjk')
        expect(response.status).toBe(400)
        callback()
    })
    it('should be 400 with bad input (string)',async (callback)=>{
        const payload = {
            upperLimit:'jamdsa'
        }
        const response = await request.post('/api/prime_numbers').send(payload).set('securetoken','djsklbdakldasjk')
        expect(response.status).toBe(400)
        callback()
    })
    it('should be 400 with bad input (empty)',async (callback)=>{
        const payload = {
            upperLimit:''
        }
        const response = await request.post('/api/prime_numbers').send(payload).set('securetoken','djsklbdakldasjk')
        expect(response.status).toBe(400)
        callback()
    })
    it('should be 400 with bad input (null)',async (callback)=>{
        const payload = {
            upperLimit:null
        }
        const response = await request.post('/api/prime_numbers').send(payload).set('securetoken','djsklbdakldasjk')
        expect(response.status).toBe(400)
        callback()
    })
    it('should be 400 with bad input (negative)',async (callback)=>{
        const payload = {
            upperLimit:-1
        }
        const response = await request.post('/api/prime_numbers').send(payload).set('securetoken','djsklbdakldasjk')
        expect(response.status).toBe(400)
        callback()
    })
    it('should be 400 with bad input (less than 3)',async (callback)=>{
        const payload = {
            upperLimit:2
        }
        const response = await request.post('/api/prime_numbers').send(payload).set('securetoken','djsklbdakldasjk')
        expect(response.status).toBe(400)
        callback()
    })
    it('should be 400 with bad input (more than 10000000)',async (callback)=>{
        const payload = {
            upperLimit:100000000
        }
        const response = await request.post('/api/prime_numbers').send(payload).set('securetoken','djsklbdakldasjk')
        expect(response.status).toBe(400)
        callback()
    })
    it('should be 200 ',async (callback)=>{
        const payload = {
            upperLimit:12
        }
        const response = await request.post('/api/prime_numbers').send(payload).set('securetoken','djsklbdakldasjk')
        expect(response.status).toBe(200)
        callback()
    })
})