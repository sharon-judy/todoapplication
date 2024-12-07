const request = require("supertest");
const express = require("express");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const Todo = require("../models/Todo"); // Import your Todo model
const todoRouter = require("../routes/todo"); // Import your router

const app = express();
app.use(express.urlencoded({ extended: false })); // Parse form data
app.use(express.json()); // Parse JSON data
app.use("/", todoRouter); // Mount the router

let mongoServer;

beforeAll(async () => {
  // Start in-memory MongoDB
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

afterAll(async () => {
  // Stop in-memory MongoDB
  await mongoose.disconnect();
  await mongoServer.stop();
});

afterEach(async () => {
  // Clear the database after each test
  await Todo.deleteMany({});
});




describe("Todo Router", () => {
  beforeAll(() => {
    jest.spyOn(console, "log").mockImplementation(() => {}); // Suppress console logs
  });
  // Test the POST /add/todo route
  test("POST /add/todo - should add a new todo", async () => {
    const response = await request(app)
      .post("/add/todo")
      .send({ todo: "Test Todo" });

    // Assertions
    expect(response.statusCode).toBe(302); // Expect redirect to "/"
    const todos = await Todo.find();
    expect(todos.length).toBe(1); // Ensure one todo is saved
    expect(todos[0].todo).toBe("Test Todo"); // Ensure the correct todo content
  });

  // Test the GET /delete/todo/:_id route
  test("GET /delete/todo/:_id - should delete a todo", async () => {
    // Add a todo to the database
    const todo = new Todo({ todo: "Todo to delete" });
    await todo.save();

    const response = await request(app).get(`/delete/todo/${todo._id}`);

    // Assertions
    expect(response.statusCode).toBe(302); // Expect redirect to "/"
    const todos = await Todo.find();
    expect(todos.length).toBe(0); // Ensure the todo is deleted
  });
});
