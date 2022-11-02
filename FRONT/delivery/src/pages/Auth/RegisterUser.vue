<template>
  <app-card>
    <register-form></register-form>
  </app-card>
</template>

<script>
import AppCard from "../../components/UI/AppCard.vue";
import RegisterForm from "../../components/Auth/RegisterComponent.vue";

export default {
  name: "RegisterUser",
  components: {
    AppCard,
    RegisterForm,
  },
};
</script>


<style scoped>

</style>