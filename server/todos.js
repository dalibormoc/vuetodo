let mockTodos = [
  {
    id: "qonkg72chdi8d527j0h3k",
    title: "Marketing plan",
    text: "",
    date: "2022-02-07T06:00:00.000+01:00",
    done: false
  },
  {
    id: "qlvfxz8pzi7whguemsnxp",
    title: "Create Todolist",
    text: "Create simple todolist",
    date: "2022-02-07T06:00:00.000+01:00",
    done: true
  },
  {
    id: "tisrz1tggt3ouq3i4gaks",
    title: "Meeting #3",
    text: "",
    date: "2022-02-07T06:00:00.000+01:00",
    done: false
  }
];

function uniqueID() {
  return (
    Math.random()
      .toString(36)
      .substring(2, 15) +
    Math.random()
      .toString(36)
      .substring(2, 15)
  );
}

exports.get_all_todos = function(req, res) {
  res.send(mockTodos);
};

exports.add_todo = function(req, res) {
  const newTodo = req.body;
  newTodo.id = uniqueID();
  mockTodos.push(req.body);
  res.send("OK");
};

exports.get_todo = function(req, res) {
  const todo = mockTodos.find(todo => todo.id == req.params.todoId);
  res.send(todo);
};

exports.edit_todo = function(req, res) {
  const todoIndex = mockTodos.findIndex(todo => todo.id === req.params.todoId);
  mockTodos[todoIndex] = req.body;
  res.send("OK");
};

exports.delete_todo = function(req, res) {
  const todoIndex = mockTodos.findIndex(todo => todo.id === req.params.todoId);
  mockTodos.splice(todoIndex, 1);
  res.send("OK");
};
