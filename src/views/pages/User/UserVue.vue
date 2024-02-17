<script setup>
import {inject, ref} from "vue";

const http = inject('http')
const breadcrumbs = [
  {
    title: 'Users',
    disabled: false,
    to: {name: 'admin.users.index'},
    exact: true
  }
]
const itemsPerPage = 5
const headers = [
  {
    title: 'Name',
    align: 'start',
    key: 'name',
  },
  {
    title: 'Email',
    key: 'email',
  }
]
let search = ref('')
let serverItems = ref([])
let loading = ref(true)
let totalItems = ref(0)

const loadItems = ({page, itemsPerPage, sortBy}) => {
  loading.value = true
  http({
    method: 'get',
    url: '/users',
    params: {
      'page': page,
      'itemsPerPage': itemsPerPage,
      'sortBy': sortBy
    }
  }).then(function (response) {
    serverItems.value = response.data.data
    totalItems.value = response.data.total
    loading.value = false
  }).catch(function (error) {
    console.log(error)
  })
}

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
  <v-card-text>
    <v-data-table-server
        v-model:items-per-page="itemsPerPage"
        :headers="headers"
        :items-length="totalItems"
        :items="serverItems"
        :loading="loading"
        :search="search"
        item-value="name"
        @update:options="loadItems"
    ></v-data-table-server>
  </v-card-text>
</template>

<style scoped>

</style>