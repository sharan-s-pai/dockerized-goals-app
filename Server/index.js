const fs = require('fs');
const path = require('path')

const express = require("express");
const Mongoose = require("mongoose");
const bodyParser = require("body-parser");
const morgan = require('morgan');


const Goals = require("./Models/goals");

const app = express();

const accessLogStream = fs.createWriteStream(
    path.join(__dirname, 'logs', 'access.log'),
    { flags: 'a' }
  );
  
app.use(morgan('combined', { stream: accessLogStream }));

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,DELETE,OPTIONS");
  next();
});

app.get("/goals", (req, res, next) => {
  Goals.find()
    .then((goals) => {
      return res.status(200).json({
        goals: goals,
        message: "Success",
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Mongoose Error!!",
      });
    });
});

app.post("/goals", (req, res, next) => {
  const title = req.body.title;
  if (title === "") {
    return res.status(422).json({
      message: "No title error",
    });
  }
  Goals.findOne({
    title: title,
  })
    .then((goal) => {
      if (goal) {
        return res.status(422).json({
          message: "Already exists error",
        });
      }
      const setGoal = new Goals({
        title:title
      });
      return setGoal.save().then((savedGoal) => {
        return res.status(201).json({
          message: "Success",
          goal: savedGoal,
        });
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({
        message: "Mongoose error",
      });
    });
});

app.delete('/goals/:id',(req,res,next)=>{
    const id=req.params.id;
    Goals.findByIdAndDelete(new Mongoose.Types.ObjectId(id))
    .then((goal)=>{
        if(!goal){
          return res.status(422).json({
            message:"No such element exists to delete"
        });  
        }
        return res.status(201).json({
            message:"Deletion Successful"
        });
    })
    .catch((err)=>{
        console.log(err);
        return res.status(500).json({
            message: "Mongoose Error"
        })
    })
})

Mongoose.connect("mongodb://mongodb:27017/goals", (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("MONGODB CONNECTED");
    app.listen(80);
  }
});
