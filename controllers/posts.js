import { response } from 'express';
import PostMessage from '../models/postMessages.js'

// this is where all the logic of the routes is going to go
// more on status code :https://www.restapitutorial.com/httpsstatuscodes.html

export const getPosts = async (req,res) =>{

    try {
        const postMessages = await PostMessage.find() // await coz it might take timeto fetch all stuff

        res.status(200).json(postMessages);
        
    } catch (error) {
        res.status(404).json({message : error.message})
    }
}


export const createPosts = async (req,res) =>{
    const post = req.body
    const newPost = new PostMessage(post)  // creation of new post based on the model
    try {
        
        await newPost.save()
        res.status(201).json(newPost)
    } catch (error) {
        res.status(409).json({message:error.message})
        
    }
}