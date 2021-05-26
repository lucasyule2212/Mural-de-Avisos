const express = require("express");
const bodyParser = require("body-parser");
const posts = require("../model/posts");
const router = express.Router();
const cors = require("cors");

const options={
  origin:"http://localhost:3000"
}
router.use(cors(options));

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
  

  router.delete("/del",bodyParser.json(),(req,res)=>{  
      let id = req.body.id;
      posts.deletePost(id);
      res.send("Post deletado!");
  })

  module.exports=router;