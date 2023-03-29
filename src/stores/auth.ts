// stores/auth.ts
import { defineStore, acceptHMRUpdate } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
  const userStore = useUserStore()
  const { api } = useFeathers()

  const auth = useAuth({
    api,
    userStore
  })

  auth.reAuthenticate()

  return auth
})

if (import.meta.hot) {
  // @ts-expect-error initial config
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
}
