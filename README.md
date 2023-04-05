# Setup Quasar project and configure feathers-pinia

For the TLDR (Too Long, Didn't Read) version, you can take a look at the [feathers-pinia-quasar repo](https://github.com/rabalyn/feathers-pinia-quasar).

## Overview

Follow these steps to get started with a new quasar app:

[Create a Quasar app with quasar-cli](https://quasar.dev/start/quasar-cli#tl-dr).

Add / edit the files mentioned in the [Setup feathers-pinia section](#setup-feathers-pinia) to integrate feathers-pinia v3.pre2:

## Install the dependencies

```bash
yarn
# or
npm install
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)

```bash
quasar dev
```

### Lint the files

```bash
yarn lint
# or
npm run lint
```

### Build the app for production

```bash
quasar build
```

### Customize the configuration

See [Configuring quasar.config.js](https://v2.quasar.dev/quasar-cli-vite/quasar-config-js).

## Setup feathers-pinia

### feathers-client

[src/feathers-client.ts:](./src/feathers-client.ts)

```ts
import { createClient } from 'feathers-chat' // exported by your feathers-api
import { createPiniaClient } from 'feathers-pinia'
import socketio from '@feathersjs/socketio-client'
import io from 'socket.io-client'
import { pinia } from './modules/pinia'

const host = 'http://localhost:3030'
const socket = io(host, { transports: ['websocket'] })

export const feathersClient = createClient(socketio(socket), { storage: window.localStorage })
export const api = createPiniaClient(feathersClient, {
  pinia,
  idField: 'id',
  whitelist: ['$regex'],
  paramsForServer: []
})

```

### quasar.config

[quasar.config.js](./quasar.config.js)

add 'feathers-pinia' to boot array:

```ts
...
    boot: [
      'i18n',
      'feathers-pinia'
    ],
...
```

add vite plugins:

```ts
...
      vitePlugins: [
        ['unplugin-auto-import/vite', {
          imports: [
            'vue',
            'vue-router',
            'vue-i18n',
            'vue/macros',
            '@vueuse/head',
            '@vueuse/core'
          ],
          dts: 'src/auto-imports.d.ts',
          dirs: ['src/composables', 'src/models', 'src/stores'],
          vueTemplate: true,
          eslintrc: {
            enabled: true, // Default `false`
            filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
            globalsPropValue: true // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
          }
        }],
        ['@intlify/vite-plugin-vue-i18n', {
          // if you want to use Vue I18n Legacy API, you need to set `compositionOnly: false`
          // compositionOnly: false,

          // if you want to use named tokens in your Vue I18n messages, such as 'Hello {name}',
          // you need to set `runtimeOnly: false`
          // runtimeOnly: false,

          // you need to set i18n resource including paths !
          include: path.resolve(__dirname, './src/i18n/**')
        }]
      ]
...
```

### boot

[src/boot/feathers-pinia.ts:](./src/boot/feathers-pinia.ts)

```ts
// boot/feathers-pinia
import { api } from '../feathers-client'
import { pinia } from '../modules/pinia'

export default ({ app }) => {
  app.use(api)
  app.use(pinia)
}
```

### composables

[src/composables/feathers.ts](./src/composables/feathers.ts)

```ts
// composables/feathers.ts
import { api } from '../feathers-client'

// Provides access to Feathers Client(s)
export const useFeathers = () => {
  return { api }
}

/**
 * Returns a type-casted service to work with Feathers-Pinia. It currently does not type custom methods.
 * @param servicePath the path of the service
 */
export const useFeathersService = (
  servicePath: string,
  clientAlias = 'api'
) => {
  const clients = useFeathers()
  const client = clients[clientAlias as keyof typeof clients]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return client.service(servicePath as any)
}
```

### modules

[src/modules/pinia.ts](./src/modules/pinia.ts)

```ts
// src/modules/pinia.ts
import { createPinia } from 'pinia'

export const pinia = createPinia()
```

### auth store

[src/stores/auth.ts:](./src/stores/auth.ts)

```ts
// stores/auth.ts
import { acceptHMRUpdate, defineStore } from 'pinia'
import { useAuth } from 'feathers-pinia'

export const useAuthStore = defineStore('auth', () => {
  const { api } = useFeathers()
  const auth = useAuth({ api, servicePath: 'users' })
  return auth
})

// @ts-expect-error beta-testing
if (import.meta.hot) { import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot)) }
```

## Usage of your services

With v3 of feathers-pinia all you need is your `api` object, which contains your services. The stores are created automatically when they are
used in your components.

```vue
<template>
  <pre>{{ user }}</pre>
  <pre>we have {{ total }} messages.</pre>
  <pre>{{ messages }}</pre>
</template>

<script setup lang="ts">
const auth = useAuthStore()
const { api } = useFeathers()
const Message = api.service('messages')

const user = computed(() => authStore.user)
const messageParams = computed(() => {
  return { query: {} }
})

const { total } = Message.useFind(messageParams, { paginateOnServer: true, immediate: true })
const messages = computed(() => Message.findInStore({ query: { $sort: { createdAt: -1 } } }).data.value.reverse())
</script>
```

## What's Next?

Check out the full example app: [feathers-pinia-quasar](https://github.com/rabalyn/feathers-pinia-quasar). Check
out the [LoginPage](https://github.com/rabalyn/feathers-pinia-quasar/blob/main/src/pages/LoginPage.vue) to see an example of signup/login.
