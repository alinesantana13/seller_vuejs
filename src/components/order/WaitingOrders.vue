<template>
  <div class="orders_sse">
    <h3>Waiting orders</h3>
    <template v-if="hasNewOrder">
      <div>
        <p>New order!</p>
      </div>
      <div class="orders_list">
        <div class="order_see_list" v-for="order in newOrders" :key="order.id">
          <OrderDetails :order="order" />
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import type { IOrder } from '@/interfaces/interfaces';
import { ref } from 'vue';
import OrderDetails from './OrderDetails.vue';
import { fetchEventSource } from '@microsoft/fetch-event-source';
import { Auth } from '@/auth';

const newOrders = ref<IOrder[]>([]);
const hasNewOrder = ref(false);
const auth = new Auth();
const token = auth.isLoggedIn() ? auth.getFallbackToken('token') : null;

fetchEventSource(
  `${import.meta.env.VITE_API_SERVER_URL}/stores/4/orders/new`, {
  method: 'GET',
  headers: {
    "Accept": "application/json",
    "X-API-KEY": import.meta.env.VITE_API_KEY,
    "Authorization": `Bearer ${token}`
  },
  async onopen(response) {
    if (response.ok) {
      console.log("connected!")
      return
    }
  },
  onmessage(msg) {
    if (msg.event === 'new-order') {
      let data = JSON.parse(msg.data)
      console.log(data.orders)
      console.log(data.orders.length)
      newOrders.value = data.orders
      hasNewOrder.value = true;
    } else {
      hasNewOrder.value = false;
    }
  }
});

</script>

<style scoped>
.orders_sse {
  color: white;
  background-color: rgb(240, 208, 168);
  margin-right: 1rem;
  margin-left: 1rem;
  padding: 1rem 0 1rem 1rem;
  border-radius: 0.5rem;
}

.orders_list {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: space-around;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  ;
}

.orders_see_list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
</style>