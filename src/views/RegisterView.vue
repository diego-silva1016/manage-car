<script setup lang="ts">
import Input from "primevue/inputtext"
import Button from "primevue/button"
import axios from "axios"
import Card from 'primevue/card';
import Toast from 'primevue/toast';
import ProgressSpinner from 'primevue/progressspinner';

import { useToast } from 'primevue/usetoast';


import { ref, computed } from 'vue'
import { useRouter } from "vue-router";

const name = ref('')
const email = ref('')
const password = ref('')

const isDisabled = computed(() => {
  return !name.value || !email.value || !password.value;
});

const loading = ref(false)

const toast = useToast();
const router = useRouter()

const register = () => {

  loading.value = true

  axios.post('https://nodejs-project-tj5s.onrender.com/user', {
    nome: name.value,
    email: email.value,
    senha: password.value,
  })
    .then(_result => {
      router.push('/')
    })
    .catch(err => {
      toast.add({ severity: 'error', summary: 'Falha na criação do usuário', detail: err.response.data.message, life: 3000 })
    })
    .finally(() => loading.value = false)
}

</script>

<template>
  <main class="container">
    <Card class="registerContainer">
      <template #content>
        <form class="content" @submit.prevent="register">
          <h2>Criar usuário</h2>
          <Input :pt="{ root: { class: 'input' } }" placeholder="Nome" type="name" v-model="name" />
          <Input :pt="{ root: { class: 'input' } }" placeholder="Email" type="email" v-model="email" />
          <Input :pt="{ root: { class: 'input' } }" placeholder="Senha" type="password" v-model="password" />
          <Button type="submit" class="btn-Register" :disabled="isDisabled">Criar
            <ProgressSpinner :pt="{
              root: { style: { height: '1.5rem', width: '4rem', margin: 0 } },
              circle: { style: { stroke: '#FFF', strokeWidth: 3, animation: 'none' } }
            }" v-if="loading" />
          </Button>
        </form>
        <router-link to="/">Voltar ao login</router-link>
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

.registerContainer {
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
