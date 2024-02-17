<script setup>
import useLogout from "@/composables/logout.js";
</script>

<template>
  <v-navigation-drawer
      class="sidebar-container"
      floating
      permanent
  >
    <v-list
        density="compact"
        nav
    >
      <v-list-item :to="{name: 'admin.dashboard'}" prepend-icon="mdi-view-dashboard" title="Dashboard"
                   value="dashboard"/>
      <v-list-item :to="{name: 'admin.users.index'}" prepend-icon="mdi-account" title="Users"
                   value="users"/>
      <v-list-item @click="useLogout" prepend-icon="mdi-logout" title="Logout"
                   value="logout"/>

    </v-list>
  </v-navigation-drawer>
</template>

<style scoped>

</style>