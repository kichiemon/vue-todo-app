<template>
  <h1>Hello App!</h1>
  <p>
    <!-- use the router-link component for navigation. -->
    <!-- specify the link by passing the `to` prop. -->
    <!-- `<router-link>` will render an `<a>` tag with the correct `href` attribute -->
    <router-link to="/">Go to Home</router-link>
    <span>　</span>
    <router-link to="/todos">Go to ToDos</router-link>
    <span>　</span>
    <router-link to="/login">Go to SignIn</router-link>
  </p>
  <!-- route outlet -->
  <!-- component matched by the route will render here -->
  <router-view v-slot="{ Component }">
    <component :is="Component" />
  </router-view>
</template>

<script lang="ts">
import { defineComponent, onMounted, PropType, ref, computed } from "vue";
import { onBeforeRouteLeave, onBeforeRouteUpdate } from "vue-router";
import ToDoItemList from "./components/ToDoItemList.vue";
import { useStore } from "./store/index";

export default defineComponent({
  setup() {
    const store = useStore();
    onBeforeRouteUpdate(async (to, from) => {
      // only fetch the user if the id changed as maybe only the query or the hash changed
      console.log("@@@@@@ called router 2");
      if (to.params.id !== from.params.id) {
        // userData.value = await fetchUser(to.params.id);
      }
    });
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
/* vue-router が勝手に付与してくれるclass */
.router-link-active {
  color: red;
}
</style>
