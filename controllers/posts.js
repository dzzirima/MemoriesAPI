import { response } from 'express';
import PostMessage from '../models/postMessages.js'
import  PostMessages from '../models/postMessages.js'
// this is where all the logic of the routes is going to go

export const getPosts = async (req,res) =>{

    try {
        const postMessages = await PostMessage.find() // await coz it might take timeto fetch all stuff

        res.status(200).json(postMessages);
        
    } catch (error) {
        res.status(404).json({message : error.message})
    }
}


export const createPosts = (req,res) =>{
    res.send("post creation")
}