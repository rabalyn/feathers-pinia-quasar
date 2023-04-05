<template>
  <q-page>
    <div class="row">
      <pre>{{ user }}</pre>
    </div>
    <div class="row">
      <pre>we have {{ total }} messages.</pre>
    </div>
    <div class="row">
      <pre>{{ messages }}</pre>
    </div>
  </q-page>
</template>

<script setup lang="ts">
const auth = useAuthStore()
const { api } = useFeathers()
const Message = api.service('messages')

const user = computed(() => auth.user)
const messageParams = computed(() => {
  return { query: {} }
})

const { total } = Message.useFind(messageParams, { paginateOnServer: true, immediate: true })
const messages = computed(() => Message.findInStore({ query: {} }).data.value.reverse())
</script>
