const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const Schema = mongoose.Schema;

const adminSchema = new Schema({
  name: {
    type: String,
    required: true, 
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  }
});


adminSchema.statics.adminLogin = async function (email, password) {
    if (!email || !password) {
        throw Error("All fields are required");
    }

    const admin = await this.findOne({ email });

    if (!admin) {
        throw Error('Incorrect email');
    }

    const match = await bcrypt.compare(password, admin.password); // Fixed bcrypt.compare

    if (!match) {
        throw Error('Incorrect password');
    }

    return admin;
};


module.exports = mongoose.model('Admin', adminSchema);
