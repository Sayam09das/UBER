const userModel = require('../models/user.Model');


module.exports.createUser = async ({
    firstname,lastname,email,password
}) => {
    if(!firstname || !lastname || !email || !password){
        throw new Error('All Fields are Required');
    }
    const user = userModel.create({
        name:{
            firstname,
            lastname
        },
        email,
        password
    });

    return user;
}