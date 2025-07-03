const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({ 
    name: String,
    age: Number,
    address: String
});

const userSchemaModel = mongoose.model('User', userSchema);

module.exports = userSchemaModel

