import jwt from 'jsonwebtoken'



const auth = async (req,res,next) =>{
    // we need a token from the frontend

    try {
        const token = req.headers.authorization.split(" ")[1]
        // basicallcaly we  gonna have 2 kinds of token ie our own and those from google
        const isCustomAuth = token.length < 500;

        let decodedData  // this variable holds the data we want from the token
        if(token && isCustomAuth){
            // we need to get the user id and other stuff from it
            // it has to be the same secret used when the token was created
            decodedData = jwt.verify(token,"secret")
             
            // storing the id of user now
            req.userId = decodedData?.id
        }else{
            decodedData = jwt.decode(token) // asumming the token is of google
            req.userId = decodedData?.sub // the sub thig is the way google diffentiate its users
        }

        next()
        
    } catch (error) {
        console.log(error)
        
    }
}

export default auth;