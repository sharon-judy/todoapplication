const request = require("supertest");
const express = require("express");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const Todo = require("../models/Todo");
const todoRouter = require("../routes/todo"); 

const app = express();
app.use(express.urlencoded({ extended: false })); 
app.use(express.json()); 
app.use("/", todoRouter);

let mongoServer;

beforeAll(async () => {
  // Start MongoDB in-memory server
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();

  await mongoose.connect(uri);

});

afterAll(async () => {
  // Close connections
  await mongoose.disconnect();
  await mongoServer.stop();
});

afterEach(async () => {
  // Clear the database after each test
  await Todo.deleteMany({});
});

describe("Todo Routes", () => {
  test("POST /add/todo - should add a new todo", async () => {
    const response = await request(app)
      .post("/add/todo")
      .send({ todo: "Test Todo" });

    expect(response.statusCode).toBe(302);
    const todos = await Todo.find();
    expect(todos.length).toBe(1);
    expect(todos[0].todo).toBe("Test Todo");
    
  });

  test("GET /delete/todo/:_id - should delete a todo", async () => {
   
    const todo = new Todo({ todo: "Todo to delete" });
    await todo.save();

    const response = await request(app).get(`/delete/todo/${todo._id}`);

    expect(response.statusCode).toBe(302); 
    const todos = await Todo.find();
    expect(todos.length).toBe(0); // Should be empty after deletion
  });
});
