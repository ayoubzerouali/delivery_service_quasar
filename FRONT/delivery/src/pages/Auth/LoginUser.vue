<template>
  <app-card>
    <login-form></login-form>
  </app-card>
</template>

<script>
import AppCard from "../../components/UI/AppCard.vue";
import LoginForm from "../../components/Auth/LoginComponent.vue";
import { useQuasar } from "quasar";
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { api } from "boot/axios";
import { useAuthStore } from "/src/stores/auth";

export default {
  name: "RegisterUser",
  components: {
    AppCard,
    LoginForm,
  },
  mounted() {
    const authStore = useAuthStore();
    const router = useRouter();
    if (authStore.token) {
      router.push("/");
    }
  },
};
</script>


<style scoped>
</style>