<template>
    
</template>

<script>
import { useAuthStore } from 'src/stores/auth'
export default {
name="LogoutComponent",
setup(){
    const authStore = useAuthStore();
    return{
        authStore,
        onLogout(){
            authStore.removeToken();
        }
    }
}
}
</script>

<style>
</style>