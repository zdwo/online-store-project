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

userSchema.pre('findByIdAndUpdate', async function () {
    let update = {...this.getUpdate()};
  
    // Only run this function if password was modified
    if (update.password){
  
    // Hash the password
    const salt = genSaltSync();
    update.password = await hash(this.getUpdate().password, salt);
    this.setUpdate(update);
    }
  })

const User = model('User', userSchema)

module.exports = User
