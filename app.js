
const express = require("express");

const bodyParser = require("body-parser");

const app = express();

const date = require(__dirname + "/date.js");

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

var newItems = [];

let workItems = [];

app.set("view engine", "ejs");

app.get("/", function (req, res) {
   let today = date.getDay();

    res.render("list", { listTitle: today, newItems: newItems })

});

app.post("/", function (req, res) {
    var newItem = req.body.newItem;

    if(req.body.list === "Work"){
        let item = req.body.newItem;
        workItems.push(item);
        res.redirect("/work"); 
    }else{
        newItems.push(newItem); 
        res.redirect("/"); 
    }


    // newItems.push(newItem);
    // res.redirect("/");


    console.log(newItem);

});

app.get("/work", function(re,res){
    res.render("list",{listTitle:"Work List",  newItems: workItems});
});

app.post("/work",function(req,res){
    let item = req.body.newItem;
    workItems.push(item);
    res.redirect("/work");
});

app.get("/about",function(req,res){
    res.render("about");
});








app.listen(3000, function () {
    console.log("Server is running on port 3000");
});