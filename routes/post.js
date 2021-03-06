// all the routing iis going to be handled from here
import express from 'express'

import {getPosts ,createPosts ,updatePost,deletePost ,likePost} from '../controllers/posts.js'
// getting the middleware
import auth from '../middleware/auth.js'


const router = express.Router()


router.get('/',getPosts) // the user can see all the posts even when not loged in
router.post('/',auth,createPosts) 
router.patch('/:id',auth,updatePost) // this can be done on the frontend ,just hide the button..
router.delete('/:id',auth,deletePost) // a user needs to be logged in to  be able to delete ,like and create  a post
router.patch('/:id/likePost',auth,likePost) // this one has to be handles on the backend coz the person only like once


export default router