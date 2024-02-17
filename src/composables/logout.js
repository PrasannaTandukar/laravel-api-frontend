import {useTokenStore} from "@/stores/token.js"
import router from "@/router/index.js"
import http from "@/axios.js"

const useLogout = () => {
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
}

export default useLogout