<template>
  <div id="app">
    <q-layout class="layout">
      <q-layout-header>
        <todo-list-header></todo-list-header>
      </q-layout-header>
      <q-page-container>
        <todo-list/>
        <q-page-sticky position="bottom-right" :offset="[25, 25]">
          <q-btn @click="createNewTodo" round size="lg" color="primary" icon="add"/>
        </q-page-sticky>
      </q-page-container>
    </q-layout>
  </div>
</template>

<script>
import TodoListHeader from "./components/TodoListHeader";
import TodoList from "./components/TodoList";

export default {
  name: "app",
  components: {
    TodoListHeader,
    TodoList
  },
  created() {
    this.$store.dispatch("getTodos");
  },
  methods: {
    createNewTodo() {
      this.$store.dispatch("openModalNew");
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.layout {
  max-width: 600px;
  margin: auto;
}
</style>
