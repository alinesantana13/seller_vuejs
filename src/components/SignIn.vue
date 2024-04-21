<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { Auth } from '../auth'
const router = useRouter()
const awaiting = ref(false)
const email = defineModel<string>('email')
const password = defineModel<string>('password')
const remember = defineModel<boolean>('remember', { default: true })
function onSubmit(form: Event) {
  let auth = new Auth(remember.value)
  awaiting.value = true
  auth.signIn(email.value || ''
    , password.value || ''
    , () => {
      awaiting.value = false
      router.push('/')
    }, () => {
      awaiting.value = false
      console.log('não foi dessa vez!')
    })
}
</script>

<template>
  <div>
    <div class="container_signin">
      <div class="signin_title">
        <h1>Sign In</h1>
      </div>
      <div class="signin_form">
        <form @submit.prevent="onSubmit">
          <label>E-Mail: </label>
          <input class="form-control" v-model="email" type="email"><br />
          <label>Senha: </label>
          <input class="form-control" v-model="password" type="password"><br />
          <div class="signin_remember">
            <label class="form-check-label">Remember Me </label>
            <input class="form-check-input" v-model="remember" type="checkbox" /><br />
          </div>
          <button class="btn btn-primary" type="submit" v-show="!awaiting">Sign In</button>
        </form>
      </div>
    </div>
  </div>
</template>

<style setup>
.container_signin {
  display: flex;
  flex-direction: column;
  border: 1px solid red;
  padding-bottom: 20px;
  padding-top: 20px;
  justify-content: center;
  align-items: center;
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