const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs')

const userSchema = new Schema({
  email: { type: String, required: true},
  password: { type: String, required: true }
});

userSchema.statics.findUser = async function (email, password) {
    const user = await User.findOne({email})
    if (!user) {
        return
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
        return
    }
    return user
}

userSchema.pre('save', async function(next) {
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})

const User = model('User', userSchema)

module.exports = User
