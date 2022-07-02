<template>
  <q-item clickable to="/dashboard">
    <q-item-section class="item">
      <q-icon name="dashboard" />
    </q-item-section>
    <q-item-section>
      <q-item-label>Dashboard</q-item-label>
      <q-item-label caption>dashboard</q-item-label>
    </q-item-section>
  </q-item>

  <q-separator />

  <q-item clickable to="/register">
    <q-item-section class="item">
      <q-icon name="register" />
    </q-item-section>
    <q-item-section>
      <q-item-label>Register</q-item-label>
      <q-item-label caption>register</q-item-label>
    </q-item-section>
  </q-item>

  <q-separator />

  <q-item clickable to="/login">
    <q-item-section class="item">
      <q-icon name="off" />
    </q-item-section>
    <q-item-section>
      <q-item-label>Login</q-item-label>
      <q-item-label caption>login</q-item-label>
    </q-item-section>
  </q-item>

  <q-separator />
  <q-item clickable to="/logout">
    <q-item-section class="item">
      <q-icon name="logout" />
    </q-item-section>
    <q-item-section>
      <q-item-label>Logout</q-item-label>
      <q-item-label caption>Logout</q-item-label>
    </q-item-section>
  </q-item>

  <q-separator />
</template>

<script>
import { defineComponent } from "vue";
import { useAuthStore } from "../stores/auth";

export default defineComponent({
  setup() {
    const authStore = useAuthStore();
    return {
      authStore,
    };
  },
  name: "EssentialLink",
});
</script>

<style scoped>
.item {
  max-width: 40px;
}
</style>