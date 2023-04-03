<template>
  <q-input
    v-model="message.text"
    maxlength="255"
    :autofocus="true"
    filled
    label="compose message"
    @keyup.enter="sendMessage()"
  >
    <template #after>
      <q-btn
        :disable="message.text.length < 1"
        color="white"
        flat
        dense
        icon="send"
        dark
        @click="sendMessage()"
      />
    </template>
  </q-input>
</template>

<script setup lang="ts">
const Message = useMessageModel()
const message = Message({
  text: ''
})

async function sendMessage () {
  try {
    await Message.create({ text: message.text })
    message.text = ''
  } catch (error) {
    console.error(error)
  }
}
</script>
