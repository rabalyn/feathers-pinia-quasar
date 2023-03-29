<template>
  <q-page>
    <div>
      <h1>Home</h1>

      <!-- List of users returned by userStore.useFind() -->
      <ul>
        <li
          v-for="user in realUsers"
          :key="user.id"
        >
          <q-card
            class="m-1"
          >
            <q-img
              :src="user.avatar"
              spinner-color="white"
              style="height: 140px; max-width: 150px"
            >
              <div class="absolute-bottom text-subtitle2 text-center">
                {{ user.email }}
              </div>
            </q-img>
          </q-card>
        </li>
      </ul>
    </div>
  </q-page>
</template>

<script setup lang="ts">
const User = useUserModel()

// Find users with fall-through cache
const { data: users } = User.useFind({ query: {}, onServer: true })
const realUsers = computed(() => {
  // @ts-expect-error initial test
  return users.value.filter(x => x.email && x.avatar)
})

</script>
