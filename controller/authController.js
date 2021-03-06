const jwt = require('jsonwebtoken')

const models = require('../models')
const user = models.users

exports.login = async(req,res) =>{
    
    const email = req.body.email
    const password = req.body.password
    console.log(email)
    const checkUser = await user.findOne({
        where : {
            email,
            password
        }
    })
    if(checkUser){
        const token = jwt.sign({userId:checkUser.id},'my-secret-key')
        res.send({
            checkUser,
            token
        })
    }
    else{
        res.send({
            error:true,
            message : 'wrong'
        })
        
    }
}

exports.register = async(req,res) => {

    const signUp = await user.create(req.body)
    const token = jwt.sign(signUp.id,'my-secret-key')
    res.send({
        signUp
        ,token
    })
}