<script setup lang="ts">
import { ref } from 'vue';
import BaseLayout from '../layouts/BaseLayout.vue'
import { useAuthStore } from '@/stores/auth';
import router from '@/router';

const email = ref('')
const password = ref('')
const error = ref('')

const store = useAuthStore()

async function login() {
    error.value = ''
    await store.login(email.value, password.value)
    if (store.isLoggedIn) {
        // If a query parameter "redirect" is set, redirect to this URL
        const redirect = new URLSearchParams(window.location.search).get('redirect')
        if (redirect) {
            router.push(redirect)
        } else {
            router.push('/')
        }
    } else {
        error.value = 'Login fehlgeschlagen'
    }
}
</script>

<template>
    <BaseLayout>
        <div class="h-screen w-full flex flex-col gap-5 justify-center items-center">
            <div v-if="error"
                class="max-w-md w-full bg-pearl-bush-50 p-5 border-2 border-warning-600 text-warning-600 font-semibold rounded-lg shadow-md">
                {{ error }}</div>
            <div class="max-w-md w-full bg-pearl-bush-50 p-5 border-2 border-bandicoot-400 rounded-lg shadow-md">
                <h1 class="font-serif small-caps font-bold text-xl mb-4">Login</h1>
                <form @submit.prevent="login" class="flex flex-col gap-4">
                    <div class="w-full flex flex-col gap-2">
                        <label for="email" class="text-bandicoot-400 font-semibold">E-Mail</label>
                        <input
                            class="w-full border-2 rounded-lg border-bandicoot-400 focus:border-bandicoot-400 focus:ring-twine-400"
                            type="email" id="email" name="email" v-model="email">
                    </div>
                    <div class="w-full flex flex-col gap-2">
                        <label for="password" class="text-bandicoot-400 font-semibold">Passwort</label>
                        <input
                            class="w-full border-2 rounded-lg border-bandicoot-400 focus:border-bandicoot-400 focus:ring-twine-400"
                            type="password" id="password" name="password" v-model="password">
                    </div>
                    <button @click="login" type="submit"
                        class="w-full p-3 bg-twine-400 rounded-lg text-white flex justify-center items-center mt-4 hover:bg-twine-500 transition-all duration-300">Login</button>
                </form>
            </div>
        </div>
    </BaseLayout>
</template>