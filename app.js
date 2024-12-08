const express = require("express");
const app = express();

// Middleware and routes
app.use(require("./routes/index"));
app.use(require("./routes/todo"));

// Export the app for testing
module.exports = app;

// Start the server only when running the app directly (not in tests)
if (require.main === module) {
  app.listen(3000, () => console.log("Server started listening on port 3000"));
}










// const express = require("express")

// const mongoose = require('mongoose')

// const app = express()

// //mongodb conect
// mongoose.connect("mongodb://127.0.0.1:27017/todo_express")
//   .then(() => console.log("Connected to MongoDB"))
//   .catch(err => console.error("Failed to connect to MongoDB", err));



// //middlewares

// app.use(express.json()); // For parsing application/json
// app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded

// app.use(express.static("public"));

// app.set("view engine", "ejs");


// //routes

// app.use(require("./routes/index"))

// app.use(require("./routes/todo"))

// // Server configuration

// const PORT = 3000; // Ensure PORT is defined
// app.listen(PORT, () => {
//     console.log(`Server started listening on port ${PORT}`);
// });



