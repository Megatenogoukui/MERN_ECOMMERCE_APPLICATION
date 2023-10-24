import jwt from 'jsonwebtoken'

// Function to generate and set a JWT token as an HTTP-only cookie
const generateToken = (res, userId) => {
    // Creating a token with the user's ID
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '1d' // Token expires in 1 day
    })

    // Set the JWT token as an HTTP-only Cookie
    res.cookie('jwt', token, {
        httpOnly: true, // Cookie accessible only via HTTP(s)
        secure: process.env.NODE_ENV !== 'development', // Set to secure in production
        sameSite: 'strict', // Ensures cookies are sent only to the same site
        maxAge: 24 * 60 * 60 * 1000 // Max age of the cookie in milliseconds (1 day)
    })
}

export default generateToken