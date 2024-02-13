let mongodb = require('mongodb');
let {MongoClient} = require('mongodb');

// let mongoUrl = `mongodb://127.0.0.1:27017/`;
let mongoUrl = `mongodb+srv://rushikeshingale7447:nxuAikDE0tzaQ024@cluster0.dnwndyi.mongodb.net/`

let client = new MongoClient(mongoUrl);

// Database Connection -: 
async function dbConnection() {
    try{
        let res = await client.connect();
        console.log("Database Connected Successfully...")
    }catch(err){
        console.log("Error While Database Connecting...")
    }
}

// Database Name -: 
let db = client.db('zomato');


//GET
async function getData(collectionName, query){

    let output = [];

    try{
        const cursor = db.collection(collectionName).find(query)
        for await(const data of cursor){
            output.push(data);
        }
       cursor.closed()

    }catch(err){
        output.push({"Error" : "Error While Getting Data"},err)
    }

    return output;
}

// POST 
async function postData (collectionName, data){

    let output;

    try{
        output = await db.collection(collectionName).insertOne(data);
    }catch(err){
        output = {"Error" : "Error while posting data"}
    }
    
    return output;

}

//UPDATE
async function updateOrder (collectionName, condition, data){
    let output;

    try{
        output = await db.collection(collectionName).updateOne(condition,data);
    }catch(err){
        output = {"Error":"Error While Updating the data..."}
    }

    return output;

}

//DELETE
async function deleteOrder (collectionName, condition){
    let output;
    try{
        output = await db.collection(collectionName).deleteOne(condition);
    }catch(err){
        output = {"Error" : "Error While Deleting the data"}
    }

    return output;
}

module.exports = {dbConnection, getData, postData, updateOrder, deleteOrder};