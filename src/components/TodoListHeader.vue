<template>
  <q-toolbar color="primary">
    <q-search v-model="searchString" inverted color="none"/>
  </q-toolbar>
</template>

<script>
export default {
  computed: {
    searchString: {
      get() {
        return this.$store.state.searchString;
      },
      set(value) {
        this.$store.commit("updateSearchString", value);
      }
    }
  }
};
</script>

<style>
</style>
