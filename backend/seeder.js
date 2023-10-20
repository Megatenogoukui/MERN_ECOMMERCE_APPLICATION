import mongoose from "mongoose";
import dotenv from 'dotenv';
import dbConnect from './config/db.js';
import users from "./data/user.js";
import products from "./data/products.js";
import User from './models/userModel.js'
import Product from './models/productModel.js'
import Order from './models/orderModel.js'


dotenv.config()

dbConnect()


const importData = async () => {
    try {
        await Order.deleteMany();
        await User.deleteMany();
        await Product.deleteMany();

        const createdUsers = await User.insertMany(users)
        const adminUser = createdUsers[0]._id;

        const sampleProduct = products.map((product) => { 
            return {...product , user : adminUser}
        } );

        await Product.insertMany(sampleProduct)
        console.log("Data Imported !!!")
        process.exit()
    } catch (error) {
        console.log(error.message)
        process.exit()
    }
}


const destroyData = async () => {
    try {
        await Order.deleteMany();
        await User.deleteMany();
        await Product.deleteMany();

       
        console.log("Data Destroyed !!!")
        process.exit()
    } catch (error) {
        console.log(error.message)
        process.exit()
    }
}


if (process.argv[2] === '-d'){
    destroyData()
}else{
    importData()
}