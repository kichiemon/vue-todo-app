
# vue-todo

Vue.js base project structure

- TypeScript
- Vue.js v3
- vuex v4
- vue-router v4
- firebase v8
- GitHub Actions（auto deploy to Firebase Hosting）

## Points
- using Vue.js v3 x TypeScript.
- Vuex for TypeScript and implements type safe commit/dispatch/getter.
- providing firebase config values by environment variables.
- validating for authentication, by using firebase authentication and vue-router
- GitHubAction auto deploy to Firebase Hosting



![Deploy to Firebase Hosting on PR](https://github.com/kichiemon/vue-todo-app/workflows/Deploy%20to%20Firebase%20Hosting%20on%20PR/badge.svg)
![Deploy to Firebase Hosting on merge](https://github.com/kichiemon/vue-todo-app/workflows/Deploy%20to%20Firebase%20Hosting%20on%20merge/badge.svg)

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
