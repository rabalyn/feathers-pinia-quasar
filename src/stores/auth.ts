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
