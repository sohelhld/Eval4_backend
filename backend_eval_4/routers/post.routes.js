const express = require('express');
const {postModel} =require("../model/post.model")


const postRouter =express.Router()

postRouter.get("/",async(req,res)=>{
    const {minCom , maxCom }=req.query
    const {pageno}=req.params
    const postStart = (pageno-1)*2
    try {
        //pagination 
        const postes = await postModel.find().skip(postStart).limit(3)
        //min max comments
        const query={}
        if(minCom){
            query.no_of_comments={$gte:minCom}
        }

        if(maxCom){
            if(query.no_of_comments){
              query.no_of_comments.$lte=maxCom
            }else{
              query.no_of_comments={$lte:maxCom}
            }   
          }

        const posts =await postModel.find()
        res.status(200).send(posts)
    } catch (err) {
        res.status(400).send({"msg":err.message})
    }
})
postRouter.get ("/top",async(req,res)=>{

    const {max_no_com}=req.body
    const {pageno}=req.params
    const postStart = (pageno-1)*2
    try {
        const postes = await postModel.find({$gte:max_no_com}).skip(postStart).limit(3)
        
    } catch (err) {
        res.status(400).send({"msg":err.message})
    }
})

postRouter.post("/add",async(req,res)=>{
    try {
        const post = new postModel(req.body)
        await post.save()
        res.status(200).send({"msg":"new post has been added"})
    } catch (err) {
        res.status(400).send({"msg":"err.message"})
    }
    
})

postRouter.patch("/update/:postID",async(req,res)=>{
    const {postID}=req.params
    const payload =req.body
    try {
        await postModel.findByIdAndUpdate({_id:postID},payload)
        res.status(200).send({"msg":" post has been updated"})
    } catch (err) {
        res.status(400).send({"msg":"err.message"})
    }
    
})

postRouter.delete("/delete/:postID",async(req,res)=>{
    const {postID}=req.params
    try {
        await postModel.findByIdAndDelete({_id:postID})
        res.status(200).send({"msg":" post has been deleted"})
    } catch (err) {
        res.status(400).send({"msg":"err.message"})
    }
})

module.exports={
   postRouter
}