<script setup>
let dialog = defineModel()
const emit = defineEmits(['delete-confirmation'])
</script>

<template>
  <!-- Dialog -->
  <v-dialog
      v-model="dialog"
      width="auto"
  >
    <v-card>
      <v-card-title>
        Do you want to delete this user?
      </v-card-title>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="red" variant="elevated" @click="dialog = false">No</v-btn>
        <v-btn color="green" variant="elevated" @click="emit('delete-confirmation')">Yes</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>