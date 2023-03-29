
<template>
  <q-page class="row items-center justify-evenly">
    <q-form
      class="q-gutter-md"
      @submit="submit"
    >
      <q-input
        v-model="state.email"
        filled
        label="E-Mail"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type something']"
      />

      <q-input
        v-model="state.password"
        filled
        type="password"
        label="Password"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type something']"
      />

      <div>
        <q-btn
          label="Login"
          type="submit"
          color="primary"
          @click.prevent="submit"
        />
      </div>
    </q-form>
  </q-page>
</template>

<script setup lang="ts">
const router = useRouter()
const authStore = useAuthStore()
const state = reactive({
  email: '',
  password: ''
})
// login then redirect
const submit = async () => {
  authStore.clearError()
  await authStore.authenticate({ strategy: 'local', ...state })
  redirect()
}
const redirect = () => {
  const redirectTo = authStore.loginRedirect || '/chat'
  authStore.loginRedirect = null
  router.push(redirectTo)
}
</script>
