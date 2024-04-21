<script setup lang="ts">
import { RouterLink } from 'vue-router'
import UserProfile from '../components/UserProfile.vue'
import NavBar from '@/components/NavBar.vue';
</script>
<template>
  <header>
    <NavBar />
  </header>
  <main>
    <UserProfile />
  </main>
</template>
