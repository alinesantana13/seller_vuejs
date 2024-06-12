<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue';
</script>

<template>
  <header>
    <NavBar :items="['Home', 'Stores']" />
  </header>
  <RouterView />
</template>

<style scoped></style>
