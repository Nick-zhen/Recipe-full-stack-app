const mongoose = require('mongoose');

// create schema
const recipeSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please add a name value'],
        },
        ingredients: {
            type: String,
            required: [true, 'Please add a ingredients value'],
        },
        steps: {
            type: String,
            required: [true, 'Please add a steps value'],
        },
        likes: {
            type: Number
        },
        date: {
            type: Date
        },
    },
    {
        timestamps: true,
    }
);

// NOTE: methods must be added to the schema before compiling it with mongoose.model()
recipeSchema.methods.speak = function speak() {
    console.log(`I am a recipe named ${this.name}`);
}

// create model
// The first argument is the singular name of the collection your model is for
const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;