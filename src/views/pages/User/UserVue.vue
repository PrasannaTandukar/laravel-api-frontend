<script setup>
import {inject, ref} from "vue";
import DeleteConfirmationDialogVue from "@/components/DeleteConfirmationDialogVue.vue";
import SnackbarVue from "@/components/SnackbarVue.vue";

// Axios
const http = inject('http')

// breadcrumbs
const breadcrumbs = [
  {
    title: 'Users',
    disabled: false,
    to: {name: 'admin.users.index'},
    exact: true
  }
]

// Table state
let search = ref('')
let serverItems = ref([])
let loading = ref(true)
let totalItems = ref(0)
let selected = ref([])
let itemsPerPage = ref(10)
let page = ref(1)
let sortBy = ref()

// snackbar state
let snackbar = ref(false)
let text = ref('')
let timeout = ref(2000)
let snackbarColor = ref('')

// dialog state
let dialog = ref(false)

// Table headers
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
// Load table items from server
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

// Delete multiple Items
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
        dialog.value = false

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
    <v-btn density="comfortable" icon="mdi-delete" class="float-right" @click="dialog = true"></v-btn>
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

  <!-- Snackbar -->
  <SnackbarVue v-model="snackbar" :timeout="timeout" :snackbar-color="snackbarColor" :text="text" />
  <!-- Dialog -->
  <DeleteConfirmationDialogVue v-model="dialog" @delete-confirmation="deleteMultipleItems"/>
</template>