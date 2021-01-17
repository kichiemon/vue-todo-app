<template>
  <h2>ToDo Items</h2>
  <div>store's count {{ counted }}</div>
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
  computed,
  toRefs,
  onMounted,
} from "vue";
import { ToDoItem } from "../models/ToDoItem";
import { useStore } from "../store";

interface State {
  newToDoItemName?: string;
}
export default defineComponent({
  props: {
    items: {
      type: Array as PropType<ToDoItem[]>,
      required: true,
    },
  },
  setup(props) {
    const store = useStore();
    const { newToDoItemName } = toRefs(
      reactive<State>({ newToDoItemName: null })
    );
    return {
      newToDoItemName,
      counted: computed(() => store.state.todoItems.length),
      todoItems: computed(() => store.state.todoItems),
      onClick: (i) => store.commit("toggle", i),
      onClickAddNewToDoItem: (e) => {
        if (!newToDoItemName.value ?? newToDoItemName.value.length == 0) return;
        store.commit("add", new ToDoItem(newToDoItemName.value, false));
        newToDoItemName.value = null;
      },
    };
  },
});
</script>
