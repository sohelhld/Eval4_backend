const express = require('express');
const { userModel } = require('../model/user.model');
const {exist}=require("../middelware/exist.middelware")
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


const userRouter = express.Router()

userRouter.post("/register",async(req,res)=>{
    const {name,email,gender,password,age,city,is_married}  = req.body
    try {
         bcrypt.hash(password, 2, async(err, hash)=> {
            try {
                const user  = new userModel({name,email,gender,password:hash,age,city,is_married})
                await user.save()
                res.status(200).send({"msg":"Regiter has been done"})
            } catch (err) {
                res.status(400).send({"msg":err.message})
            }
               
        });  
    } catch (err) {
        res.status(400).send({"msg":"Regiter has NOT done"})
    }

})

userRouter.post("/login",async(req,res)=>{
    const {email,password}=req.body
    try {
        const user = await userModel.findOne({email})
        bcrypt.compare(password, user.password, async(err, result)=> {

               if(result){
                const token = jwt.sign({userID:user._id},"masai")
                res.status(200).send({"msg":"loging succesfull","token":token})
               } else{
                res.status(400).send({"msg":"Wrong Credencial"})
               }
        });   
    } catch (err) {
        res.status(400).send({"msg":err.message})
    }
})


module.exports={
    userRouter
}