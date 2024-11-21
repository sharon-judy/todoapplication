const express = require("express")

const mongoose = require('mongoose')

const app = express()

//mongodb conect
mongoose.connect("mongodb://127.0.0.1:27017/todo_express")
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("Failed to connect to MongoDB", err));



//middlewares

app.use(express.urlencoded({ extended: true}));

app.use(express.static("public"));

app.set("view engine", "ejs");


//routes

app.use(require("./routes/index"))

app.use(require("./routes/todo"))

// Server configuration

const PORT = 3000; // Ensure PORT is defined
app.listen(PORT, () => {
    console.log(`Server started listening on port ${PORT}`);
});



