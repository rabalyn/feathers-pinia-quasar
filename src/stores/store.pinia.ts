// stores/store.pinia.ts
import { createPinia } from 'pinia'
import { setupFeathersPinia } from 'feathers-pinia'
import { api } from '../feathers-client'

export const pinia = createPinia()

export const { defineStore, BaseModel } = setupFeathersPinia({
  clients: { api },
  idField: 'id'
})
