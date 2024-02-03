const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const { isEmail } = require('validator')

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "First name is required"]
    },
    lastName: {
        type: String,
        required: [true, "Last name is required"]
    },
    email: {
        type: String,
        required: [true, "Email is required"]
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [8, "Password must be 8 characters or longer"]
    }
}, {timestamps: true})

// add this after UserSchema is defined
UserSchema.virtual('confirmPassword')
    .get(function () { 
        return this._confirmPassword
    })
    .set(function (value) {
        this._confirmPassword = value
    })

UserSchema.pre('validate', function (next) {
    if (this.password !== this._confirmPassword) {
        this.invalidate('confirmPassword', 'Password must match')
    }
    next()
})

UserSchema.pre('save', function (next) {
    bcrypt.hash(this.password, 10)
        .then(hash => {
            this.password = hash 
            next()
        })
        .catch(err => next(err))
}) 

module.exports = mongoose.model("User", UserSchema)