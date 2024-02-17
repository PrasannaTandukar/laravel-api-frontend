<script setup>
import loginImage from '@/assets/login-background.jpg'
import {inject, reactive, ref} from "vue"
import {useTokenStore} from "@/stores/token.js"

const http = inject('http')
const store = useTokenStore()
const errors = ref({})
// const success = ref('')
const formData = reactive({
  email: '',
  password: ''
})

const onSubmit = () => {
  http({
    method: 'post',
    url: '/login',
    data: formData
  }).then(function (response) {
    if (response.data) {
      store.authenticationToken = response.data.data.token
      store.isAuthenticated = true
    }
  }).catch(function (error) {
    if (error.response.status === 422) {
      errors.value = error.response.data.errors
    }
  })
}
</script>

<template>
  <div class="login-page">
    <div class="background-container">
      <img :src="loginImage" alt="">
    </div>
    <div class="content-container">
      <form class="inner-content-container" @submit.prevent="onSubmit">
        <div class="text-h4 mb-3">Sign In</div>
        <v-text-field
            class="mb-2"
            label="Email"
            variant="outlined"
            v-model="formData.email"
            :error-messages="errors?.email"
        ></v-text-field>
        <v-text-field
            class="mb-2"
            :type="'password'"
            name="input-10-1"
            label="Password"
            variant="outlined"
            v-model="formData.password"
            :error-messages="errors?.password"
        ></v-text-field>
        <v-btn
            type="submit"
            block
            class="mb-8"
            color="blue"
            size="large"
        >
          Log In
        </v-btn>
      </form>
    </div>
  </div>
</template>

<style scoped>
/* Apply styles to html, body, and .login-page */
html, body, .login-page {
  margin: 0;
  padding: 0;
  overflow: hidden;
}

.login-page {
  height: 100vh;
  display: flex;
}

/* Adjust background-container to fill available height */
.background-container {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.background-container img {
  //max-width: 100%;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Keep content-container's width fixed */
.content-container {
  width: 30%;
  padding: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.inner-content-container {
  width: 100%;
}
</style>
