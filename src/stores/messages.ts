// stores/messages.ts
import { defineStore } from 'pinia'

export const useMessageStore = () => {
  const { pinia, idField, whitelist, servicePath, service, name } = useMessagesConfig()

  const useStore = defineStore(servicePath, () => {
    const utils = useService({ service, idField, whitelist })
    return { ...utils, test: true }
  })
  const store = useStore(pinia)

  connectModel(name, useUserModel, () => store)

  return store
}
