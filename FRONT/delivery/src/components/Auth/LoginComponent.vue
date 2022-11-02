<template>
  <div class="q-pa-md" style="max-width: 400px">
    <q-form @submit.prevent="onSubmit" class="q-gutter-md">
      <div class="form-control">
        <q-input
          filled
          v-model="data.email"
          label="Your email *"
          hint="input your email"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Please type something']"
        />
      </div>

      <div class="form-control">
        <q-input
          filled
          :type="isPwd ? 'password' : 'text'"
          v-model="data.password"
          label="Your password *"
          hint="input your password"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Type your password']"
        >
          <template v-slot:append>
            <q-icon
              clickable
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="changePwd"
            ></q-icon>
          </template>
        </q-input>
      </div>
      <div class="btn btn-group">
        <q-btn label="Submit" type="submit" color="primary" />
        <q-btn
          label="register"
          type="button"
          color="primary"
          to="/register"
          flat
          class="q-ml-sm"
        />
      </div>
    </q-form>
  </div>
</template>

<script>
import { useQuasar } from "quasar";
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { api } from "boot/axios";
import { useAuthStore } from "/src/stores/auth";

export default {
  data() {
    return {
      isPwd: true,
    };
  },
  methods: {
    changePwd() {
      this.isPwd = !this.isPwd;
    },
  },
  setup() {
    const $q = useQuasar();
    const router = useRouter();
    const authStore = useAuthStore();

    const data = reactive({
      email: ref(null),
      password: ref(null),
    });

    return {
      data,
      router,
      authStore,
      // accept,

      onSubmit() {
        api
          .post("/auth/login", data)
          .then((response) => {
            let token = response.data.data.token;
            authStore.token = token;
            authStore.setToken;
            // authStore.me = response.data.data.user;
            authStore.setMe;
            $q.notify({
              color: "green-4",
              textColor: "white",
              icon: "cloud_done",
              message: "Logged in",
            });

            router.push("/home");
          })
          .catch((error) => {
            console.error("There was an error!", error.response);
            $q.notify({
              color: "red-5",
              textColor: "white",
              icon: "warining",
              message: `${error.response.data.message}`,
            });
          });
      },
    };
  },
};
</script>

<style scoped>
.form-control {
  padding: 1rem;
  width: 300px;
}
</style>