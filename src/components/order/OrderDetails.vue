<template>
  <div class="orders_details_container">
    <div class="row">
      <div class="col-sm-6 col-12">
        <h5>Order {{ order?.id }} </h5>
      </div>
      <div class="col-sm-6 col-12 d-flex justify-content-end">
        <p>[{{ formatDate(order?.created_at) }}]</p>
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
      <button class="order_details_state btn btn-primary" @click="updateOrder(nextState)"
        :disabled="nextState === 'canceled' || nextState === 'delivered'">{{ nextState }}</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, computed, ref } from 'vue';
import type { IOrder } from '@/interfaces/interfaces';
import { Order } from '../../requests/order'


const props = defineProps<{ order?: IOrder }>();
const orderInstance = new Order();

const error = ref<string | null>(null);

const stateTransitions: Record<string, string> = {
  created: 'accept',
  accepted: 'prepare',
  preparing: 'start_delivery',
  out_for_delivery: 'deliver',
  delivered: 'delivered',
  canceled: 'canceled'
};

const nextState = computed(() => {
  if (!props.order) return '';
  const currentState = props.order.state;
  return stateTransitions[currentState] || '';
});

const updateOrder = async (state: string) => {
  if (props.order && props.order.id !== undefined) {
    try {
      await orderInstance.UpdateOrder(props.order.id, state);
    } catch (err: any) {
      error.value = err.toString();
    }
  } else {
    console.log('Order ID is undefined');
  }
};

const formatDate = (date: Date | string | undefined): string => {
  if (!date) return '';
  if (typeof date === 'string') {
    date = new Date(date);
  }
  return date.toLocaleDateString();
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

.order_details_state {
  text-transform: capitalize;
}
</style>
