const express = require("express");
const app = express();
const port = 8080;
let Chat = require("./models/chat");
const path = require("path");
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const methodOverride = require("method-override");
app.use(methodOverride("_method"));


// This is used for the public folder access.
app.use(express.static(path.join(__dirname,"public")));

const mongoose = require("mongoose");

main()
  .then((result) => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.log("Failled to connect MongoDb");
  });

  async function main(){
  await mongoose.connect("mongodb://mongoDB:27017/mongoWithExpress")
  };


app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

app.get("/", (req, res) => {
  console.log("Request Has Come");
  res.send("Root is working");
});

// Index Show all chats route --> /chats
app.get("/chat", async (req,res)=>{
    // res.send("All chats are showing");
    let chats = await Chat.find();
    res.render("chat.ejs",{chats});
    // {} er mazhe send kora lagbe mone rekho always
    
    
});

// for creating a  new message
app.get("/chat/new",(req,res)=>{
        res.render("newMsg.ejs");
})


// for parsing the data
app.use(express.urlencoded({extended: true}));

// for the post message
app.post("/chat",(req,res)=>{

  
  
  // taking the things from the body
  let {from,to,msg} = req.body;



  // creating a new chat
  let newChat = new Chat({
    from: from,
    to: to,
    msg: msg,
    created_at: new Date()
  });


  //Saving the newChat -------> Save then valo mote dekhe rakho
  newChat.save().then(()=>{
    res.redirect("/chat")
  }).catch((err)=>console.log(err))

});


// Request for the edit form
app.get("/chat/:id/edit",async (req,res)=>{
  let {id} = req.params;
  let chat = await Chat.findById(id);
  res.render("edit.ejs",{chat});   
})


// update route
app.put("/chat/:id",async (req,res)=>{
  let {id} = req.params;

  // Eine ektu jhamela ache dekhe niyo buzso!!!
  let {msg: editedMsg} = req.body;
  let updatedMsg = await Chat.findByIdAndUpdate(id,{msg:editedMsg},{new: true},{runValidators: true});
  res.redirect("/chat");

});


// For the Deleting Purpose We Can Use This.
app.delete("/chat/:id",async (req,res)=>{
    let {id} = req.params;
    await Chat.findByIdAndDelete(id,{new: true}).then(()=>{
      res.redirect("/chat");
    }).catch((err)=>console.log(err));
});