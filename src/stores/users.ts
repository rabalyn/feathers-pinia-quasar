// stores/service.users.ts
import { defineStore } from 'pinia'

export const useUserStore = () => {
  const { pinia, idField, whitelist, servicePath, service, name } = useUsersConfig()

  const useStore = defineStore(servicePath, () => {
    const utils = useService({ service, idField, whitelist })
    return { ...utils, test: true }
  })
  const store = useStore(pinia)

  connectModel(name, useUserModel, () => store)

  return store
}
