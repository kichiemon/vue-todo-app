import HelloWorld from "./components/HelloWorld.vue";
import ToDoItemList from "./components/ToDoItemList.vue";
import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  { path: "/", component: HelloWorld },
  { path: "/todos", component: ToDoItemList },
];

export const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHashHistory(),
  routes, // short for `routes: routes`
});
