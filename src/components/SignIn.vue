<template>
  <h1>Sign Up</h1>

  <div>Anonimous Sign Up</div>

  <div><button @click="onClickSignUp">Sign Up</button></div>
</template>

<script lang="ts">
import { AuthActionTypes } from "@/store/auth";
import { defineComponent, onMounted, PropType, ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "../store/index";

export default defineComponent({
  setup() {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    return {
      onClickSignUp: () =>
        store.dispatch(AuthActionTypes.ANONIMOUS_LOGIN, null).then(() => {
          const redirectTo = route.query.redirect;
          if (
            redirectTo !== null &&
            redirectTo !== undefined &&
            typeof redirectTo === "string"
          ) {
            router.replace(redirectTo);
          }
        }),
    };
  },
});
</script>
