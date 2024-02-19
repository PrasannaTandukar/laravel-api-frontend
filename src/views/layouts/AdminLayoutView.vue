<script setup>
import SidebarVue from "@/components/SidebarVue.vue";
</script>

<template>
  <v-card>
    <v-layout>
      <SidebarVue />
      <v-main class="main-container">
        <v-card class="card-container">
          <RouterView></RouterView>
        </v-card>
      </v-main>
    </v-layout>
  </v-card>
</template>

<style>
::-webkit-scrollbar {
  display: none;
}

.sidebar-container {
  background-color: #37474F; /* Sidebar background color */
  color: #FFFFFF; /* Text color */
  overflow-y: auto;
}

.main-container {
  height: 100vh;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: gainsboro;
  overflow-y: auto !important;
}

.card-container {
  height: 90%;
  width:  90%;
  padding: 20px !important;
  overflow-y: auto !important;
}
</style>