const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());


app.use(express.json());

let todos: { id: number; title: string; completed: boolean }[] = [];
let nextId = 1;

app.get("/api/todos", (_req: any, res: any) => {
  res.json(todos);
});

app.post("/api/todos", (req: any, res: any) => {
  const { title } = req.body;
  if (!title) {
    return res.status(400).json({ error: "Title is required" });
  }
  const newTodo = { id: nextId++, title, completed: false };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

app.get("/api/todos/:id", (req: any, res: any) => {
  const todo = todos.find(t => t.id === parseInt(req.params.id));
  if (!todo) {
    return res.status(404).json({ error: "Todo not found" });
  }
  res.json(todo);
});

app.put("/api/todos/:id", (req: any, res: any) => {
  const todoIndex = todos.findIndex(t => t.id === parseInt(req.params.id));
  if (todoIndex === -1) {
    return res.status(404).json({ error: "Todo not found" });
  }
  const { title, completed } = req.body;
  todos[todoIndex] = { ...todos[todoIndex], title, completed };
  res.json(todos[todoIndex]);
});

app.delete("/api/todos/:id", (req: any, res: any) => {
  const todoIndex = todos.findIndex(t => t.id === parseInt(req.params.id));
  if (todoIndex === -1) {
    return res.status(404).json({ error: "Todo not found" });
  }
  const deletedTodo = todos.splice(todoIndex, 1)[0];
  res.json(deletedTodo);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});