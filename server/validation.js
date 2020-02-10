const Joi = require('joi')

const schema = Joi.object().keys({
    upperLimit: Joi.number().integer().min(3).max(10000000).required()
})

const isValidReqInput = (input)=>{
    return Joi.validate({upperLimit: input}, schema)
}

module.exports = isValidReqInput