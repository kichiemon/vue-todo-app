<template>
  <div>ToDo is {{ todoItemCount }}</div>
  <ToDoItemList :items="items" />
</template>

<script lang="ts">
import { defineComponent, onMounted, PropType, ref, computed } from "vue";
import ToDoItemList from "./components/ToDoItemList.vue";
import { ToDoItemsRepository } from "./models/ToDoItem";

export default defineComponent({
  components: {
    ToDoItemList,
  },
  setup() {
    let items = ref([]);
    const todoItemCount = computed(
      () => items.value.filter((i) => !i.isDone).length
    );
    onMounted(() =>
      ToDoItemsRepository.fetchItems().then((result) => {
        result?.forEach((i) => console.log("loaded ", i));
        items.value = result ?? [];
      })
    );
    return {
      items,
      todoItemCount: todoItemCount,
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
