<template>
  <q-intersection transition="scale" class="example-item">
    <q-table
      title="Orders History"
      clickable
      :rows="rows"
      :columns="columns"
      row-key="name"
    >
      <template v-slot:body-cell-action="props">
        <q-td>
          <q-btn disable size="sm" color="primary">{{ props.row.state }}</q-btn>
        </q-td>
      </template>
    </q-table>
  </q-intersection>
</template>

<script>
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
import { defineComponent, ref, reactive, onMounted } from "vue";
import { api } from "boot/axios";
import { useQuasar } from "quasar";
import { LocalStorage } from "quasar";
import { useAuthStore } from "../../stores/auth";

export default defineComponent({
  name: "OldOrders",
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
        this.rows = res.data.data;
        this.rows = this.rows.filter(
          (data) => JSON.parse(JSON.stringify(data.state)) == "finished"
        );
      })
      .catch((error) => {
        console.error(error.response);
        $q.notify({
          color: "red-5",
          textColor: "white",
          icon: "warning",
          message: "Netword Error",
        });
      });
  },
  setup() {
    return {
      columns,
    };
  },
});
</script>

<style>
</style>