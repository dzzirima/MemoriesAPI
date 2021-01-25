// all the routing iis going to be handled from here
import express from 'express'

import getPosts from '../controllers/posts.js'


const router = express.Router()


router.get('/',getPosts)


export default router