<template>
  <div class="store_container">
    <div class="row store_header">
      <div class="col-lg-2 col-md-3 col-sm-3 col-6">
        <h1>Store</h1>
      </div>
      <div class="col-lg-2 col-md-3 col-sm-3 col-6">
        <button class="btn btn-primary" @click="goBack">
          To go back</button>
      </div>
    </div>
    <div class="store_content" v-if="store">
      <div class="row mx-2">
        <div class="col-lg-3 col-md-3 col-sm-3 col-6">
          <h3>{{ store.name }}</h3>
        </div>
        <div v-if="imageUrl" class="col-lg-3 col-md-3 col-sm-3 col-6">
          <img class="store_image" :src="imageUrl" />
        </div>
        <div v-else class="col-lg-3 col-md-3 col-sm-3 col-6">
          <img class="store_image mb-4" src="../assets/images/icon-store.png" />
        </div>
        <div class="col-lg-6 col-md-6 col-sm-6 col-12 store_buttons" v-if="currentRoute">
          <div>
            <input class="form-control" type="text" placeholder="Search" />
          </div>
          <div>
            <button class="btn btn-warning store_button" @click="viewStore">Edit</button>
            <button class="btn btn-secondary store_button">Desativar</button>
            <button class="btn btn-danger store_button" @click="deleteStore">Delete</button>
          </div>
        </div>
      </div>

      <div>
        <router-view />
      </div>
    </div>
    <div class="store_error" v-else-if="error">
      {{ error }}
    </div>
    <div v-else>
      Loading...
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Store } from '../requests/store';
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

const currentRoute = computed(() => route.path === `/stores/${id}`);

const viewStore = () => {
  if (store.value) {
    router.push(`/stores/${store.value.id}/edit`);
  }
};

const deleteStore = async () => {
  const id = Number(route.params.id);
  try {
    const response = await storeInstance.DeleteStore(id);
    if (!response) {
      console.error("Erro");
    }
    router.push(`/stores`);
  } catch (error) {
    error.value = "Error";
  }
};

const goBack = () => {
  router.push(`/stores`);
};
</script>

<style scoped>
.store_container {
  color: white;
  margin-top: 1rem;
  margin-left: 1rem;
}

.store_header {
  margin-bottom: 1rem;
}

.store_content {
  color: white;
  background-color: rgb(240, 208, 168);
  margin-right: 1rem;
  padding-top: 1rem;
  padding-bottom: 1rem;
  border-radius: 0.5rem;
  ;
}

.store_buttons {
  display: flex;
  justify-content: end;
  gap: 1rem;
}

.store_button {
  height: 50px;
}

.store_image {
  width: 100px;
}

.stores_card_product {
  margin: 1rem;
  ;
}
</style>
