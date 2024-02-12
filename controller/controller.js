let mongodb = require('mongodb');
let {MongoClient} = require('mongodb');

let mongoUrl = `mongodb://127.0.0.1:27017/`;

let client = new MongoClient(mongoUrl);

async function dbConnection() {
    try{
        let res = await client.connect();
        console.log("Database Connected Successfully...")
    }catch(err){
        console.log("Error While Database Connecting...")
    }
}

let db = client.db('zomato');


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


async function postData (collectionName, data){

    let output;

    try{
        output = await db.collection(collectionName).insertOne(data);
    }catch(err){
        output = {"Error" : "Error while posting data"}
    }
    
    return output;

}



module.exports = {dbConnection, getData, postData};