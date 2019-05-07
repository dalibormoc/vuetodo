<template>
  <q-modal v-model="modalOpened" no-backdrop-dismiss :content-css="{ minWidth: '40vw' }">
    <q-modal-layout>
      <div class="layout-padding">
        <q-list no-border>
          <q-item>
            <div class="q-display-1 q-mb-md">{{modalTitle}}</div>
          </q-item>
          <q-item>
            <q-input
              v-model="modalTodoItemTitle"
              float-label="Title"
              class="form-item"
              @blur="$v.modalTodoItemTitle.$touch"
              :error="$v.modalTodoItemTitle.$error"
            />
          </q-item>
          <q-item>
            <q-input
              v-model="modalTodoItemText"
              float-label="Decription"
              type="textarea"
              class="form-item"
            />
          </q-item>
          <q-item>
            <q-datetime
              v-model="modalTodoItemDate"
              float-label="Due date"
              type="datetime"
              class="form-item"
            />
          </q-item>
          <q-item>
            <q-checkbox v-model="modalTodoItemDone" label="Done"/>
          </q-item>
          <q-item-separator/>
          <q-item>
            <q-btn v-close-overlay class="q-ma-sm" color="light" label="Close"/>
            <q-btn
              v-if="this.$store.state.openedTodo.id"
              @click="deleteTodo"
              class="q-ma-sm"
              color="negative"
              label="Delete"
            />
            <q-btn @click="saveTodo" class="q-ma-sm" color="primary" size="md" label="Save"/>
          </q-item>
        </q-list>
      </div>
    </q-modal-layout>
  </q-modal>
</template>

<script>
import { required } from "vuelidate/lib/validators";

import Service from "./../../service/service";

export default {
  validations: {
    modalTodoItemTitle: { required }
  },
  computed: {
    modalOpened: {
      get() {
        return this.$store.state.modalOpened;
      },
      set(value) {
        this.$store.commit("updateModalOpened", value);
      }
    },
    modalTodoItem: {
      get() {
        return this.$store.state.openedTodo;
      }
    },
    modalTodoItemTitle: {
      get() {
        return this.$store.state.openedTodo.title;
      },
      set(value) {
        this.$store.commit("updateOpenedTodoInput", {
          input: "title",
          value: value
        });
      }
    },
    modalTodoItemText: {
      get() {
        return this.$store.state.openedTodo.text;
      },
      set(value) {
        this.$store.commit("updateOpenedTodoInput", {
          input: "text",
          value: value
        });
      }
    },
    modalTodoItemDate: {
      get() {
        return this.$store.state.openedTodo.date;
      },
      set(value) {
        this.$store.commit("updateOpenedTodoInput", {
          input: "date",
          value: value
        });
      }
    },
    modalTodoItemDone: {
      get() {
        return this.$store.state.openedTodo.done;
      },
      set(value) {
        this.$store.commit("updateOpenedTodoInput", {
          input: "done",
          value: value
        });
      }
    },
    modalTitle() {
      return this.modalTodoItem.id ? "Edit Todo" : "New Todo";
    }
  },
  methods: {
    saveTodo() {
      this.$v.modalTodoItemTitle.$touch();

      if (this.$v.modalTodoItemTitle.$error) {
        this.$q.notify("Please check the Title.");
        return;
      }

      const todo = this.modalTodoItem;
      if (todo.id)
        Service.editTodo(todo)
          .then(() => {
            this.$store.dispatch("getTodos");
            this.$store.commit("updateModalOpened", false);
          })
          .catch(error => {
            // eslint-disable-next-line
            console.log(error);
            this.$q.notify("Server error.");
          });
      else
        Service.addTodo(todo)
          .then(() => {
            this.$store.dispatch("getTodos");
            this.$store.commit("updateModalOpened", false);
          })
          .catch(error => {
            // eslint-disable-next-line
            console.log(error);
            this.$q.notify("Server error.");
          });
    },
    deleteTodo() {
      const todo = this.modalTodoItem;
      if (todo.id)
        Service.deleteTodo(todo.id)
          .then(() => {
            this.$store.dispatch("getTodos");
            this.$store.commit("updateModalOpened", false);
          })
          .catch(error => {
            // eslint-disable-next-line
            console.log(error);
            this.$q.notify("Server error.");
          });
    }
  }
};
</script>

<style>
.form-item {
  width: 100%;
}
</style>
