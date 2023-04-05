<template>
  <div
    v-if="messages"
    class="q-ml-md"
    style="height: 85vh;"
  >
    Messages ({{ total }}):
    <q-scroll-area
      ref="scrollAreaRef"
      class="q-px-md"
      style="height: 100%"
    >
      <div
        v-for="message in messages"
        :key="message.id"
      >
        <q-chat-message
          v-if="message.text && message.user && userId"
          :name="message.user.id === userId ? 'me' : message.user.email"
          :avatar="message.user.avatar"
          :text="[message.text]"
          :sent="message.user.id === userId"
        />
      </div>
    </q-scroll-area>
  </div>
</template>

<script setup lang="ts">
import { QScrollArea } from 'quasar'

const auth = useAuthStore()
const { api } = useFeathers()
const Message = api.service('messages')

const userId = auth.user?.id
const scrollAreaRef: Ref<QScrollArea | undefined> = ref()

const messageParams = computed(() => {
  const params = {
    query: {
      $skip: 0,
      // eslint-disable-next-line
      $sort: { createdAt: -1 } as any,
      $limit: 25
    }
  }
  return params
})

const { total } = Message.useFind(messageParams, { paginateOnServer: true, immediate: true })
const messages = computed(() => Message.findInStore({ query: { $sort: { createdAt: -1 } } }).data.value.reverse())

Message.on('created', async () => scroll())

onMounted(async () => {
  setTimeout(() => {
    scroll()
  }, 150)
})

function scroll () {
  if (scrollAreaRef === undefined) return

  if (scrollAreaRef.value) {
    scrollAreaRef.value.setScrollPercentage('vertical', 105, 300)
  }
}
</script>
