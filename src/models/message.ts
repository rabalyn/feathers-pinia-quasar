import type { ModelInstance } from 'feathers-pinia'
import type { Message, MessageData, MessageQuery } from '../../../../feathers-chat-ts'

export const useMessagesConfig = () => {
  const { pinia, idField, whitelist } = useFeathersPiniaConfig()
  const servicePath = 'messages'
  const service = useFeathersService<Message, MessageQuery>(servicePath)
  const name = 'Message'

  return { pinia, idField, whitelist, servicePath, service, name }
}

export const useMessageModel = () => {
  const { idField, service, name } = useMessagesConfig()

  const Model = useModel(name, () => {
    const modelFn = (data: ModelInstance<Message>) => {
      const defaults = {
        text: '',
        userId: undefined,
        createdAt: new Date()
      }
      const withDefaults = useInstanceDefaults(defaults, data)

      const User = useUserModel()
      const withUser = associateGet(withDefaults, 'user', {
        Model: User,
        getId: (data) => data.userId as unknown as number
      })
      return withUser
    }
    return useFeathersModel<Message, MessageData, MessageQuery, typeof modelFn>({ name, idField, service }, modelFn)
  })

  onModelReady(name, () => {
    service.hooks({ around: { all: [...feathersPiniaHooks(Model)] } })
  })
  connectModel(name, () => Model, useMessageStore)

  return Model
}
