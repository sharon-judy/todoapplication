const express = require("express");
const router = require("../routes/index"); 
const Todo = require("../models/Todo");

jest.mock("../models/Todo"); // Mock the Todo model

describe("GET /", () => {
  it("should render the index page with all todos", async () => {
    // Arrange: Mock data
    const mockTodos = [
      { _id: "1", title: "Test Todo 1" },
      { _id: "2", title: "Test Todo 2" },
    ];

    Todo.find.mockResolvedValue(mockTodos); 

    // Mock request and response objects
    const req = {}; 
    const res = {
      render: jest.fn(), // Mock the render method
    };

    //  Call the route handler
    const routeHandler = router.stack.find((r) => r.route.path === "/").route.stack[0].handle;
    await routeHandler(req, res);

    
    expect(Todo.find).toHaveBeenCalledTimes(1);
    expect(res.render).toHaveBeenCalledWith("index", { todo: mockTodos });
  });
});
