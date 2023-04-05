
<template>
  <q-page class="row items-center justify-evenly">
    <q-form
      class="q-gutter-md"
      @submit="submit"
    >
      <q-card
        bordered
      >
        <q-card-section>
          <i
            alt=""
            class="h-32 w-32 block mx-auto i-logos-feathersjs"
          />
          <div class="text-h2 text-bold">
            Feathers Chat
          </div>
        </q-card-section>

        <q-separator
          inset
        />

        <q-card-section>
          <div class="row">
            <div class="col">
              <q-input
                v-model="state.email"
                filled
                label="E-Mail"
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'Please type something']"
              />
            </div>
          </div>

          <div class="row">
            <div class="col">
              <q-input
                v-model="state.password"
                filled
                type="password"
                label="Password"
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'Please type something']"
              />
            </div>
          </div>
          <div class="row">
            <div class="col">
              <q-btn
                class="full-width"
                label="Register"
                type="submit"
                color="dark"
                @click.prevent="register(state)"
              />
            </div>
          </div>
          <div class="row q-mt-md">
            <div class="col">
              <q-btn
                class="full-width"
                label="Login"
                type="submit"
                color="dark"
                @click.prevent="submit"
              />
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-form>
  </q-page>
</template>

<script setup lang="ts">
const { api } = useFeathers()
const User = api.service('users')
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
const redirect = async () => {
  const redirectTo = (await authStore).loginRedirect || '/chat'
  authStore.loginRedirect = null
  router.push(redirectTo)
}

async function register (state: {email: string, password: string}) {
  await User.create({
    email: state.email,
    password: state.password
  })
  redirect()
}
</script>

<style>
.i-logos-feathersjs {
  background: url("data:image/svg+xml;utf8,%3Csvg preserveAspectRatio='xMidYMid meet' viewBox='0 0 256 256' width='1em' height='1em' xmlns='http://www.w3.org/2000/svg' %3E%3Cpath fill='%23333' d='M128 9.102c65.665 0 118.898 53.233 118.898 118.898c0 65.665-53.233 118.898-118.898 118.898C62.335 246.898 9.102 193.665 9.102 128C9.102 62.335 62.335 9.102 128 9.102M128 0C57.421 0 0 57.421 0 128c0 70.579 57.421 128 128 128c70.579 0 128-57.421 128-128C256 57.421 198.579 0 128 0m20.83 25.524c-10.43-1.896-35.651 36.409-43.994 59.734c-.634 1.769-2.086 8.249-2.086 9.955c0 0 6.531 14.055 8.343 17.351c-3.034-1.58-9.323-13.756-9.323-13.756c-3.034 5.784-5.942 32.34-4.994 37.271c0 0 6.762 10.062 9.387 12.578c-3.603-1.201-9.671-9.355-9.671-9.355c-1.138 3.508-.916 10.807-.379 13.274c4.551 6.637 10.619 7.396 10.619 7.396s-6.637 66.181 3.413 71.111c6.258-1.327 7.775-73.956 7.775-73.956s7.585.569 9.292-1.327c3.856-2.655 12.826-30.224 12.958-34.202c0 0-10.41 1.952-15.487 3.924c3.826-3.8 16.049-6.352 16.049-6.352c3.315-3.979 10.291-31.047 10.994-39.391c.176-2.093.583-4.657.268-8.398c0 0-9.941 2.177-12.014 1.424c2.104-.237 12.263-4.14 12.263-4.14c1.801-16.213 2.358-42.091-3.413-43.141Zm-36.38 171.691c-.795 19.496-1.294 25.004-2.115 29.601c-.379.857-.758.997-1.138-.095c-3.477-15.992-3.224-136.438 36.409-191.241c-23.05 42.092-33.535 122.861-33.156 161.735Z'/%3E%3C/svg%3E") no-repeat;
  background-size: 100% 100%;
  background-color: transparent;
  width: 1em;
  height: 1em;
}

.h-32 {
  height: 8rem;
}

.w-32 {
  width: 8rem;
}

.mx-auto {
  margin-left: auto;
  margin-right: auto;
}

.invert {
  --un-invert: invert(1);
  filter: var(--un-blur) var(--un-brightness) var(--un-contrast) var(--un-drop-shadow) var(--un-grayscale) var(--un-hue-rotate) var(--un-invert) var(--un-saturate) var(--un-sepia);
}
</style>
