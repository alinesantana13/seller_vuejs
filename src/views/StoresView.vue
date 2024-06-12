<template>
  <div class="stores_container mt-2">
    <div class="stores_name">
      <h1>Stores</h1>
    </div>
    <ul>
      <li v-for="store in stores" :key="store.id">
        <CardStore :store="store" />
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import CardStore from '../components/CardStore.vue';
import { ref, onMounted } from 'vue';
import { Store } from '../store';

interface StoreItem {
  id: number;
  name: string;
}

// Instanciar a classe Store
const storeInstance = new Store();

const stores = ref<StoreItem[] | null>(null);
const error = ref<string | null>(null)

const fetchStores = async () => {
  try {
    const response = await storeInstance.GetStores();
    stores.value = await response;
    return response;
  } catch (err: any) {
    error.value = err.toString()
  }
};

onMounted(() => {
  fetchStores();
});

</script>

<style scoped>
.stores_name {
  color: white;
  display: flex;
  justify-content: center;
}
</style>
