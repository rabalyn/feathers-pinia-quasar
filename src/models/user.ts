import type { ModelInstance } from 'feathers-pinia'
import type { User, UserData, UserQuery } from '../../../../feathers-chat-ts'

export const useUsersConfig = () => {
  const { pinia, idField, whitelist } = useFeathersPiniaConfig()
  const servicePath = 'users'
  const service = useFeathersService<User, UserQuery>(servicePath)
  const name = 'User'

  return { pinia, idField, whitelist, servicePath, service, name }
}

export const useUserModel = () => {
  const { idField, service, name } = useUsersConfig()

  const Model = useModel(name, () => {
    const modelFn = (data: ModelInstance<User>) => {
      const defaults = {
        email: '',
        password: ''
      }
      const withDefaults = useInstanceDefaults(defaults, data)
      return withDefaults
    }
    return useFeathersModel<User, UserData, UserQuery, typeof modelFn>({ name, idField, service }, modelFn)
  })

  onModelReady(name, () => {
    service.hooks({ around: { all: [...feathersPiniaHooks(Model)] } })
  })
  connectModel(name, () => Model, useUserStore)

  return Model
}
