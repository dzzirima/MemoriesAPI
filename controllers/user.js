import bcrypt from 'bcryptjs' // this one is for hashing users password 
import jwt from 'jsonwebtoken'// this  one is for storing the users for some period of time

import User from '../models/user'

export const signin =  async (req,res) =>{
    const {email,password } = req.body

    try {
        const existingUser  = await User.findOne({email})
        
        if(!existingUser) return res.status(404).json({message:"User does not exits ."})

        const isPasswordCorrect = await bcrypt.compare(password,existingUser.password)

        if(!isPasswordCorrect) return res.status(400).json({message:"Invalid Credentials"})
        
        // secret is a secod augment and expires in is an option object
        const token = jwt.sign({email:existingUser.email,id:existingUser._id},'secret',{expiresIn :"1h"})

        res.status(200).status({result:existingUser,token})
        
    } catch (error) {
        res.status(500).json({message:"Something went wrong"})
        
    }

}


export const signup =  async (req,res) =>{
    const {email,password1,confirmPassword,firstName,lastName} =  req.body

    try {
        const existingUser  = await User.findOne({email})

        if(existingUser) return res.status(400).json({message:"user Already exist"})

        if(password1 !== confirmPassword) return res.status(400).json({message:"Passwords dont match"})

        // 12 is the level of difficluty ie salting
        const hashedPassword = await bcrypt.hash(password,12);


        const result = await User.create({email,password1:hashedPassword,name:`${firstName} ${lastName}`})

        const token = jwt.sign({email:result.email,id:result._id},'secret',{expiresIn :"1h"})

        
        res.status(200).status({result,token})
        
    } catch (error) {
        res.status(500).json({message:"Something went wrong"})
        
    }
    
}
