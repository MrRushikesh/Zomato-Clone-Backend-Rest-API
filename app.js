let express = require('express');
let app = express();
let port = 5000;
let bodyPareser = require('body-parser');
const cors = require('cors');

const {dbConnection, getData, postData, updateOrder, deleteOrder} = require('./controller/controller.js');
const Mongo = require('mongodb');


//Middleware
app.use(bodyPareser.json()); //When you pass data from body then you must required this package. 
app.use(bodyPareser.urlencoded({extended:true}));
app.use(cors());



app.get('/', (req,res) => {
    res.send("<h1>Hello From REST API");
})

// http://localhost:5000/location
// https://zomato-rest-api.onrender.com/location

app.get('/location', async(req,res) => {
    // db.location.find({}).pretty().count()
    let query = {}
    let collection = "location"
    let output = await getData(collection, query)
    res.send(output)
})



// http://localhost:5000/mealType
// https://zomato-rest-api.onrender.com/mealType

app.get('/mealType', async(req,res) => {
    //  db.mealType.find({}).pretty().count()
    let query = {}
    let collection = "mealType"
    let output = await getData(collection, query);
    res.send(output);
})


// http://localhost:5000/restaurants?stateId=1&mealId=2
// https://zomato-rest-api.onrender.com/restaurants?stateId=1&mealId=2

// http://localhost:5000/restaurants?stateId=4
// https://zomato-rest-api.onrender.com/restaurants?stateId=4

// http://localhost:5000/restaurants?mealId=3
// https://zomato-rest-api.onrender.com/restaurants?mealId=3

// http://localhost:5000/restaurants
// https://zomato-rest-api.onrender.com/restaurants

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
// https://zomato-rest-api.onrender.com/filter/2?cuisineId=4

// http://localhost:5000/filter/1?lcost=500&hcost=1000
// https://zomato-rest-api.onrender.com/filter/1?lcost=500&hcost=1000

// http://localhost:5000/filter/1
// https://zomato-rest-api.onrender.com/filter/1
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
// // https://zomato-rest-api.onrender.com/details/65c9b0a31fa17e0841e1dc53

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
// https://zomato-rest-api.onrender.com/details/11

app.get('/details/:id', async(req, res) => {
    let id = Number(req.params.id);
    // http://localhost:5000/details/12
    // db.restaurants.find({restaurant_id: 11}).pretty()
    let query = {restaurant_id : id}
    let collection = "restaurants";
    let output = await getData(collection, query);
    res.send(output);
})


//  http://localhost:5000/menu/5
//  https://zomato-rest-api.onrender.com/menu/5
app.get('/menu/:id', async(req,res) => {
    let id = Number(req.params.id);
    let query = {restaurant_id : id};
    let collection = "menu";
    let output = await getData(collection, query);
    res.send(output);
})


// Orders -: 
// http://localhost:5000/orders?email=rushi@gmail.com
// https://zomato-rest-api.onrender.com/orders?email=anchal@gmail.com
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


// //When you pass data from body then you must required this package. 
// app.use(bodyPareser.json()); 
// app.use(bodyPareser.urlencoded({extended:true}));

//POST :  http://localhost:5000/placeOrder
//POST : https://zomato-rest-api.onrender.com/placeOrder

// BODY -> raw -> JSON -> 
// { 
//     "name" : "rushi", 
//     "email" : "rushi@gmail.com", 
//     "address" : "home 65", 
//     "phone" : 7447640893, 
//     "cost" : 612, 
//     "menuItem" : [ 45, 34, 41 ], 
//     "status" : "Delivered" 
// }
app.post('/placeOrder', async(req,res) => {
    let data = req.body;
    let collection = "orders"
    let response = await postData(collection, data);
    res.send(response);
})


// POST : http://localhost:5000/menuDetails
// POST : https://zomato-rest-api.onrender.com/menuDetails
// BODY -> raw -> JSON -> 
// {
//     "id":[4,8,21,9]
// }
app.post('/menuDetails', async(req, res) => {
    if(Array.isArray(req.body.id)){
        let query = {menu_id:{$in:req.body.id}}
        let collection = 'menu';
        let output = await getData(collection,query);
        res.send(output)
    }else{
        res.send("Plase pass data in form of array...")
    }
})


//PUT : http://localhost:5000/updateOrder
//PUT :  https://zomato-rest-api.onrender.com/updateOrder
//BODY -> raw -> JSON -> 
// { 
//     "_id":"65c9fff803a710300c651772", 
//     "status":"Out for delivery"
// }
app.put('/updateOrder', async(req,res) => {
    let collection = 'orders';
    let condition = {"_id": new Mongo.ObjectId(req.body._id)}
    let data = {
        $set:{
            "status" : req.body.status
        }
    }
    let output = await updateOrder(collection, condition, data);
    res.send(output);
})


// DELETE :  http://localhost:5000/deleteOrder
// DELETE : https://zomato-rest-api.onrender.com/deleteOrder

// BODY -> raw -> JSON ->
// {
//     "_id" : "65c9fff803a710300c651772"
// } 
app.delete('/deleteOrder', async(req, res) => {
    let collection = 'orders';
    let condition = {"_id": new Mongo.ObjectId(req.body._id)}
    let output = await deleteOrder(collection, condition);
    res.send(output);
})


// Server & Database Connection
app.listen(port, (err) => {
    //database Connection 
    dbConnection();
    if(err) throw console.log("Error While Database Connecting...",err)
    console.log(`Server is running on ${port} number.`);
})
