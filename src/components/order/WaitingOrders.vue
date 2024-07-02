<template>
  <div class="orders_sse">
    <h3>Waiting orders</h3>
    <template v-if="hasNewOrder">
      <div>
        <p>New order!</p>
      </div>

      <OrderDetails :order="newOrder" />
    </template>
  </div>
</template>

<script setup lang="ts">
import type { IOrder } from '@/interfaces/interfaces';
import { ref } from 'vue';
import OrderDetails from './OrderDetails.vue';
import { fetchEventSource } from '@microsoft/fetch-event-source';
import { Auth } from '@/auth';

const newOrder = ref<IOrder>();
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
      console.log(data.order)
      newOrder.value = {
        id: data.order.id,
        created_at: new Date(data.order.created_at),
        buyer_id: data.order.buyer_id,
        store_id: data.order.store_id,
        state: data.order.state,
        payment_status: data.order.payment_status,
        total_order_items: data.order.total_order_items,
        order_items: data.order.order_items

      }
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
</style>