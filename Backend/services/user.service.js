const userModel = require('../models/user.Model');

module.exports.createUser = async ({
    firstname, lastname, email, password
}) => {
    if (!firstname || !lastname || !email || !password) {
        return res.status(422).json({ message: 'All fields are required' });
    }

    const user = userModel.create({
        name: {
            firstname,
            lastname
        },
        email,
        password
    });

    return user;
}