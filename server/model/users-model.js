const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    }
});

userSchema.pre("save", async function () {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt)
})

userSchema.statics.login = async function (email, password) {
    const user = await this.findOne({email});
    if (user) {
        const auth = await bcrypt.compare(password, user.password);
        if (auth) return user;
        throw new Error('incorrect password')
    }
    throw new Error('incorrect email')
}

module.exports = mongoose.model('Users', userSchema);