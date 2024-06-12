<template>
  <div class="store_container_edit">
    <h1>Edit Store</h1>
    <div v-if="store">
      <form @submit.prevent="updateStore">
        <div>
          <label class="" for="name">Name: </label>
          <input class="form-control w-50 mb-2" type="text" id="name" v-model="store.name" />
        </div>
        <button class="btn btn-success mb-2" type="submit">Update Store</button>
      </form>
      <button class="btn btn-primary" @click="goBack">
        To go back</button>
    </div>
    <div v-else-if="error">
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
import { Store } from '../../store';

interface StoreItem {
  id: number;
  name: string;
  image?: string;
}

const storeInstance = new Store();

const store = ref<StoreItem | null>(null);
const error = ref<string | null>(null);

const route = useRoute();
const router = useRouter();

const fetchStore = async (id: number) => {
  try {
    const response = await storeInstance.GetStore(id);
    store.value = response;
  } catch (err: any) {
    error.value = err.toString();
  }
};

const updateStore = async () => {
  if (!store.value) return;

  try {
    await storeInstance.UpdateStore(store.value.id, store.value.name);
    router.push(`/stores/${store.value.id}`);
  } catch (err: any) {
    error.value = err.toString();
  }
};

onMounted(() => {
  const id = Number(route.params.id);
  if (!isNaN(id)) {
    fetchStore(id);
  } else {
    error.value = "Invalid store ID.";
  }
});

const goBack = () => {
  router.back();
};
</script>

<style scoped>
.store_container_edit {
  color: white;
  margin-left: 1rem;
  margin-top: 1rem;
}
</style>
