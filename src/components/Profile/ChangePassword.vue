<template>
  <form @submit="update">
    <div class="row"></div>
    <div class="row">
      <div class="column">
        <p>Profile Settings</p>
        <div class="form-control">
          <q-input
            rounded
            outlined
            v-model="data.fname"
            hint="Change your first name"
            label="Update Your first name"
          />
        </div>
        <div class="form-control">
          <q-input
            rounded
            outlined
            v-model="data.lname"
            hint="Change your last name"
            label="Update Last name"
          />
        </div>
        <div class="form-control">
          <q-input
            rounded
            outlined
            v-model="data.email"
            label="Update email"
            hint="Your email"
          />
        </div>
      </div>

      <div class="column">
        <p>Change password</p>
        <div class="form-control">
          <q-input
            rounded
            outlined
            label="Update Phone number"
            hint="Change phone number"
          />
        </div>
        <!-- <div class="form-control">
          <q-input rounded outlined label="Input New Password" />
        </div>
        <div class="form-control">
          <q-input rounded outlined label="Confirm Password" />
        </div> -->
      </div>
    </div>
    <div class="form-control">
      <q-btn label="Update" type="Update" color="primary" />
    </div>
  </form>
</template>

<script>
import { defineComponent, onMounted, ref, reactive } from "vue";
import { api } from "boot/axios";
import { LocalStorage } from "quasar";

export default defineComponent({
  setup() {
    const token = LocalStorage.getItem("auth_token");
    const text = ref(null);
    let data = reactive({
      email: ref(null),
      fname: ref(null),
      lname: ref(null),
      phone: ref(null),
    });
    // const password = ref(null);
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
}
</style>