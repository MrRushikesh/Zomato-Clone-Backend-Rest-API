let express = require('express');
let app = express();
let port = 5000;
let bodyPareser = require('body-parser');
const cors = require('cors');

const {dbConnection, getData, postData} = require('./controller/controller.js');
const Mongo = require('mongodb');




app.get('/', (req,res) => {
    res.send("<h1>Hello From REST API");
})

// http://localhost:5000/location

app.get('/location', async(req,res) => {
    // db.location.find({}).pretty().count()
    let query = {}
    let collection = "location"
    let output = await getData(collection, query)
    res.send(output)
})



// http://localhost:5000/mealType

app.get('/mealType', async(req,res) => {
    //  db.mealType.find({}).pretty().count()
    let query = {}
    let collection = "mealType"
    let output = await getData(collection, query);
    res.send(output);
})


// http://localhost:5000/restaurants?stateId=1&mealId=2
// http://localhost:5000/restaurants?stateId=4
// http://localhost:5000/restaurants?mealId=3
// http://localhost:5000/restaurants

app.get('/restaurants', async(req,res) => {
    let query = {}

    if(req.query.stateId && req.query.mealId){
        // http://localhost:5000/restaurants?stateId=1&mealId=2
        // db.restaurants.find({"state_id":1, "mealTypes.mealtype_id":1})
        query = {"state_id": Number(req.query.stateId), "mealTypes.mealtype_id": Number(req.query.mealId)};
    }else if(req.query.stateId){
        // http://localhost:5000/restaurants?stateId=4
        // db.restaurants.find({"state_id":3}).pretty()
        query = {"state_id" : Number(req.query.stateId)};
    }else if(req.query.mealId){
        // http://localhost:5000/restaurants?mealId=3
        // db.restaurants.find({"mealTypes.mealtype_id" : 3})
        query = {"mealTypes.mealtype_id" : Number(req.query.mealId)};
    }else{
        // http://localhost:5000/restaurants
        // db.restaurants.find({}).pretty().count()
        query = {}
    }

    let collection = 'restaurants'
    let output = await getData(collection, query);
    res.send(output);
})


// http://localhost:5000/filter/2?cuisineId=4
// http://localhost:5000/filter/1?lcost=500&hcost=1000
// http://localhost:5000/filter/1
app.get('/filter/:mealId', async(req,res) => {
    let mealId = Number(req.params.mealId);  //after slash (/:mealId) is called params

    let cuisineId = Number( req.query.cuisineId); //after question mark (?) is called as query params
    let lcost = Number(req.query.lcost);
    let hcost = Number(req.query.hcost);

    let query = {}

    if(cuisineId){
        // http://localhost:5000/filter/2?cuisineId=4
        // db.restaurants.find({"mealTypes.mealtype_id" : 1, "cuisines.cuisine_id":1}).pretty();
        query = {"mealTypes.mealtype_id" : mealId, "cuisines.cuisine_id": cuisineId}
    }else if(lcost && hcost){
        // http://localhost:5000/filter/1?lcost=500&hcost=1000
        // db.restaurants.find({"mealTypes.mealtype_id":1, $and:[{cost:{$gt:500,$lt:1000}}]}).count()
        query = {"mealTypes.mealtype_id":mealId, $and:[{cost : {$gt:lcost, $lt:hcost}}]}
    }else{
        // http://localhost:5000/filter/1
        // db.restaurants.find().pretty().count()
        query = {}
    }

    let collection = "restaurants";
    let output = await getData(collection,query);
    res.send(output);
})

//MONGO DB.ObjectId -: 

// // http://localhost:5000/details/65c9b0a31fa17e0841e1dc53
// app.get('/details/:id', async(req,res) => {
//     let id = new Mongo.ObjectId(req.params.id);
//     // http://localhost:5000/details/65c9b0a31fa17e0841e1dc55
//     // db.restaurants.find({_id: ObjectId("65c9b0a31fa17e0841e1dc56")}).pretty()
//     let query = {_id:id}
//     let collection = "restaurants"
//     let output = await getData(collection, query);
//     res.send(output)
// })


// http://localhost:5000/details/11
app.get('/details/:id', async(req, res) => {
    let id = Number(req.params.id);
    // http://localhost:5000/details/12
    // db.restaurants.find({restaurant_id: 11}).pretty()
    let query = {restaurant_id : id}
    let collection = "restaurants";
    let output = await getData(collection, query);
    res.send(output);
})


// Orders -: 
app.get('/orders', async(req, res) => {
    let query = {}
    if(req.query.email){
        // http://localhost:5000/orders?email=rushi@gmail.com
        // db.orders.find({email:"rushi@gmail.com"})
        query = {email : req.query.email}
    }else{
        query = {}
    }
    let collection = "orders";
    let output = await getData(collection, query);
    res.send(output);
})


app.listen(port, (err) => {
    //database Connection 
    dbConnection();
    if(err) throw console.log("Error While Database Connecting...",err)
    console.log(`Server is running on ${port} number.`);
})
