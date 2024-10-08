// requie mongodb class

const {MongoClient} = require('mongodb');

const getMongoDBConnection = async () =>{
    try {
        // required mongodb url and database name
        const dburl = "mongodb://127.0.0.1:27017/hotels";
        
        const client = await  MongoClient.connect(dburl);
        return client.db();
    } catch (error) {
        throw error;
    }
    
}

module.exports = {
    getMongoDBConnection
}