import { createApp } from "vue";
import { store, key } from "./store";
import App from "./App.vue";

const app = createApp(App);

// pass the injection key
app.use(store, key);

app.mount("#app");
