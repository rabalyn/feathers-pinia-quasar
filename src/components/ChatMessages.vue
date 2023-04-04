<template>
  <div
    v-if="messages"
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
import { Message as TMessage } from 'app/../../feathers-chat-ts/src/client'
import { QScrollArea } from 'quasar'

const auth = useAuthStore()
const { api } = useFeathers()
const Message = api.service('messages')

const userId = auth.user?.id
const scrollAreaRef: Ref<QScrollArea | undefined> = ref()

const messageTotalCount = ref(0)
const messageParams = computed(() => {
  return {
    query: {
      $skip: 0,
      $limit: 25,
      $sort: { createdAt: -1 }
    }
  }
})

const info = Message.useFind(messageParams, { paginateOnServer: false, immediate: true })
const { find, allLocalData, cachedQuery, paramsWithPagination, total } = info

console.log('allLocalData', allLocalData)
console.log('cachedQuery', cachedQuery)
console.log('paramsWithPagination', paramsWithPagination)
console.log('total', total)

const messages = computed(() => Message.findInStore({ query: { $sort: { createdAt: -1 } } }).data.value.reverse())

// const counter = ref(0)
setInterval(async () => {
  // Message.create({ text: `hello from me for the ${counter.value++} time` })
  find(messageParams)
  scroll()
}, 2500)

Message.on('created', async (x: TMessage) => {
  console.log('on: new message', x)
  find(messageParams)
  scroll()
  messageTotalCount.value = (await Message.count()).total
})
onMounted(async () => {
  setTimeout(() => {
    scroll()
  }, 50)

  await find(messageParams)
  messageTotalCount.value = (await Message.count()).total
})

function scroll () {
  if (scrollAreaRef === undefined) return

  if (scrollAreaRef.value) {
    scrollAreaRef.value.setScrollPercentage('vertical', 105, 300)
  }
}
</script>
