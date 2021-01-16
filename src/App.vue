<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
  <!-- <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" /> -->
  <ToDoItemList :items="items" />
</template>

<script lang="ts">
import { defineComponent, onMounted, PropType, ref } from "vue";
// import HelloWorld from "./components/HelloWorld.vue";
import ToDoItemList from "./components/ToDoItemList.vue";
import { ToDoItemsRepository } from "./models/ToDoItem";

export default defineComponent({
  components: {
    // HelloWorld,
    ToDoItemList,
  },
  setup() {
    let items = ref([{ name: "initial", isDone: false }]);
    ToDoItemsRepository.fetchItems().then((result) => {
      console.log("------ called 1" + result.toString());
      result?.forEach((i) => console.log("loaded ", i));
      items.value = result ?? [];
    });
    // onMounted(() =>
    // ToDoItemsRepository.fetchItems().then((result) => (items.value = result))
    // );
    return {
      items,
    };
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
