<template>
  <div class="store_container_edit">
    <h3>Edit Product</h3>
    <div v-if="product">
      <form @submit.prevent="updateProduct">
        <div>
          <label class="" for="title">Name: </label>
          <input class="form-control w-50 mb-3" type="text" id="title" v-model="product.title" />
        </div>
        <div>
          <label class="" for="price">Price: </label>
          <input class="form-control w-50 mb-3" type="text" id="price" v-model="product.price" />
        </div>
        <div>
          <label class="" for="image">Image: </label>
          <input class="" type="file" id="image" @change="handleFileUpdate" />
        </div>
        <button class="btn btn-success mt-4 mb-2" type="submit">Update Product</button>
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
import { Product } from '../../requests/product';
import type { IProduct } from '../../interfaces/interfaces.ts'

const productInstance = new Product();

const product = ref<IProduct | null>(null);
const error = ref<string | null>(null);
const selectedFile = ref<File | null>(null);

const route = useRoute();
const router = useRouter();

const fetchProduct = async (storeId: number, productId: number) => {
  try {
    const response = await productInstance.GetProduct(storeId, productId);
    product.value = response;
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

const updateProduct = async () => {
  if (!product.value) return;
  const formData = new FormData();
  formData.append('product[title]', product.value.title);
  formData.append('product[price]', product.value.price);
  if (selectedFile.value) {
    formData.append('product[image]', selectedFile.value);
  }

  try {
    await productInstance.UpdateProduct(product.value.store_id, product.value.id, formData);
    router.push(`/stores/${product.value.store_id}/products/${product.value.id}`);
  } catch (err: any) {
    error.value = err.toString();
  }
};

onMounted(() => {
  const storeId = Number(route.params.id);
  const productId = Number(route.params.productId);
  if (!isNaN(storeId) && !isNaN(productId)) {
    fetchProduct(storeId, productId);
  } else {
    error.value = "Invalid product ID.";
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
