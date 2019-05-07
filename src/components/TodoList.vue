<template>
  <div>
    <q-list highlight>
      <div v-if="searchString && !activeTodosCount && !completedTodosCount">No results</div>
      <div v-else>
        <q-list-header>Active todos ({{activeTodosCount}}):</q-list-header>
        <todo-item v-for="todo in activeTodos" :key="todo.id" :todo="todo"/>
        <div v-if="!activeTodosCount">The list is empty.</div>
        <q-item-separator/>
        <div v-if="completedTodosCount">
          <q-list-header>Completed todos ({{completedTodosCount}}):</q-list-header>
          <todo-item v-for="todo in completedTodos" :key="todo.id" :todo="todo"/>
        </div>
      </div>
    </q-list>
    <todo-modal></todo-modal>
  </div>
</template>

<script>
import TodoItem from "./todo_item_components/TodoItem";
import TodoModal from "./todo_item_components/TodoModal";

export default {
  components: {
    TodoItem,
    TodoModal
  },
  computed: {
    activeTodos() {
      return this.$store.getters.getTodos();
    },
    completedTodos() {
      return this.$store.getters.getTodos(true);
    },
    activeTodosCount() {
      return this.activeTodos.length;
    },
    completedTodosCount() {
      return this.completedTodos.length;
    },
    searchString() {
      return this.$store.state.searchString;
    }
  }
};
</script>

<style>
</style>
