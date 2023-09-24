<script setup lang="ts">
import Input from "primevue/inputtext"
import Button from "primevue/button"
import axios from "axios"
import Card from 'primevue/card';
import Toast from 'primevue/toast';
import ProgressSpinner from 'primevue/progressspinner';
import { user } from '@/context/user.ts';

import { useToast } from 'primevue/usetoast';


import { ref } from 'vue'
import { useRouter } from "vue-router";

const email = ref('')
const password = ref('')

const loading = ref(false)

const toast = useToast();
const router = useRouter()

const login = () => {
  loading.value = true

  axios.post('https://nodejs-project-tj5s.onrender.com/user/login', {
    email: email.value,
    senha: password.value
  })
    .then(result => {
      const tokenString = `Bearer ${result.data.token}`;
      user.setUser(result.data)
      axios.defaults.headers.common['Authorization'] = tokenString
      localStorage.setItem('user', JSON.stringify(result.data));
      router.push('/home')
    })
    .catch(err => {
      toast.add({ severity: 'error', summary: 'Falha no login', detail: err.response.data.message, life: 3000 })
    })
    .finally(() => loading.value = false)
}

</script>

<template>
  <main class="container">
    <Card class="loginContainer">
      <template #content>
        <form class="content" @submit.prevent="login">
          <h2>Entrar</h2>
          <Input :pt="{ root: { class: 'input' } }" placeholder="Email" type="email" v-model="email" />
          <Input :pt="{ root: { class: 'input' } }" placeholder="Senha" type="password" v-model="password" />
          <Button type="submit" class="btn-login">Entrar
            <ProgressSpinner :pt="{
              root: { style: { height: '1.5rem', width: '4rem', margin: 0 } },
              circle: { style: { stroke: '#FFF', strokeWidth: 3, animation: 'none' } }
            }" v-if="loading" />
          </Button>
        </form>
        <div>
          <router-link to="/register">Não tem uma conta? Cadastre-se</router-link>
        </div>
      </template>
    </Card>
    <Toast />
  </main>
</template>

<style>
.container {
  height: 100vh;
  background-color: purple;

  display: flex;
  align-items: center;
  justify-content: center;
}

.loginContainer {
  padding: 0.5rem;
}

.content {
  display: flex;
  flex-direction: column;

  align-items: center;
}

.content h2 {
  margin-bottom: 0.8rem;
}

.btn-login {
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
}

.input {
  margin-bottom: 0.8rem;
}
</style>
