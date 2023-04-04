<template>
  <div
    class="q-ml-md"
    style="height: 85vh;"
  >
    Messages ({{ messageTotalCount }}):
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
import { UseFindParams } from 'feathers-pinia/dist/use-find'

const Message = useMessageModel()
const auth = useAuthStore()

const userId = auth.user?.id
const scrollAreaRef: Ref<QScrollArea | undefined> = ref()

const messageTotalCount = ref(0)
const messageParams: UseFindParams = reactive({ query: { $sort: { createdAt: -1 }, $limit: 25 } })
const { find: findMessages, latestQuery } = Message.useFind(messageParams)

const { service: messageService } = useMessagesConfig()
messageService.on('created', () => {
  findMessages()
  scroll()
  messageTotalCount.value++
})

const messages = computed(() => latestQuery.value?.response?.data?.reverse())

onMounted(async () => {
  setTimeout(() => {
    scroll()
  }, 50)
  findMessages()
  messageTotalCount.value = (await Message.count()).total
})

function scroll () {
  if (scrollAreaRef === undefined) return

  if (scrollAreaRef.value) {
    scrollAreaRef.value.setScrollPercentage('vertical', 105, 300)
  }
}
</script>
