const mongoose = require('mongoose');
const Todo = require('../models/Todo'); 

beforeAll(async () => {
  await mongoose.connect('mongodb://localhost:27017/todo-test');

});

afterAll(async () => {
  await mongoose.connection.dropDatabase(); 
  await mongoose.disconnect();
});

test('Create a new Todo', async () => {
  const newTodo = new Todo({ todo: 'Test Jest create' });
  const savedTodo = await newTodo.save();
  expect(savedTodo._id).toBeDefined();
  expect(savedTodo.todo).toBe('Test Jest create');
});

test('Fetch Todos', async () => {
  const todos = await Todo.find();
  expect(todos.length).toBeGreaterThanOrEqual(1);
});

test('Update a Todo', async () => {
  const todo = await Todo.findOne();
  todo.todo = 'Updated content';
  const updatedTodo = await todo.save();
  expect(updatedTodo.todo).toBe('Updated content');
});

test('Delete a Todo', async () => {
  const todo = await Todo.findOne();
  const deletedTodo = await Todo.deleteOne({ _id: todo._id });
  expect(deletedTodo.deletedCount).toBe(1);
});
