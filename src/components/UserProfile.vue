<script setup lang="ts">
import { Auth } from '../auth'
import { ref } from 'vue'

const auth = new Auth()

const isLoggedIn = ref(auth.isLoggedIn())
const currentUser = ref(auth.currentUser())

const signOut = function () {
  auth.signOut(() => isLoggedIn.value = auth.isLoggedIn())
}
</script>

<template>
  <main>
    <template v-if="isLoggedIn">
      <ul class="navbar-nav">
        <li class="nav-item p-1">
          Hi, {{ currentUser && currentUser.email }}
        </li>
        <li><a class="btn btn-primary" @click="signOut">Sign Out</a></li>
      </ul>
    </template>
    <template v-else>
      <ul class="navbar-nav">
        <li>
          <RouterLink class="btn btn-primary" :to="{ name: 'signin' }">
            Sign In
          </RouterLink>
        </li>
      </ul>
    </template>
  </main>
</template>