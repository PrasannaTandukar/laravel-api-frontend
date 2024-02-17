import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useTokenStore = defineStore('token', () => {
    const authenticationToken = ref('')
    const isAuthenticated = ref(false)

    return { authenticationToken, isAuthenticated }
}, {persist: true})
