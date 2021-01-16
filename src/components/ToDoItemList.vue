<template>
  <h2>ToDo Items</h2>
  <div v-for="(item, k) in items" :key="k">
    <div>==================</div>
    <div>{{ k + 1 }}個目</div>
    <div>name: {{ item.name }}</div>
    <div>isDone {{ item.isDone }}</div>
    <div>
      <button v-on:click="() => onClick(k)">{{ toggleLabel(k) }}</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeUpdate, PropType, ref, nextTick } from "vue";
import { ToDoItem } from "../models/ToDoItem";

export default defineComponent({
  props: {
    items: {
      type: Array as PropType<ToDoItem[]>,
      required: true,
    },
  },
  // data() {
  //   return {
  //     toggleLabel: (i) => (this.items[i].isDone ? "to do" : "to done"),
  //   };
  // },
  setup(props) {
    return {
      ...props.items,
      toggleLabel: (i) => (props.items[i].isDone ? "to do" : "to done"),
      onClick: (i) => props.items[i].toggle(),
    };
  },
});
</script>
