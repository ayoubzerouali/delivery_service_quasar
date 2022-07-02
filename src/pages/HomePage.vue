<template>
  <q-page> <orders-table></orders-table> </q-page>
</template>

<script>
import OrdersTable from "../components/Delivery/OrdersTable.vue";
import { defineComponent, ref, reactive, onMounted } from "vue";

export default defineComponent({
  components: {
    OrdersTable,
  },
  setup() {
    return {};
  },
});
</script>

<style>
</style>