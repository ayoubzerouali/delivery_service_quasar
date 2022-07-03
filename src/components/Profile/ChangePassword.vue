<template>
  <form @submit.prevent="update">
    <div class="row">
      <p>Change Password</p>
    </div>
    <div class="row">
      <div class="column">
        <div class="form-control">
          <q-input
            rounded
            outlined
            v-model="data.password"
            hint="input your current password"
            label="Your Password"
          />
        </div>
      </div>
      <q-separator vertical />
      <div class="column">
        <div class="form-control">
          <q-input
            rounded
            outlined
            label="Your New Password"
            hint="input your new password"
          />
        </div>
        <div class="form-control update">
          <q-btn label="Update" type="Update" color="primary" />
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import { defineComponent, onMounted, ref, reactive } from "vue";
import { api } from "boot/axios";
import { LocalStorage } from "quasar";

export default defineComponent({
  setup() {
    let data = reactive({
      password: ref(null),
      newPassword: ref(null),
    });
    onMounted(() => {});
    return {
      data,
    };
  },
});
</script>

<style scoped>
.column {
  padding: 1rem;
  width: 400px;
  border: 2px;
}
.form-control {
  padding: 1rem;
}
p {
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  justify-content: center;
  margin-top: 4px;
  margin-left: 4px;
  display: flex;
}
.update {
  margin-left: 40px;
  margin-top: 20px;
}
</style>