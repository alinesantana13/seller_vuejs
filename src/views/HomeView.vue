<script setup lang="ts">
import { RouterLink } from 'vue-router'
import NavBar from '@/components/NavBar.vue';
</script>
<template>
  <header>
    <NavBar />
  </header>
  <main>
    <div class="container_home">
      <h1>Seja bem-vindo!</h1>
    </div>
  </main>
</template>

<style stup>
.container_home {
  color: white;
  margin: 10px
}
</style>
