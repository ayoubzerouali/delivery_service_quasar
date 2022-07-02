<template>
  <q-table
    title="Orders Table"
    clickable
    :rows="rows"
    :columns="columns"
    row-key="name"
  >
    <template v-slot:body-cell-action="props">
      <q-td>
        <q-btn @click="accept(props.row.id)" size="sm" color="primary"
          >Take it</q-btn
        >
      </q-td>
    </template>
  </q-table>
</template>

<script>
import { defineComponent, ref, reactive, onMounted } from "vue";
import { api } from "boot/axios";
import { useQuasar } from "quasar";
import { LocalStorage } from "quasar";
import { useAuthStore } from "../../stores/auth";
const authStore = useAuthStore();
const columns = [
  {
    name: "name",
    required: true,
    label: "Client",
    align: "left",
    field: (row) => row.client.fname,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "restaurant",
    align: "center",
    label: "Restaurant",
    field: (row) => row.restaurant.name,
    sortable: true,
  },
  {
    name: "menus",
    label: "Menu",
    field: (row) =>
      row.menus.length <= 1 ? row.menus[0].name : row.menus.length,
  },

  {
    name: "address",
    label: "address",
    field: (row) => row.client.location.address,
    sortable: true,
    sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
  },
  {
    name: "city",
    label: "City",
    field: (row) => row.client.location.city,
    sortable: true,
    sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
  },
  {
    name: "action",
    label: "action",
    field: "id",
  },
];

export default defineComponent({
  name: "HomePage",
  data() {
    return {
      rows: [],
    };
  },
  mounted() {
    const $q = useQuasar();

    const token = LocalStorage.getItem("auth_token");
    api
      .get("/orders", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res);
        this.rows = res.data.data;
        $q.notify({
          color: "red-5",
          textColor: "white",
          icon: "warning",
          message: "api worked",
        });
      })
      .catch((error) => {
        // console.log(`HELLOOOO ${authStore.token}`);
        console.error(error);
        $q.notify({
          color: "red-5",
          textColor: "white",
          icon: "warning",
          message: "no data fetched",
        });
      });
  },
  setup() {
    // onMounted(() => {});
    // const authStore = useAuthStore();

    return {
      columns,
      accept(id) {
        api
          .post(
            `/orders/${id}/process`,
            {},
            {
              headers: { Authorization: `Bearer ${authStore.token}` },
            }
          )
          .then((res) => console.log(res))
          .catch((error) => console.error(error.response));
      },
    };
  },
});
</script>
