<template>
  <q-page>
    <div class="row">
      <pre>{{ user }}</pre>
    </div>
    <div class="row">
      <pre>we have {{ $messages.total }} messages.</pre>
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

const $messages = Message.useFind(messageParams, { paginateOn: 'hybrid', immediate: true })
const messages = computed(() => Message.findInStore({ query: {} }).data.value.reverse())
</script>
