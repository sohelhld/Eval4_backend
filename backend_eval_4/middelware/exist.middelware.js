const { userModel } = require("../model/post.model")


const exist = async (req,res,next)=>{
        const userdata=req.body
        // const user = await userModel.find({email:userdata.email})
        if(userdata.email===user.email){
            return res.status(400).send({"msg":"User already exist, please login"})
        }
        next()
}

module.exports={
    exist
}