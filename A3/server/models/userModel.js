const mongoose = require('mongoose');

// create schema
const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            unique: true,
            required: [true, 'Please add a name value'],
        },
        password: {
            type: String,
            required: [true, 'Please add a password'],
        },
    },
    {
        timestamps: true,
    }
);

// NOTE: methods must be added to the schema before compiling it with mongoose.model()
userSchema.methods.speak = function speak() {
    console.log(`I am a user named ${this.name}`);
}

// create model
// The first argument is the singular name of the collection your model is for
const User = mongoose.model('User', userSchema);

module.exports = User;