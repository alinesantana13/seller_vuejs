<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { Auth } from '../auth'
import ErrorMessages from './ErrorMessages.vue';

const router = useRouter()
const awaiting = ref(false)
const messageVerify = ref(false);

const email = defineModel<string>('email')
const password = defineModel<string>('password')
const remember = defineModel<boolean>('remember', { default: true })

let error = ref("");

const auth = new Auth(remember.value)
function onSubmit(form: Event) {
  awaiting.value = true
  auth.signIn(email.value || ''
    , password.value || ''
    , () => {
      awaiting.value = false
      router.push('/profile')
    }, () => {
      awaiting.value = false
      error.value = auth.getErrorMessage();
      messageVerify.value = true;
    })
}

let success = ref("");
success.value = auth.getSuccessMessage();
console.log(success.value);
</script>

<template>
  <div class="container_signin">
    <div class="container_signin_center">
      <div v-if="messageVerify">
        <ErrorMessages :message="error" />
      </div>
      <div class="signin_title">
        <h1>Sign In</h1>
      </div>
      <div class="signin_form">
        <form @submit.prevent="onSubmit">
          <label>E-mail: </label>
          <input class="form-control" v-model="email" type="email" required><br />
          <label>Password : </label>
          <input class="form-control" v-model="password" type="password" required><br />
          <div class="signin_remember">
            <label class="form-check-label">Remember Me </label>
            <input class="form-check-input" v-model="remember" type="checkbox" /><br />
          </div>
          <button class="btn btn-primary" type="submit" v-show="!awaiting">Sign In</button>
        </form>
      </div>
      <div class="">
        <RouterLink class="sigin_link" :to="{ name: 'signup' }">
          Sign Up
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<style setup>
.container_signin {
  width: 100%;
  padding-top: 100px;
}

.container_signin_center {
  display: flex;
  flex-direction: column;
  width: 370px;
  margin-left: 15rem;
  padding-bottom: 20px;
  padding-top: 30px;
  justify-content: center;
  align-items: center;
  color: white;
  background-color: rgb(237, 102, 40);
  border-radius: 15px;
}

.signin_form {
  width: 300px;
}

.signin_remember {
  display: flex;
  gap: 5px;
  margin-bottom: 10px;
}
</style>