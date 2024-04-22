<template>
  <header>
    <NavBar />
  </header>
  <main>
    <div class="container_profile">
      <div>
        <img />
      </div>
      <div>
        {{ currentUser && currentUser.email }}
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import NavBar from '../components/NavBar.vue';
import { Auth } from '../auth'
import { ref } from 'vue'

const auth = new Auth()

const currentUser = ref(auth.currentUser())
</script>

<style setup>
.container_profile {
  color: white;
}
</style>