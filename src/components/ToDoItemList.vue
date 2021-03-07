<template>
  <h2>ToDo Items</h2>
  <div>store's count {{ counted }}</div>
  <div>ToDo Items {{ undoneItemsLength }}</div>
  <div>
    <span>新しいタスク：</span>
    <input type="text" placeholder="new to do task" v-model="newToDoItemName" />
    <div>
      <button v-on:click="onClickAddNewToDoItem">登録する</button>
    </div>
  </div>
  <div
    v-for="(item, k) in todoItems"
    :key="item.id"
    style="padding: 8px; margin: 24px; background: skyblue"
  >
    <div>==================</div>
    <div>
      {{ k + 1 }}個目
      <button @click="() => onClickDelete(item.id)">削除する</button>
    </div>
    <div>name: {{ item.name }}</div>
    <div>isDone {{ item.isDone }}</div>
    <div>
      <button @click="() => onClickToggle(k)">
        {{ item.isDone ? "to do" : "to done" }}
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { ToDoActionTypes } from "@/store/todo";
import {
  defineComponent,
  PropType,
  reactive,
  computed,
  toRefs,
  onMounted,
  onBeforeUnmount,
} from "vue";
import { useRouter } from "vue-router";
import { ToDoItem } from "../models/ToDoItem";
import { useStore } from "../store";

interface State {
  newToDoItemName?: string;
}
export default defineComponent({
  props: {
    items: {
      type: Array as PropType<ToDoItem[]>,
    },
  },
  setup(props) {
    const store = useStore();
    const router = useRouter();
    const { newToDoItemName } = toRefs(
      reactive<State>({ newToDoItemName: null })
    );
    onMounted(() => {
      store.dispatch(ToDoActionTypes.BIND_TODO, undefined);
    });
    onBeforeUnmount(() => {});
    return {
      newToDoItemName,
      counted: computed(() => store.state.todos.length),
      todoItems: computed(() => store.state.todos),
      undoneItemsLength: computed(
        () => store.state.todos.filter((i) => !i.isDone).length
      ),
      onClickToggle: (i) => {
        console.log("@@@@@@@ called click toggle", i);
        store.dispatch(ToDoActionTypes.TOGGLE, { indexOfItem: i });
      },
      onClickDelete: (id) => store.dispatch(ToDoActionTypes.REMOVE, { id: id }),
      onClickAddNewToDoItem: (e) => {
        if (!newToDoItemName.value ?? newToDoItemName.value.length == 0) return;
        store.dispatch(ToDoActionTypes.ADD, {
          itemName: newToDoItemName.value,
          isDone: false,
        });
        newToDoItemName.value = null;
      },
    };
  },
});
</script>
