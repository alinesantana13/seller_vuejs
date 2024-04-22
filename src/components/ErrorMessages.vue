<template>
  <div class="container_message">
    <div>{{ message }}</div>
  </div>
</template>


<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps<{ message: string }>();
</script>

<style setup>
.container_message {
  background-color: red;
  color: white;
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 10px;
  margin-top: 10px;
}
</style>