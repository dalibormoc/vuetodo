module.exports = function(app) {
  var todoList = require("./todos");

  app
    .route("/todos")
    .get(todoList.get_all_todos)
    .post(todoList.add_todo);

  app
    .route("/todos/:todoId")
    .get(todoList.get_todo)
    .put(todoList.edit_todo)
    .delete(todoList.delete_todo);
};
