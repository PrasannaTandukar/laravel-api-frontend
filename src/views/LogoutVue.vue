<script setup>
import {useTokenStore} from "@/stores/token.js"
import router from "@/router/index.js";
import {inject} from "vue";
const http = inject('http')
const store = useTokenStore()

http({
  method: 'post',
  url: '/logout',
}).then(function (response) {
  if (response.data) {
    store.authenticationToken = ''
    store.isAuthenticated = false
    router.push({name: 'login'})
  }
}).catch(function (error) {
  if (error) {
    //
  }
})
</script>

<template>
  <div></div>
</template>