// store.ts
import { InjectionKey } from "vue";
import { createStore, useStore as baseUseStore, Store } from "vuex";
import { ToDoItem } from "../models/ToDoItem";

export interface State {
  todoItems: ToDoItem[];
}

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state: {
    todoItems: [],
  },
  mutations: {
    toggle(state, indexOfItem: number) {
      state.todoItems[indexOfItem].toggle();
    },
    add(state, newItem: ToDoItem) {
      state.todoItems.push(newItem);
    },
  },
});

// define your own `useStore` composition function
export function useStore() {
  return baseUseStore(key);
}
