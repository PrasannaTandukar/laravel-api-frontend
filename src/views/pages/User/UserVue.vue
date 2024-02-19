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
let selected = ref([])
let snackbar = ref(false)
let text = ref('')
let timeout = ref(2000)
let snackbarColor = ref('')
let itemsPerPage = ref(10)
let page = ref(1)
let sortBy = ref()

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

const deleteMultipleItems = () => {
  if (selected.value.length === 0) {
    text.value = 'Select at least one item'
    snackbarColor.value = 'red'
    snackbar.value = true
  } else {
    http({
      method: 'delete',
      url: '/users/delete-multiple',
      data: {
        userIdArray: selected.value
      }
    }).then(function (response) {
      if (response.data) {
        text.value = 'Successfully deleted users'
        snackbarColor.value = 'green'
        snackbar.value = true

        loadItems({
          page: page.value,
          itemsPerPage: itemsPerPage.value,
          sortBy: sortBy.value
        })
      }
    }).catch(function (error) {
      console.log(error)
    })
  }
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
    <v-btn density="comfortable" icon="mdi-delete" class="float-right" @click="deleteMultipleItems"></v-btn>
    <v-data-table-server
        v-model:items-per-page="itemsPerPage"
        v-model:page="page"
        v-model:sort-by="sortBy"
        v-model="selected"
        :headers="headers"
        :items-length="totalItems"
        :items="serverItems"
        :loading="loading"
        :search="search"
        item-value="id"
        @update:options="loadItems"
        show-select
    ></v-data-table-server>
  </v-card-text>

  <v-snackbar
      v-model="snackbar"
      :timeout="timeout"
      :color="snackbarColor"
      location="bottom right"
  >
    {{ text }}

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

<style scoped>

</style>