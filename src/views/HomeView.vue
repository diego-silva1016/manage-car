<script setup lang="ts">
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from "primevue/button"
import Dialog from 'primevue/dialog';
import Input from "primevue/inputtext"

import axios from "axios"

import { user } from '@/context/user.ts';
import { ref, onBeforeMount } from 'vue'

const cars = ref([])
const visible = ref(false)
const newCar = ref({
  placa: '',
  modelo: '',
  ano: ''
})

const getCars = () => {
  axios.get('https://nodejs-project-tj5s.onrender.com/car')
    .then(result => {
      cars.value = result.data
    })
    .catch(err => {
      console.log(err)
    })
}

const postNewCar = () => {
  axios.post('https://nodejs-project-tj5s.onrender.com/car', {
    ...newCar.value
  })
    .then(() => {
      visible.value = false
     getCars()
    })
    .catch(err => {
      console.log(err)
    })
}

onBeforeMount(() => {
  getCars()
})
</script>

<template>
  <div class="about">
    <header class="headerContainer">
      <h1>Gerenciamento de carros</h1>

      <span>Bem vindo, <strong>{{ user.user.nome }}</strong></span>
    </header>
    <div class="content">
      <Button class="btn" @click="visible = true">Cadastrar carro</Button>
      <DataTable :value="cars" :pt="{
        root: { style: { width: '100%' } }
      }">
        <Column field="placa" header="Placa"></Column>
        <Column field="modelo" header="Modelo"></Column>
        <Column field="ano" header="Ano"></Column>
      </DataTable>
    </div>
  </div>
  <Dialog v-model:visible="visible" modal header="Cadastrar" :style="{ width: '20rem' }" :pt="{
        content: { class: 'modalContent' }
    }">
    <Input :pt="{ root: { class: 'input' } }" placeholder="Placa" type="text" v-model="newCar.placa" />
    <Input :pt="{ root: { class: 'input' } }" placeholder="Modelo" type="text" v-model="newCar.modelo" />
    <Input :pt="{ root: { class: 'input' } }" placeholder="Ano" type="number" v-model="newCar.ano" />
    <Button class="btn" @click="postNewCar">Cadastrar</Button>
  </Dialog>
</template>

<style>
.headerContainer {
  background-color: purple;

  padding: 1rem;

  height: 5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  color: #fff;
}

.content {
  padding: 1rem;
  display: flex;
}

.btn {
  margin-bottom: 1.5rem;
  margin-left: auto;
}

.input {
  margin-bottom: 0.8rem;
}

.modalContent{
  display: flex;
  flex-direction: column;
}
</style>
