<template>
  <div class="store_container_edit">
    <h1>Edit Store</h1>
    <div v-if="store">
      <form @submit.prevent="updateStore">
        <div>
          <label class="" for="name">Name: </label>
          <input class="form-control w-50 mb-3" type="text" id="name" v-model="store.name" />
        </div>
        <div>
          <label class="" for="image">Image: </label>
          <input class="" type="file" id="image" @change="handleFileUpdate" />
        </div>
        <button class="btn btn-success mt-4 mb-2" type="submit">Update Store</button>
      </form>
      <button class="btn btn-primary" @click="goBack">
        To go back</button>
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
import { Store } from '../../requests/store';
import type { IStore } from '../../interfaces/interfaces';

const storeInstance = new Store();

const store = ref<IStore | null>(null);
const error = ref<string | null>(null);
const selectedFile = ref<File | null>(null);

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

const handleFileUpdate = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files.length > 0) {
    selectedFile.value = target.files[0];
  }
};

const updateStore = async () => {
  if (!store.value) return;

  const formData = new FormData();
  formData.append('store[name]', store.value.name);
  if (selectedFile.value) {
    formData.append('store[image]', selectedFile.value);
  }

  try {
    await storeInstance.UpdateStore(store.value.id, formData);
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
