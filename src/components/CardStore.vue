<template>
  <div class="card_store">
    <h2>{{ store.name }}</h2>
    <button class="btn btn-primary" @click="viewStore">Visualizar</button>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import { useRouter } from 'vue-router';

interface StoreItem {
  id: number;
  name: string;
}

const props = defineProps<{ store: StoreItem }>();
const router = useRouter();

const viewStore = () => {
  router.push(`/stores/${props.store.id}`);
};

</script>

<style scoped>
.card_store {
  background-color: aliceblue;
  width: 300px;
  height: 100px;
  border-radius: 15px;
  padding: 10px;
}
</style>