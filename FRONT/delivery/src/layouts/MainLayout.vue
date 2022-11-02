<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          Welcome {{ authStore.me.fname }} {{ authStore.me.lname }}
        </q-toolbar-title>
        <div>
          <menu-button></menu-button>
        </div>
      </q-toolbar>
    </q-header>

    <q-footer elevated>
      <q-toolbar class="glossy">
        <q-toolbar-title>Delivery App</q-toolbar-title>
      </q-toolbar>
    </q-footer>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item header>
          <q-avatar>
            <img src="../../src\assets\images\user-png.jpg" />
          </q-avatar>
        </q-item>
        <essential-link></essential-link>
      </q-list>
    </q-drawer>
    <q-page-container>
      <q-parallax src="../assets/images/food-delivery.jpg">
        <router-view />
      </q-parallax>
    </q-page-container>
  </q-layout>
</template>

<script>
import { useAuthStore } from "../stores/auth";
import { defineComponent, onMounted, ref } from "vue";
import EssentialLink from "components/EssentialLink.vue";
import { useToggleStore } from "../stores/toggleEmit";
import MenuButton from "../components/UI/MenuButton.vue";
import { LocalStorage } from "quasar";

export default defineComponent({
  name: "MainLayout",
  components: {
    EssentialLink,
    MenuButton,
  },
  data() {
    return {
      //
    };
  },
  setup() {
    const authStore = useAuthStore();
    const toggleStore = useToggleStore();
    const leftDrawerOpen = ref(toggleStore.toogle);
    const auth_token = LocalStorage.getItem("auth_token");
    onMounted(() => {
      if (!auth_token) {
      } else {
        authStore.setMe();
        authStore.updateToken;
        authStore.isAuth = true;
        // linksList = linksList.filter((data) => data.title != "Login");

        console.log("there is a token///" + authStore.token);
      }
    });

    return {
      authStore,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
});
</script>
