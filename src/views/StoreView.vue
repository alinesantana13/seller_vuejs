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
        <div class="col-lg-6 col-md-6 col-sm-6 col-12 store_buttons">
          <button class="btn btn-warning store_button" @click="viewStore">Edit</button>
          <button class="btn btn-secondary store_button">Desativar</button>
          <button class="btn btn-danger store_button" @click="deleteStore">Delete</button>
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
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Store } from '../store';

interface StoreItem {
  id: number;
  name: string;
  image_url: string;
}

const storeInstance = new Store();

const store = ref<StoreItem | null>(null);
const error = ref<string | null>(null);

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

const deleteStore = async () => {
  const id = Number(route.params.id);
  console.log(id)
  const response = await storeInstance.DeleteStore(id);
  console.log(response);

  router.push(`/stores`);
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
  border-radius: 1rem;
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
</style>
