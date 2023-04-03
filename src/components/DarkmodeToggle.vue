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

function toggleDarkmode () {
  $q.dark.toggle()
}
</script>
