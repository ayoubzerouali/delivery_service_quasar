<template>
  <q-item v-show="authStore.token" clickable to="/home">
    <q-item-section class="item">
      <q-icon name="dashboard" />
    </q-item-section>
    <q-item-section>
      <q-item-label>Dashboard</q-item-label>
      <q-item-label caption>dashboard</q-item-label>
    </q-item-section>
  </q-item>

  <q-separator />
  <q-item v-show="authStore.token" clickable to="/profile">
    <q-item-section class="item">
      <q-icon name="page" />
    </q-item-section>
    <q-item-section>
      <q-item-label>Profile</q-item-label>
      <q-item-label caption>profile</q-item-label>
    </q-item-section>
  </q-item>

  <q-separator />

  <q-item v-show="!authStore.token" clickable to="/register">
    <q-item-section class="item">
      <q-icon icon="login" />
    </q-item-section>
    <q-item-section>
      <q-item-label>Register</q-item-label>
      <q-item-label caption>register</q-item-label>
    </q-item-section>
  </q-item>

  <q-separator />

  <q-item v-show="!authStore.token" clickable to="/login">
    <q-item-section class="item">
      <q-icon name="login" />
    </q-item-section>
    <q-item-section>
      <q-item-label>Login</q-item-label>
      <q-item-label caption>login</q-item-label>
    </q-item-section>
  </q-item>

  <q-separator />
  <q-item v-show="authStore.token" clickable @click="logout">
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
import { useRouter } from "vue-router";

export default defineComponent({
  setup() {
    const authStore = useAuthStore();
    const router = useRouter();

    return {
      authStore,
      logout() {
        authStore.signOut();
        router.push("/login");
      },
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