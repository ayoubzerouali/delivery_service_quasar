<template>
  <q-scroll-area class="fit">
    <q-page>
      <div>
        <orders-table></orders-table>
      </div>
      <div>
        <old-orders></old-orders>
      </div>
    </q-page>
  </q-scroll-area>
</template>

<script>
import OrdersTable from "../components/Delivery/OrdersTable.vue";
import OldOrders from "../components/Delivery/OldOrders.vue";
import { defineComponent, ref, reactive, onMounted } from "vue";

export default defineComponent({
  components: {
    OrdersTable,
    OldOrders,
  },
  setup() {
    return {};
  },
});
</script>

<style scoped>
div {
  padding: 1rem;
  margin-top: 20px;
}
</style>