<template>
  <h2>ToDo Items</h2>
  <div>
    <span>新しいタスク：</span>
    <input type="text" placeholder="new to do task" v-model="newToDoItemName" />
    <div>
      <button v-on:click="onClickAddNewToDoItem">登録する</button>
    </div>
  </div>
  <div v-for="(item, k) in todoItems" :key="k">
    <div>==================</div>
    <div>{{ k + 1 }}個目</div>
    <div>name: {{ item.name }}</div>
    <div>isDone {{ item.isDone }}</div>
    <div>
      <button @click="() => onClick(k)">
        {{ item.isDone ? "to do" : "to done" }}
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onBeforeUpdate,
  PropType,
  ref,
  reactive,
  toRefs,
  onMounted,
} from "vue";
import { ToDoItem } from "../models/ToDoItem";

var craeted: ToDoItem[] = [];

interface State {
  newToDoItemName?: string;
  todoItems: ToDoItem[];
}
export default defineComponent({
  props: {
    items: {
      type: Array as PropType<ToDoItem[]>,
      required: true,
    },
  },
  setup(props) {
    const { newToDoItemName, todoItems } = toRefs(
      reactive<State>({ newToDoItemName: null, todoItems: [] })
    );
    onMounted(() => {
      props.items.forEach((i) => todoItems.value.push(i));
    });
    return {
      todoItems,
      newToDoItemName,
      onClick: (i) => todoItems.value[i].toggle(),
      onClickAddNewToDoItem: (e) => {
        if (!newToDoItemName.value ?? newToDoItemName.value.length == 0) return;
        todoItems.value.push(new ToDoItem(newToDoItemName.value, false));
        newToDoItemName.value = null;
      },
    };
  },
});
</script>
