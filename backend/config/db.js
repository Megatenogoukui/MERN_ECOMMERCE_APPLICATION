import mongoose from 'mongoose'

const dbConnect = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGODB_URI)
        console.log(`MONGODB CONNECTED AT : ${connect.connection.host}`)
    } catch (error) {
        console.log(`ERROR : ${error.message}` )
        process.exit(1)
    }
}

export default dbConnect;