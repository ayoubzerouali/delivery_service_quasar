<template>
  <form @submit.prevent="update">
    <div class="row"><p>Profile Settings</p></div>
    <div class="row">
      <div class="column">
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
      </div>
      <q-separator vertical />

      <div class="column">
        <div class="form-control">
          <q-input
            rounded
            outlined
            v-model="data.phone"
            label="Update Phone number"
            hint="Change phone number"
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
import { LocalStorage, useQuasar } from "quasar";

export default defineComponent({
  setup() {
    const $q = useQuasar();

    const token = LocalStorage.getItem("auth_token");
    const text = ref(null);
    let data = reactive({
      email: ref(null),
      fname: ref(null),
      lname: ref(null),
      phone: ref(null),
    });
    let id = ref(null);

    // const password = ref(null);
    onMounted(() => {
      api
        .get("/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          data.email = response.data.data.email;
          data.fname = response.data.data.fname;
          data.lname = response.data.data.lname;
          data.phone = response.data.data.phone;
          id.value = response.data.data.id;
        })
        .catch((error) => console.error(error));
      console.log(data);
    });
    return {
      data,
      update() {
        api
          .put(`/users/${id.value}`, data, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((response) => {
            $q.notify({
              color: "green-4",
              textColor: "white",
              icon: "cloud_done",
              message: `${response.data.message}`,
            });
          })
          .catch((error) => {
            $q.notify({
              type: "negative",
              textColor: "white",
              icon: "warning",
              message: `${error.response.data.errors[0].message}`,
            });
          });
      },
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
  margin-top: 40px;
}

</style>