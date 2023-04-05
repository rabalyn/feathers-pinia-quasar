<template>
  <div class="">
    <q-toggle
      v-model="isDark"
      class="q-my-md"
      :icon="isDark ? 'dark_mode' : 'light_mode'"
      size="lg"
      @update:model-value="toggleDarkmode()"
    />
  </div>
</template>

<script setup>
import { useQuasar } from 'quasar'

const $q = useQuasar()
const isDark = ref($q.dark.isActive)

onMounted(() => {
  const storedIsDark = localStorage.getItem('isDark') === 'true'
  if (storedIsDark && storedIsDark !== isDark.value) {
    isDark.value = !isDark.value
    toggleDarkmode()
  }
})

function toggleDarkmode () {
  $q.dark.toggle()
  localStorage.setItem('isDark', isDark.value)
}
</script>
