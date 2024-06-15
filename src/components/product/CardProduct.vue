<template>
  <div class="card_store" v-if="props.product.store_id">
    <router-link :to="`/stores/${props.product.store_id}/products/${props.product.id}`" class="store-link">
      <div class="row">
        <div class="col-3 d-flex justify-content-end" v-if="imageUrl">
          <img class="card_store_image" :src="imageUrl" />
        </div>
        <div class="col-3 d-flex justify-content-end" v-else>
          <img class="card_store_image" src="../../assets/images/icon-store.png" />
        </div>
        <div class="col-9">
          <div>
            <p>{{ product.title }}</p>
            <p>{{ product.price }}</p>
          </div>
        </div>
      </div>
    </router-link>
  </div>
  <div v-else>Loading...</div>
</template>

<script setup lang="ts">
import { defineProps, computed } from 'vue';
import type { IProduct } from '@/interfaces/interfaces';

const props = defineProps<{ product: IProduct }>();

const imageUrl = computed(() => {
  return props.product && props.product.image_url ? `http://localhost:3000${props.product.image_url}` : '';
});

</script>

<style scoped>
.card_store {
  color: #000000;
  background-color: #FFFFFF;
  width: 300px;
  height: 120px;
  border-radius: 1rem;
  padding: 1rem 0.5rem 0 2rem;
}

.card_store_image {
  width: 70px;
  height: 70px;
}
</style>