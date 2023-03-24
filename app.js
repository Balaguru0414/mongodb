// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%| MONGOOSE |%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/fruitDB',{useNewUrlParser : true});

//========== Create ==========

const fruitSchema = new mongoose.Schema({
  name : {
    type : String,
    required : [true, 'Please check your data entry, no name specified!']
  },
  rating : {
    type : Number,
    min : 1,
    max : 10
  } ,
  review : {
    type : String,
    required : [true, 'Please check your data entry, no review specified!']
  }
})

const Fruit = mongoose.model('Fruit',fruitSchema);

//========== Insert ==========

const fruit = new Fruit({
  name : 'Apple',
  rating : 7,
  review : 'Awesome Apple'
});

// --- New insert
const pineApple = new Fruit({
  name : 'Pine Apple',
  rating : 7,
  review : 'Great fruit'
})
// pineApple.save();


// fruit.save();

const personSchema = new mongoose.Schema({
  name : String,
  age : Number,
  favoriteFruit : fruitSchema
});

const Person  = mongoose.model('Person',personSchema);

// const person = new Person({
//   name : 'Balaguru',
//   age : 23
// });

// --- New insert
const mango = new Fruit({
  name : 'Mango',
  rating : 7,
  review : 'Very Sweet'
});
// mango.save();

Person.updateOne({name : 'Balaguru'},{favoriteFruit : mango},err => {
  if (err) console.log(err);
  else console.log('Successfully Update');
});

// --- New insert
const person = new Person({
  name : 'Surya',
  age : 25,
  favoriteFruit : pineApple
});

// person.save();
/*
const kiwi = new Fruit({
  name : 'kiwi',
  rating : 5,
  review : 'best fruit Kiwi'
});

const orange = new Fruit({
  name : 'Orange',
  rating : 6,
  review : 'Sour Orange'
});

const banana = new Fruit({
  name : 'Banana',
  rating : 10,
  review : 'My favorite fruit Banana'
});

Fruit.insertMany([kiwi,orange,banana],(err) => {
  if (err) console.log(err);
  else console.log('Successfully saved all the Fruit to fruitDB');
});
*/
//========== Find - READ ==========

Fruit.find((err,fruits) => {
  if (err) console.log(err);
  else fruits.forEach(fruit => fruit.name) 
});

//========== Update ==========
// const fruit = new Fruit({
//   rating : 7,
//   review : 'Awesome grapes'
// });

Fruit.updateOne({_id : ''},{name : 'Grapes'},err => {
  if (err) console.log(err);
  else console.log('Successfully Update');
});

//========== Delete ==========

// --- | deleteOne |
Fruit.deleteOne({name : 'Grapes'},err => {
  if (err) console.log(err);
  else console.log('Successfully Delete');
});

// --- | deleteMany |

Fruit.deleteOne({name : 'Grapes'},err => {
  if (err) console.log(err);
  else console.log('Successfully Delete');
});


// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%| Native - Node.js | OLD VERSION |%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

//========== Create ==========

/*const { MongoClient } = require("mongodb");
const assert = require("assert");

// Connection URL
const url = `mongodb://localhost:27017`;

// dataBase Name
const dbName = 'fruitDB';

// Create new MongoClient
const client = new MongoClient(url,{useNewUrlParser : true});

// Use connect method to connect to the server
client.connect(function (err) {
  assert.equal(null, err);
  console.log('Connected successfully to server');

  const db = client.db(dbName);

  // client.close();

  // after 
  findDocuments(db, function () {
    client.close();
  })
});

//========== Insert ==========

const insertDocuments = function (db, callback) {
  // get the documents collections
  const collection = db.collection('fruit');
  // insert some documents
  collection.insertMany([
    {
      name : 'Apple',
      score : 8,
      review : 'Great Fruit'
    },
    {
      name : 'Orange',
      score : 6,
      review : 'Kinda sour'
    },
    {
      name : 'Banana',
      score : 9,
      review : 'Great stuff'
    }
  ],function (err, result) {
    assert.equal(err,null);
    assert.equal(3,result.result.n);
    assert.equal(3,result.ops.length);
    console.log('Inserted 3 documents into the collection');
    callback(result);
  });  
};

//========== Find - READ ==========

const findDocuments = function (db, callback) {
  // get the documents collections
  const collection = db.collection('fruit');
  // find some documents
  collection.find({}).toArray(function(err, fruits) {
    assert.equal(err,null);
    console.log('Found The Following Records');
    console.log(fruits);
    callback(fruits);
  });  
};*/

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%| Native - Node.js | NEW VERSION |%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

/*
const { MongoClient } = require("mongodb");

// Replace the uri string with your connection string.

const url = 'mongodb+srv://Balaguru0414:Bala0414@@cluster0.yc09jdi.mongodb.net/?retryWrites=true&w=majority'
const uri = `<${url}>`;

const client = new MongoClient(uri);

async function run() {
  try {
    const database = client.db('sample_mflix');
    const movies = database.collection('movies');

    // Query for a movie that has the title 'Back to the Future'
    const query = { title: 'Back to the Future' };
    const movie = await movies.findOne(query);

    console.log(movie);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
*/