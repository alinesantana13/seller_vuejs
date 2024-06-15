<template>
  <div class="store_container_edit">
    <h3>New Product</h3>
    <div>
      <form @submit.prevent="createProduct">
        <div>
          <label class="" for="title">Name: </label>
          <input class="form-control w-50 mb-3" type="text" id="title" v-model="productTitle" />
        </div>
        <div>
          <label class="" for="price">Price: </label>
          <input class="form-control w-50 mb-3" type="text" id="price" v-model="productPrice" />
        </div>
        <div>
          <label class="" for="image">Image: </label>
          <input class="" type="file" id="image" @change="handleFileCreate" />
        </div>
        <button class="btn btn-success mt-4 mb-2" type="submit">Create Product</button>
      </form>
      <button class="btn btn-primary" @click="goBack">
        To go back</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Product } from '../../requests/product';
import type { IProduct } from '../../interfaces/interfaces.ts'

const productInstance = new Product();

const productTitle = ref<string>('');
const productPrice = ref<string>('');
const error = ref<string | null>(null);
const selectedFile = ref<File | null>(null);

const route = useRoute();
const router = useRouter();

const handleFileCreate = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files.length > 0) {
    selectedFile.value = target.files[0];
  }
};
const storeId = Number(route.params.id);

const createProduct = async () => {
  const formData = new FormData();
  formData.append('product[title]', productTitle.value);
  formData.append('product[price]', productPrice.value);
  if (selectedFile.value) {
    formData.append('product[image]', selectedFile.value);
  }

  try {
    const newProduct = await productInstance.CreateProduct(storeId, formData);
    router.push(`/stores/${storeId}/products/${newProduct.id}`);
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
