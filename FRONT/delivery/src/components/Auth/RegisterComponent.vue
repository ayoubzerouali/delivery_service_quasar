<template>
  <div class="q-pa-md">
    <p>Register Your Account</p>
    <q-form @submit.prevent="onSubmit" @reset="onReset" class="q-gutter-md">
      <div class="row">
        <div class="column">
          <div class="form-control">
            <q-input
              filled
              v-model="data.fname"
              label="Your first name *"
              hint="input your first name"
              lazy-rules
              :rules="[
                (val) => (val && val.length > 0) || 'Please type something',
              ]"
            />
          </div>

          <div class="form-control">
            <q-input
              filled
              v-model="data.lname"
              label="Your last name *"
              hint="input your last name"
              lazy-rules
              :rules="[
                (val) => (val && val.length > 0) || 'Please type something',
              ]"
            />
          </div>
          <div class="form-control">
            <q-input
              filled
              v-model="data.email"
              label="Your email *"
              hint="input your email"
              lazy-rules
              :rules="[
                (val) => (val && val.length > 0) || 'Please type something',
              ]"
            />
          </div>
        </div>

        <div class="column">
          <div class="form-control">
            <q-input
              filled
              v-model="data.phone"
              label="Phone"
              mask="(###) ### - ####"
              fill-mask
              hint="Mask: (###) ### - ####"
            />
          </div>

          <div class="form-control">
            <q-input
              filled
              :type="isPwd ? 'password' : 'text'"
              v-model="data.password"
              label="Your password *"
              lazy-rules
              :rules="[
                (val) => (val && val.length > 0) || 'Type your password',
              ]"
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

          <div class="form-control">
            <q-select
              rounded
              readonly
              filled
              v-model="data.type"
              hint="Readonly"
              style="width: 250px"
            />
          </div>
        </div>
      </div>
      <!-- <q-toggle v-model="accept" label="I accept the license and terms" /> -->

      <div class="row submit">
        <q-btn label="Submit" type="submit" color="primary" />
        <q-btn
          label="Reset"
          type="reset"
          color="primary"
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

    const data = reactive({
      email: ref(null),
      password: ref(null),
      type: "livreur",
      lname: ref(null),
      fname: ref(null),
      phone: ref(null),
    });

    return {
      data,

      onSubmit() {
        console.log(data);
        api
          .post("/users", data, {
            // withCredentials: true,
          })
          .then((response) => {
            console.log(response.data);
            $q.notify({
              color: "green-4",
              textColor: "white",
              icon: "cloud_done",
              message: "Submitted",
            });
            router.push("/login");
          })
          .catch((error) => {
            console.error(error.response);
            $q.notify({
              color: "red-5",
              textColor: "white",
              icon: "warning",
              message: `An error was occured: ${error.response.data.errors[0].message}`,
            });
          });
      },

      onReset() {
        data.email = null;
        data.fname = null;
        data.lname = null;
        data.password = null;
        data.phone = null;
      },
    };
  },
};
</script>

<style scoped>
p {
  display: flex;
  font-family: Georgia, "Times New Roman", Times, serif;
}

.column {
  padding: 2rem;
  width: 300px;
}
.form-control {
  max-height: 60px;
  margin-bottom: 30px;
}
</style>