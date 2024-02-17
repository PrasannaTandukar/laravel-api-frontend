<script setup>

const breadcrumbs = [
  {
    title: 'Dashboard',
    disabled: false,
    to: {name: 'admin.dashboard'},
    exact: true
  }
]
</script>

<template>
  <v-card-title>
    Dashboard
  </v-card-title>
  <v-card-actions>
    <v-breadcrumbs :items="breadcrumbs">
      <template v-slot:prepend>
        <v-icon size="small" icon="mdi-view-dashboard"></v-icon>
      </template>
    </v-breadcrumbs>
  </v-card-actions>
</template>

<style scoped>

</style>