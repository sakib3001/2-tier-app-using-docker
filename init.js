// This init.js  is used for pushing the data to mongodb by a single file without much headache.
const mongoose = require("mongoose");

main()
  .then((result) => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.log("Failled to connect MongoDb");
  });

async function main() {            // Changed for the network purpose
  await mongoose.connect("mongodb://mongoDB:27017/mongoWithExpress");
}

// requiring the chats from the chat.js file
const Chat = require("./models/chat.js");


// All the msg are in the array---> array of documents
let allMsg =[
    {from:"sakib",to:"hiya",msg:"Allah will help",created_at: new Date()},
    {from:"hiya",to:"sakib",msg:"Ho Allah Vorosha",created_at: new Date()},
    {from:"jony",to:"sakib",msg:"kirom asos bondhu",created_at: new Date()},
    {from:"sakib",to:"jony",msg:"Alhamdulillah Bndhu",created_at: new Date()},
    {from:"nirob",to:"sakib",msg:"vaw ki miya",created_at: new Date()},
    {from:"sanim",to:"tanim",msg:"colo vayya phulpur jai",created_at: new Date()}
]

// inserting the allMsg to the database
Chat.insertMany(allMsg).then((result)=>{
    console.log(result);
});
