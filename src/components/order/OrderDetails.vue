<template>
  <div class="orders_details_container">
    <div class="row">
      <div class="col-7">
        <h5>Order {{ order?.id }} </h5>
      </div>
      <div class="col-5">
        <p>[{{ order?.created_at.toLocaleDateString() }}]</p>
      </div>
    </div>
    <div>
      <hr />
      <p class="d-flex justify-content-center">{{ order?.payment_status }}</p>
      <hr />
      <div>
        <div class="row" v-for="(order_items, index) in order?.order_items" :key="index">
          <div class="col-9">
            <p>{{ order_items.product_title }}</p>
            <p>$ {{ (order_items.price / order_items.amount).toFixed(2) }} x {{ order_items.amount }} = {{
              order_items.price }}</p>
          </div>
        </div>
      </div>
      <hr />
    </div>
    <div class="card_order_summary">
      <p>Total</p>
      <p>{{ order?.total_order_items }}</p>
    </div>
    <div class="d-flex justify-content-center">
      <button class="btn btn-primary" @click="updateOrder()">Accept</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import type { IOrder } from '@/interfaces/interfaces';
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Order } from '../../requests/order.ts'


const props = defineProps<{ order?: IOrder }>();
const orderInstance = new Order();

const error = ref<string | null>(null);

const updateOrder = async () => {
  try {
    await orderInstance.UpdateOrder(props.order?.id, "accept");
    //refresh na pagina
  } catch (err: any) {
    error.value = err.toString();
    console.log(error.value);
  }
};
</script>

<style scoped>
.orders_details_container {
  background-color: #FFFFFF;
  color: #000000;
  width: 300px;
  border-radius: 1rem;
  padding: 1rem 1rem 0.5rem 1rem;
}

.card_order_summary {
  display: flex;
  justify-content: space-between
}
</style>
