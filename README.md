# CPSC455
## Assignment 1
HTML CSS Javascript

## Assignemnt 2
react and redux. <br>
<img width="707" alt="image" src="https://user-images.githubusercontent.com/62523802/171064730-98a87113-7c70-4a61-a219-7feed848b7ed.png">

[workshop2 slides](https://docs.google.com/presentation/d/1vabQ--b47LfViCE_M421qFXsqz3qUL9K3wJ43gI8XvM/edit#slide=id.p) <br><br>
Resource:
- [X] [List and Keys](https://reactjs.org/docs/lists-and-keys.html)<br>
- [X] [form, input elements](https://reactjs.org/docs/forms.html#controlled-components)<br>
- [ ] [W3School](https://www.w3schools.com/react/default.asp)<br>
- [ ] [useSelector and useDispatch with Redux](https://medium.com/@mendes.develop/introduction-on-react-redux-using-hooks-useselector-usedispatch-ef843f1c2561)<br>
- [X] [add/delete counter example](https://levelup.gitconnected.com/react-redux-hooks-useselector-and-usedispatch-f7d8c7f75cdd)<br>
- [ ] [another example](https://scriptverse.academy/tutorials/reactjs-useselector-usedispatch.html)<br>
- [X] [Start the assignment!](https://reactjs.org/docs/create-a-new-react-app.html#create-react-app)<br>
- [X] [react add lists](https://www.robinwieruch.de/react-add-item-to-list/)<br>
- [X] [redux awesome tutorial!](https://www.youtube.com/watch?v=k68j9xlbHHk)<br>
- [X] [Pop up awesome tutorial](https://www.youtube.com/watch?v=i8fAO_zyFAM)<br>
- [ ] [To do list for advanced project](https://www.youtube.com/watch?v=TZ933D_RB8E)

## Assignemnt 3
Im this assignemnt, I used toolkit to create reducer instead of using tradiationl reducer.
```js
import { createSlice } from '@reduxjs/toolkit';
import { REQUEST_STATE } from "../utils";
import { getRecipesAsync, addRecipeAsync, deleteRecipeAsync, updateRecipeAsync } from './thunks';

const INITIAL_STATE = {
    recipeList: [],
    getRecipes: REQUEST_STATE.IDLE,
    addRecipe: REQUEST_STATE.IDLE,
    deleteRecipe: REQUEST_STATE.IDLE,
    updateRecipe: REQUEST_STATE.IDLE,
    error: null
};

const recipesSlice = createSlice({
    name: 'recipes',
    initialState: INITIAL_STATE,
    reducer: {},
    extraReducers: (builder) => {
        builder
            .addCase(getRecipesAsync.pending, (state) => {
                state.getRecipes = REQUEST_STATE.PENDING;
                state.error = null;
            })
            .addCase(getRecipesAsync.fulfilled, (state, action) => {
                state.getRecipes = REQUEST_STATE.FULFILLED;
                state.recipeList = action.payload;
            })
            .addCase(getRecipesAsync.rejected, (state, action) => {
                state.getRecipes = REQUEST_STATE.REJECTED;
                state.error = action.error;
            })
    }
});

export default recipesSlice.reducer;
```
And then create thunks to call fetch REST APIs <br>
```js
import { createAsyncThunk } from "@reduxjs/toolkit";
import { actionTypes } from "./actionTypes";

export const getRecipesAsync = createAsyncThunk(
    actionTypes.GET_RECIPES,
    async () => {
        return await RecipeService.getRecipes();
    }
);

const getRecipes = async () => {
    const response = await fetch('http://localhost:3001/recipes', {
        method: 'GET'
    });
    // console.log(response.json());
    return response.json();
};

const addRecipe = async (recipe) => {
    console.log(recipe);
    const response = await fetch('http://localhost:3001/recipes', {
       method: 'POST',
       headers: {
        'Content-Type': 'application/json'
       },
       body: JSON.stringify(recipe) 
    });

    const data = await response.json();
    console.log(data);
    if (!response.ok) {
        const errorMsg = data?.message;
        throw new Error(errorMsg)
    }
    
    return data;
};
```
Once the page was been loaded, I will dispatch the "action" in the react component. <br>
```js
useEffect(() => {
    dispatch(getRecipesAsync());
}, [dispatch]);
```
In the server side, I use "express" and routes. Example:
```js
const express = require('express');
const router = express.Router();

router.get('/', function (req, res, next) {
    return res.send(recipeList);
});

// create recipe
router.post('/', function (req, res, next) {
    if (!req.body.name) {
        return res.status(400).send({ message: 'Recipe must have a name!' })
    } else if (!req.body.ingredients) {
        return res.status(400).send({ message: 'Recipe must have ingredients!' })
    } else if (!req.body.steps) {
        return res.status(400).send({ message: 'Recipe must have steps!' })
    }
    const recipe = { id: uuid(), name: req.body.name, ingredients: req.body.ingredients, steps: req.body.steps };
    recipeList.push(recipe);
    console.log(recipe);
    return res.send(recipe);
});
```
In summary, the main page dispatch action when redered, the action call fetch REST APIs which I implemented in server side. Then the action will return result which is res.send(recipe) to reducer. The reducer will change the state in store in redux.<br>
Note: The response body of such a request should be the result of that operation - the entities that have been successfully created. To return the whole list is simply not standard. Imagine you have thousands of recipes. If you POST one recipe, do you want to get the whole list back? This requires extra memory resources and potentially computational resources to handle in your server. If you can't return the whole list because the response body would be bigger than what you can handle (ex AWS ELB has a 1MB response size limit), how do you decide what to return?
Now client side, computations within the app aren't as expensive. The code is all there and manipulating what you have probably isn't too difficult. But making an API call can be expensive. What if your app is primarily used on mobile? Will your users be happy if you're eating all their mobile data making a bunch of API requests? Probably not. It'll probably also take longer to return a whole list with your API call than returning just the new entities.
<br>
node.js <br>
<img width="813" alt="image" src="https://user-images.githubusercontent.com/62523802/173720216-7b81ae76-9a23-4d4b-b163-1337cf2418ae.png"><br>
- [X] [workshop3 slides](https://docs.google.com/presentation/d/1JHzzo3aqUgRyKt3G_8jHLoAifcG1RUEGoHeVsV6_9co/edit#slide=id.gf427ff1563_0_22)<br>
- [ ] [How to build a REST API with Node js & Express](https://www.youtube.com/watch?v=pKd0Rpw7O48)<br>
- [X] [node.js tutorial](https://www.youtube.com/watch?v=fBNz5xF-Kx4)<br>
- [X] [Express JS Crash Course](https://www.youtube.com/watch?v=L72fhGm1tfE&t=1s)<br>
- [ ] [Express tutorial part 2](https://www.youtube.com/watch?v=KyWaXA_NvT0)<br>
- [ ] [express and js 35 minute](https://www.youtube.com/watch?v=SccSCuHhOw0)<br>
- [ ] [redux and express](https://medium.com/walmartglobaltech/creating-react-redux-express-full-stack-application-part-i-82959d847802)<br>
- [ ] [redux, middleware and thunks](https://www.youtube.com/watch?v=qA6oyQQTJ3I)<br>
- [ ] [redux toolkit(used this in asm)](https://redux-toolkit.js.org/api/createAsyncThunk)<br>


## Assignemnt 4 (mongo DB)
some important mongoshell:
show databases
```shell
[primary] recipeApp> show dbs
recipeApp   56.00 KiB
admin      372.00 KiB
local        1.24 GiB
```

find or show documents
```shell
[primary] recipeApp> db.recipes.find()
[
  {
    _id: ObjectId("62bcc59bc5f03b095d2fca41"),
    id: '0',
    name: 'sushi',
    ingredients: 'meat, rice, shrimp',
    steps: 'take rice, stack the meat, stack the shrimp'
  },
  {
    _id: ObjectId("62bcc59bc5f03b095d2fca42"),
    id: '1',
    name: 'steak',
    ingredients: 'beef',
    steps: 'stack the meat'
  }
]
```
insert or create a document
```shell
[primary] recipeApp> db.recipes.insert({name: "demo"})
{
  acknowledged: true,
  insertedIds: { '0': ObjectId("62bceed9c5f03b095d2fca44") }
}
```

update documents using $set
```shell
[primary] recipeApp> db.recipes.update({id: "1"}, 
...     {
.....         $set: {
.......             like: 0,
.......             date: Date()
.......         }
.....     }
... )
{
  acknowledged: true,
  insertedId: null,
  matchedCount: 1,
  modifiedCount: 1,
  upsertedCount: 0
}
```
update documents using i$nc
```shell
[primary] recipeApp> db.recipes.update({id: "0"}, { $inc: {like: 2}})
{
  acknowledged: true,
  insertedId: null,
  matchedCount: 1,
  modifiedCount: 1,
  upsertedCount: 0
}
```
update all fields using $rename
```shell
[primary] recipeApp> db.recipes.updateMany({},{ $rename: {like: 'likes'}})
{
  acknowledged: true,
  insertedId: null,
  matchedCount: 2,
  modifiedCount: 2,
  upsertedCount: 0
}
```

delete or remove documents
```shell
[primary] recipeApp> db.recipes.remove({name: "demo"})
{ acknowledged: true, deletedCount: 1 }
```
After being familiar with MongoDB using shell. Let's see how we connect our server using mongoose!<br>
First be sure you have MongoDB and Node.js installed.<br>
next install Mongoose form the command line using npm<br>
```shell
$ nom install mongoose --save
```
1. In server side, create a config folder, create a file db.js for set up environment for connecting MongoDB using mongoose<br>
```javascript
const mongoose = require('mongoose');
const connectDB = async () => {
    try {
        // the link inside connect() can be found in MongoDb connection with application
        const conn = await mongoose.connect('mongodb+srv://recipe:recipe@recipecluster.dx8jp.mongodb.net/recipeApp?retryWrites=true&w=majority');

        console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}
module.exports = connectDB;
```
2. Create Recipe Model. creating recipeModel.js file in models folder. <br>
With Mongoose, everything is derived from a Schema. So far we have got a recipeSchema with 5 property. The next step is compiling our schema into a Model.<br>
A model is a class with which we construct documents.<br>
```javascript
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
```
3. In router/recipes.js , we don't need the hard code intial state anymore because we use the data from database.<br>
We will use some mongoose API to fetch, create, update or delete data just like we did in Mongo shell above.<br>
```javascript
const asyncHandler = require('express-async-handler');
const Recipe = require('../models/recipeModel');
```
get one specific recipe using id
```javascript
router.get('/:recipeId',asyncHandler(async function (req, res, next) {
    Recipe.findById(req.params.recipeId, (err, recipe) => {
        if (err) {
            // console.log(err);
            return res.status(404).send({ message: 'recipe not found' });
        } else {
            console.log(recipe);
            return res.json({msg: "get recipe", recipe});
        }
    });
}));
```
create recipe
```javascript
router.post('/',asyncHandler(async function (req, res, next) {
    if (!req.body.name) {
        return res.status(400).send({ message: 'Recipe must have a name!' })
    } else if (!req.body.ingredients) {
        return res.status(400).send({ message: 'Recipe must have ingredients!' })
    } else if (!req.body.steps) {
        return res.status(400).send({ message: 'Recipe must have steps!' })
    }
    const recipe = await Recipe.create({
        name: req.body.name, 
        ingredients: req.body.ingredients, 
        steps: req.body.steps,
        likes: 0,
        date: Date.now(),
    });
    console.log(req.body);
    return res.status(200).send(recipe);
}));
```
update recipe
```javascript
router.put('/:recipeId',asyncHandler(async function (req, res, next) {
    /* 
    we cannot call recipe = await Recipe.findById(, callback), it will cause "MongooseError: 
    Query was already executed:" 
    Mongoose throws a 'Query was already executed' error when a given query is executed twice.
    */
    const recipe = Recipe.findById(req.params.recipeId, async (err, foundRecipe) => {
        if (err) {
            // when the format of input _id is incorrect
            return res.status(404).send({ message: 'recipe not found for update' });
        } else {
            // if _id format is correct but not found, still return a null instead of an error
            if (!foundRecipe) res.status(404).send({ message: 'recipe not found for update' });
            // we can use update but update() doesn't return the updated recipe
            const updRecipe = req.body;
            foundRecipe.name = updRecipe.name ? updRecipe.name : foundRecipe.name; 
            foundRecipe.ingredients = updRecipe.ingredients ? updRecipe.ingredients : foundRecipe.ingredients;
            foundRecipe.steps = updRecipe.steps ? updRecipe.steps : foundRecipe.steps;
            // put likes just for dubug
            foundRecipe.likes = updRecipe.likes ? updRecipe.likes : foundRecipe.likes;
            await foundRecipe.save();

            console.log(foundRecipe);
            return res.status(200).send(foundRecipe);
        }
    });
}));
```
delete recipe
```javascript
router.delete('/:recipeId',asyncHandler(async function (req, res, next) {
    const recipe = Recipe.findById(req.params.recipeId, async (err, foundRecipe) => {
        if (err) {
            // when the format of input _id is incorrect
            return res.status(404).send({ message: 'id incorrect for remove' });
        } else {
            // if _id format is correct but not found, still return a null instead of an error
            if (!foundRecipe) res.status(404).send({ message: 'recipe not found for remove' });
            await foundRecipe.remove();

            console.log(req.params.recipeId);
            return res.status(200).json({_id: req.params.recipeId});
        }
    });
}));
```
That is how we edit our server side for fetching data from database.<br>
```javascript

```

- [X] [mongo DB setup](https://docs.google.com/document/d/1HTjD5jqT3xeIEGqRyy7L38SRGOrjEOoEi_5tp_C5QKI/edit) <br>
- [X] [mongo enviroment set up](https://blog.csdn.net/hzw29106/article/details/109277548)<br>
- [X] [mongodb tutorial for mac](https://www.youtube.com/watch?v=-56x56UppqQ)<br>
- [ ] [mongodb tutorial for windows](https://www.youtube.com/watch?v=pWbMrx5rVBE)<br>
- [ ] [MERN App developemnt](https://www.youtube.com/watch?v=-0exw-9YJBo)<br>

