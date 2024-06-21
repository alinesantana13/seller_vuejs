<template>
  <div>
    <hr />
    <div class="list_orders_title d-flex justify-content-center">
      <h4>Orders</h4>
    </div>
    <hr />
    <div class="row">
      <div class="col-lg-2 col-md-3 col-sm-4 col-12 list_orders_card mx-4">
        <CardOrder />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CardOrder from './CardOrder.vue';
</script>

<style scoped></style>