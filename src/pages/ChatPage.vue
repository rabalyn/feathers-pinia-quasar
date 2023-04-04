<template>
  <q-page>
    <div>
      <div class="row q-pa-md">
        <div class="col-3 height-85vh">
          <span class="q-ma-md">Users ({{ usersTotal }}):</span>
          <users-list />
        </div>

        <div class="col height-85vh">
          <chat-messages />
        </div>
      </div>
      <div class="row">
        <div class="col-3" />
        <div class="col q-px-md">
          <chat-composer />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import UsersList from '../components/UsersList.vue'
import ChatMessages from '../components/ChatMessages.vue'
import ChatComposer from '../components/ChatComposer.vue'

const { api } = useFeathers()
const User = api.service('users')

const usersTotal = ref(0)

onMounted(async () => {
  usersTotal.value = (await User.count()).total
})
</script>

<style>
.height-85vh {
  height: 85vh;
}

.userlistContainer {
  overflow: scroll;
}
</style>
