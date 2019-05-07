import axios from "axios";

const api = axios.create({
  baseURL: `http://localhost:3000`,
  withCredentials: false, // This is the default
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  },
  timeout: 3000
});

export default {
  getTodos() {
    return api.get("/todos");
  },
  addTodo(todo) {
    return api.post("/todos", todo);
  },
  getTodo(todoId) {
    return api.get("/todos/" + todoId);
  },
  editTodo(todo) {
    return api.put("/todos/" + todo.id, todo);
  },
  deleteTodo(todoId) {
    return api.delete("/todos/" + todoId);
  }
};
