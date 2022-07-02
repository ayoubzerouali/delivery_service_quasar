<template>
    <q-intersection transition="scale" class="example-item">
      <div class="row">
        <q-card class="bomba">
          <slot></slot>
        </q-card>
      </div>
    </q-intersection>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    return {
      inception: ref(false),
    };
  },
};
</script>

<style scoped>
div {
  justify-content: center;
  align-content: center;
}
.row {
  justify-content: center;
  align-content: center;
  display: flex;
  margin-top: 20px;
}
.bomba {
  max-height: 300;
  opacity: 0.9;
}
</style>
