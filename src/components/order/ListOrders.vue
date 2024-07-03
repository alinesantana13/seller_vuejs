<template>
  <div class="orders_current">
    <hr />
    <h3 class="d-flex justify-content-center">Monitoring orders</h3>
    <hr />
    <div class="row mb-3">
      <div class="col-md-6 col-12 d-flex align-items-center gap-2">
        <label>Filter by state:</label>
        <select class="form-select orders_current_select mb-2" v-model="selectedState">
          <option value="">All</option>
          <option v-for="state in states" :key="state" :value="state">{{ state }}</option>
        </select>
      </div>
      <div class="col-md-6 col-12 d-flex align-items-center gap-2">
        <label>Filter by id:</label>
        <input class="form-control orders_current_input" v-model.number="selectedId" type="number" />
      </div>
    </div>
    <template v-if="orders.length > 0">
      <div class="row">
        <div class="col-lg-3 col-md-4 col-sm-6 col-12 order_current_item" v-for="order in orders" :key="order.id">
          <OrderDetails :order="order" />
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import type { IOrder } from '@/interfaces/interfaces';
import { ref, onMounted, watch } from 'vue';
import OrderDetails from './OrderDetails.vue';
import { Order } from '@/requests/order';

const orderInstance = new Order();
const orders = ref<IOrder[]>([]);
const error = ref<string | null>(null);
const states = ref<string[]>([
  'created',
  'accepted',
  'preparing',
  'out_for_delivery',
  'delivered',
  'canceled']);

const selectedState = ref<string>('');
const selectedId = ref<number | null>(null);

const fetchStores = async () => {
  try {
    const response = await orderInstance.GetOrders(selectedState.value, selectedId.value);
    orders.value = await response;
    orders.value = orders.value.filter(x => x.payment_status != null
      && x.payment_status != "failed")
    return response;
  } catch (err: any) {
    error.value = err.toString()
  }
};

watch(selectedState, () => {
  fetchStores();
});

watch(selectedId, () => {
  fetchStores();
});

onMounted(() => {
  fetchStores();
});


</script>

<style scoped>
.orders_current {
  color: white;
  background-color: rgb(240, 208, 168);
  margin-right: 1rem;
  margin-left: 1rem;
  border-radius: 0.5rem;
}

.orders_current_select {
  width: 200px;
}

.orders_current_input {
  width: 150px;
}

.order_current_item {
  display: flex;
  justify-content: center;
  margin-bottom: 1rem
}
</style>