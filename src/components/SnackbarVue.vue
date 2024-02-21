<script setup>
let snackbar = defineModel()
const props = defineProps([
  'timeout',
  'snackbarColor',
  'text'
])
</script>

<template>
  <v-snackbar
      v-model="snackbar"
      :timeout="props.timeout"
      :color="props.snackbarColor"
      location="bottom right"
  >
    {{ props.text }}

    <template v-slot:actions>
      <v-btn
          color="white"
          variant="text"
          @click="snackbar = false"
      >
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>