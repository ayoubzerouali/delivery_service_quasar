<template>
  <q-scroll-area class="fit">
    <div class="row">
      <div class="text-h4">
        <p>Profile Page</p>
      </div>
    </div>
    <div class="row app-card">
      <div class="column">
        <app-card>
          <profile-update></profile-update>
        </app-card>
      </div>
    </div>
  </q-scroll-area>
</template>


<script>
import ProfileUpdate from "../components/Profile/ProfileUpdate.vue";
import AppCard from "../components/UI/AppCard.vue";

// import { useAuthStore } from "/src/stores/auth";

export default {
  components: {
    AppCard,
    ProfileUpdate,
  },
};
</script>

<style scoped>
.app-card {
  align-content: center;
  justify-content: center;
  margin-left: 30px;
}
</style>