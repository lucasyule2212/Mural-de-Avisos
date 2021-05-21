const express = require("express");
const bodyParser = require("body-parser");
const posts = require("../model/posts");
const router = express.Router();

router.get("/all", (req, res) => {
    res.json(JSON.stringify(posts.getAllPosts()));
  });
  
  router.post("/new", bodyParser.json(), (req, res) => {
    let title = req.body.title;
    let description = req.body.description;
    let date = req.body.date;
    let urgency = req.body.urgency;
    posts.newPost(title, description, date, urgency);
    res.send("Post adicionado!");
  });
  
  /*app.put("/del",(req,res)=>{  IMPLEMENTAR O DELETE DE UM POST 
      posts.deletePost()
  })*/

  module.exports=router;