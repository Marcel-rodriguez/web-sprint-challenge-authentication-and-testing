const db = require('../../data/dbConfig')
const yup = require('yup')

const checkNameUnique = async (req, res, next) => {
   const user = await db('users').where('username', req.body.username)

   if(user.length === 0){
       next()
    } else {
        next({status: 400, message: 'username taken'})
    }
}

const checkNameExists = async (req, res, next) => {
    const user = await db('users').where('username', req.body.username)

   if(user.length === 0){
    next({status: 404, message: 'invalid credentials'})
   } else {
       next()
   }
}

const registerPayloadSchema = yup.object({
    username: yup.string().required(),
    password: yup.string().required()
})

const checkPayloadValid = async (req, res, next) => {
    try{
        const validPayload = await registerPayloadSchema.validate(req.body)
        req.body = validPayload
        next()
    } catch(err){
        next({status: 400, message: 'username and password required'})
    }
    
}


module.exports = {
    checkNameUnique,
    checkPayloadValid,
    checkNameExists
}