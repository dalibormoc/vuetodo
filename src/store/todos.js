import Vue from "vue";
import Vuex from "vuex";

import Service from "../service/service";

Vue.use(Vuex);

const todosStore = new Vuex.Store({
  state: {
    todos: [],
    searchString: "",
    modalOpened: false,
    openedTodo: {
      id: null,
      title: "",
      text: "",
      date: "",
      done: false
    }
  },
  getters: {
    getTodoItem: state => todoId => {
      return state.todos.filter(todo => todo.id === todoId);
    },
    getTodos: state => (areCompleted = false) => {
      return state.todos.filter(
        todo =>
          todo.done === areCompleted &&
          todo.title.toLowerCase().indexOf(state.searchString.toLowerCase()) >=
            0
      );
    }
  },
  mutations: {
    setTodos(ctx, value) {
      ctx.todos = value;
    },
    updateModalOpened(ctx, value) {
      ctx.modalOpened = value;
    },
    updateSearchString(ctx, value) {
      ctx.searchString = value;
    },
    updateOpenedTodo(ctx, value) {
      ctx.openedTodo = Object.assign({}, value);
    },
    updateOpenedTodoInput(ctx, inputValue) {
      ctx.openedTodo[inputValue.input] = inputValue.value;
    }
    // saveTodo
    // deleteTodo
  },
  actions: {
    getTodos({ commit }) {
      return Service.getTodos()
        .then(response => {
          commit("setTodos", response.data);
        })
        .catch(error => {
          // eslint-disable-next-line
          console.log(error);
          alert("Server error");
        });
    },
    openModalEdit({ commit }, payload) {
      commit("updateModalOpened", true);
      commit("updateOpenedTodo", payload);
    },
    openModalNew({ commit }) {
      commit("updateModalOpened", true);
      commit("updateOpenedTodo", {
        id: null,
        title: "",
        text: "",
        date: "",
        done: false
      });
    }
  }
});

export default todosStore;
