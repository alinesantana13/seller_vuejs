<template>
  <div class="store_container">
    <h1>Store</h1>

    <div class="store_name" v-if="store">
      <div class="row">
        <div class="col-6">
          <h3>{{ store.name }}</h3>
        </div>
        <div class="col-6 store_button">
          <button class="btn btn-warning" @click="viewStore">Edit</button>
          <button class="btn btn-secondary">Desativar</button>
          <button class="btn btn-danger mx-4">Delete</button>
        </div>
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
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Store } from '../store';

interface StoreItem {
  id: number;
  name: string;
}

const storeInstance = new Store();

const store = ref<StoreItem | null>(null);
const error = ref<string | null>(null);


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
const router = useRouter();

onMounted(() => {
  const id = Number(route.params.id);
  if (!isNaN(id)) {
    fetchStore(id);
  } else {
    error.value = "Invalid store ID.";
  }
});


const viewStore = () => {
  if (store.value) {
    router.push(`/stores/${store.value.id}/edit`);
  }
};


</script>

<style scoped>
.store_container {
  color: white;
  margin-top: 1rem;
  margin-left: 1rem;
}

.store_name {
  color: white;
}

.store_button {
  display: flex;
  justify-content: end;
  gap: 1rem;
}
</style>
