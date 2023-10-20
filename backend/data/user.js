import bcrypt from 'bcryptjs'


const users = [
    {
        name : "Abhishek",
        email : "abhishek@gmail",
        password : bcrypt.hashSync('12345' , 10),
        isAdmin : true
    },
    {
        name : "Goku",
        email : "Goku@gmail",
        password : bcrypt.hashSync('12345' , 10),
        isAdmin : false
    },
    {
        name : "Ganduu",
        email : "Ganduu@gmail",
        password : bcrypt.hashSync('12345' , 10),
        isAdmin : false
    },
]


export default users