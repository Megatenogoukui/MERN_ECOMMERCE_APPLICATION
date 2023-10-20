import jwt from 'jsonwebtoken'

const generateToken = (res ,userId) => {
     //Creating a token
     const token = jwt.sign({userId} , process.env.JWT_SECRET , {
        expiresIn : '1d'
    })

    //Set jwt as http-only Cookie
    res.cookie('jwt' , token ,{
        httpOnly :true,
        secure : process.env.NODE_ENV !== 'development',
        sameSite : 'strict',
        maxAge : 24 * 60 * 60 * 1000
        
    })
}

export default generateToken