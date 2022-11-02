<template>
  <q-scroll-area class="fit">
    <div class="row">
      <div class="text-h4">
        <p>Profile Page</p>
      </div>
    </div>
    <div class="row app-card">
      <div class="column">
        <div class="hamida">
          <app-card>
            <profile-update></profile-update>
          </app-card>
        </div>
        <q-separator />
        <div class="hamidou">
          <app-card>
            <change-password></change-password>
          </app-card>
        </div>
      </div>
    </div>
  </q-scroll-area>
</template>


<script>
import ProfileUpdate from "../components/Profile/ProfileUpdate.vue";
import ChangePassword from "../components/Profile/ChangePassword.vue";
import AppCard from "../components/UI/AppCard.vue";

export default {
  components: {
    AppCard,
    ProfileUpdate,
    ChangePassword,
  },
};
</script>

<style scoped>
.app-card {
  align-content: center;
  justify-content: center;
  margin-left: 30px;
}
.hamidou {
  padding: 4rem;
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>