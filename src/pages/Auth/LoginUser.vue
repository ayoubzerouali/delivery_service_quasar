<template>
  <app-card>
    <login-form></login-form>
  </app-card>
</template>

<script>
import AppCard from "../../components/UI/AppCard.vue";
import LoginForm from "../../components/Auth/LoginComponent.vue";

export default {
  name: "RegisterUser",
  components: {
    AppCard,
    LoginForm,
  },
};
</script>


<style scoped>
</style>