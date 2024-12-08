const router = require('express').Router();

const Todo = require("../models/Todo");

//routes

router.post("/add/todo", (req, res) => {
    const { todo } = req.body; 
  
    const newTodo = new Todo({ todo });
  
    // Save the todo
    newTodo
      .save()
      .then(() => {
        console.log("Successfully added todo!!");
        res.redirect("/");
      })
      .catch((err) => {
        console.error('Error while adding todo:', err);  // Add error logging here
        res.status(500).send('Error adding todo');
      })
  })
  

.get("/delete/todo/:_id", (req,res)=>{
    const {_id } = req.params;

    Todo.deleteOne({ _id })

    .then(()=>{
        console.log("deleted todo successfully!");
        
        res.redirect("/");
    })
    .catch((err) => console.log(err)
    )
});

module.exports = router;