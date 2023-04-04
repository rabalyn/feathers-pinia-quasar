<template>
  <q-scroll-area
    ref="userlistRef"
    style="height: 100%;"
  >
    <q-list
      dense
      padding
      class="rounded-border"
    >
      <q-item
        v-for="user in sortedUsers"
        :key="user.id"
        v-ripple
      >
        <q-item-section avatar>
          <q-img
            :src="user.avatar"
            spinner-color="white"
            style="height: 36px; max-width: 36px"
          />
        </q-item-section>
        <q-item-section>
          {{ user.email }}
        </q-item-section>
      </q-item>
    </q-list>
  </q-scroll-area>
</template>

<script setup lang="ts">
import { User as TUser } from 'app/../../feathers-chat-ts/src/client'
const { api } = useFeathers()

const User = api.service('users')

const userlistRef = ref()
const users: TUser[] = reactive([])
const sortedUsers = computed(() => users.sort((a, b) => a.email < b.email ? -1 : 1))

const params = computed(() => {
  return {
    query: {
      $limit: 10,
      $skip: 0
    }
  }
})
// Set page size with $limit in the initial query
const { data, next, find, canNext } = User.useFind(params)

User.on('created', async () => {
  await loadUserList()
})

onMounted(async () => {
  await loadUserList()
})

async function loadUserList () {
  users.length = 0
  await find({ query: { $limit: 250 } })
  users.push(...data.value)
  // eslint-disable-next-line
  while (canNext.value) {
    await next()
    users.push(...data.value)
  }
}
</script>
