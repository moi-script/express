


import { MongoClient } from 'mongodb';

const uri = 'mongodb://localhost:27017';

const client = new MongoClient(uri);

export default async function connectDB(){
    try {
        await client.connect();

        console.log('Connected to Mongo DB');

        const db = client.db('testmongoDB');
        return db;
    } catch(err) {
        console.log('Connection error :: ', err);
    }
}


// await connectDB();
