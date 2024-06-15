<template>
  <div class="store_container_edit">
    <h1>Create Store</h1>
    <div v-if="!error">
      <form @submit.prevent="createStore">
        <div>
          <label class="" for="name">Name: </label>
          <input class="form-control w-50 mb-2" type="text" id="name" v-model="storeName" />
        </div>
        <div>
          <label for="image">Image: </label>
          <input class="" type="file" id="image" @change="handleFileCreate" />
        </div>
        <button class="btn btn-success mb-2" type="submit">Create</button>
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
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { Store } from '../../requests/store';

const storeInstance = new Store();

const storeName = ref<string>('');
const error = ref<string | null>(null);
const selectedFile = ref<File | null>(null);

const router = useRouter();

const handleFileCreate = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files.length > 0) {
    selectedFile.value = target.files[0];
  }
};

const createStore = async () => {
  if (!storeName.value) {
    error.value = "Store name is required.";
    return;
  }

  const formData = new FormData();
  formData.append('store[name]', storeName.value);
  if (selectedFile.value) {
    formData.append('store[image]', selectedFile.value);
  }

  try {
    const newStore = await storeInstance.CreateStore(formData);
    router.push(`/stores/${newStore.id}`);
  } catch (err: any) {
    error.value = err.toString();
  }
};

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
