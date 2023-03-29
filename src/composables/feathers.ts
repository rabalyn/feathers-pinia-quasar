// composables/feathers.ts
import { api } from '../feathers-client'
import type { AnyData, FeathersPiniaService } from 'feathers-pinia'

// Provides access to Feathers Client(s)
export const useFeathers = () => {
  return { api }
}

/**
 * Returns a type-casted service to work with Feathers-Pinia. It currently does not type custom methods.
 * @param servicePath the path of the service
 */
export const useFeathersService = <Result extends AnyData, Query extends AnyData>(
  servicePath: string,
  clientAlias = 'api'
) => {
  const clients = useFeathers()
  const client = clients[clientAlias as keyof typeof clients]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return client.service(servicePath as any) as unknown as FeathersPiniaService<Result, Query>
}
