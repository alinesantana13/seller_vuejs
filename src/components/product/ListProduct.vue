<template>
  <div>
    <div class="stores_card_product" v-for="product in products" :key="product.id">
      <CardProduct :product="product" :store="store" />
    </div>
    <button class="btn btn-primary" @click="newProduct">New Product</button>
  </div>
</template>

<script setup lang="ts">
import CardProduct from './CardProduct.vue';
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Store } from '../../requests/store';
import { Product } from '@/requests/product';
import type { IStore, IPagination, IProduct } from '../interfaces/interfaces';

const storeInstance = new Store();
const productInstance = new Product();

const store = ref<IStore | null>(null);
const error = ref<string | null>(null);

const products = ref<IProduct[] | null>(null);
const paginationProduct = ref<IPagination[] | null>(null);
const errorProduct = ref<string | null>(null)
const currentePageProduct = ref(1);

const imageUrl = computed(() => {
  return store.value && store.value.image_url ? `http://localhost:3000${store.value.image_url}` : '';
});

const fetchStore = async (id: number) => {
  try {
    const response = await storeInstance.GetStore(id);
    store.value = await response;
    return response;
  } catch (err: any) {
    error.value = err.toString()
  }
};

const route = useRoute();

const fetchProduct = async (id: number) => {
  try {
    const response = await productInstance.GetProducts(id, currentePageProduct.value);
    products.value = await response.result.products;
    if (response.result.pagination) {
      paginationProduct.value = response.result.pagination;
    }
    return response;
  } catch (err: any) {
    errorProduct.value = err.toString()
  }
};

const router = useRouter();

const id = Number(route.params.id);
onMounted(() => {
  if (!isNaN(id)) {
    fetchStore(id);
    fetchProduct(id);
  } else {
    error.value = "Invalid store ID.";
  }
});

const newProduct = () => {
  router.push(`/stores/${id}/products/new`);
}
</script>

<style scoped></style>