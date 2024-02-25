import axios from 'axios';
import { useAuthStore } from './stores/auth';
import router from './router';
import { environment } from './lib/environment';
import pinia from './stores/index'
import { prepareBackendUrl } from './lib/utilities';


const authStore = useAuthStore(pinia)

const instance = axios.create({
    baseURL: prepareBackendUrl(environment.backendUrl),
});

instance.interceptors.request.use((config) => {
    if (authStore.isLoggedIn) {
        config.headers.Authorization = `Bearer ${authStore.token}`
    }
    config.baseURL = prepareBackendUrl(environment.backendUrl)

    return config
}, (error) => {
    return Promise.reject(error);
})

instance.interceptors.response.use((response) => {
    return response;
}, (error) => {
    // Go to 404 page if 404 error
    if (error.response.status === 404) {
        router.push('/404')
    }

    // When the token is expired or invalid, logout the user
    if (error.response.status === 401) {
        const authStore = useAuthStore()
        authStore.logout()
        router.push('/login?redirect=' + router.currentRoute.value.fullPath)
    }

    return Promise.reject(error);
})

export default instance;


