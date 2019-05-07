<template>
  <q-item>
    <q-item-side>
      <q-item-tile>
        <q-checkbox @input="updateTodo" v-model="clonedTodo.done"/>
      </q-item-tile>
    </q-item-side>
    <q-item-main>
      <q-item-tile label v-html="todoTitle"/>
      <q-item-tile sublabel v-html="todo.text"/>
    </q-item-main>
    <q-item-side right>
      <q-btn @click="openTodo" color="light" size="md" label="Detail"/>
    </q-item-side>
  </q-item>
</template>

<script>
import Service from "./../../service/service";

export default {
  props: {
    todo: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      clonedTodo: Object.assign({}, this.todo)
    };
  },
  computed: {
    todoTitle() {
      return this.clonedTodo.done
        ? `<del>${this.todo.title}</del>`
        : this.todo.title;
    }
  },
  methods: {
    openTodo() {
      this.$store.dispatch("openModalEdit", this.todo);
    },
    updateTodo() {
      if (this.clonedTodo.id)
        Service.editTodo(this.clonedTodo)
          .then(() => {
            this.$store.dispatch("getTodos");
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
</style>
