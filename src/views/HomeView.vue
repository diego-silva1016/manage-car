<script setup lang="ts">
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from "primevue/button"
import Dialog from 'primevue/dialog';
import Input from "primevue/inputtext"

import axios from "axios"

import { user, type User } from '@/context/user.ts';
import { ref, onBeforeMount } from 'vue'
import router from '@/router';

const carInitialValue = {
  id: 0,
  placa: '',
  modelo: '',
  ano: ''
}

const cars = ref([])

const visible = ref(false)
const visibleDelete = ref(false)
const idToDelete = ref(0)

const car = ref({...carInitialValue})

const isEditing = ref(false)
const loading = ref(false)


const getCars = () => {
  loading.value = true

  axios.get('https://nodejs-project-tj5s.onrender.com/car')
    .then(result => {
      cars.value = result.data
    })
    .catch(err => {
      console.log(err)
    })
    .finally(() => loading.value = false)
}

const postNewCar = () => {
  axios.post('https://nodejs-project-tj5s.onrender.com/car', {
    ...car.value
  })
    .then(() => {
      visible.value = false
     getCars()
    })
    .catch(err => {
      console.log(err)
    })
}

const putCar = () => {
  axios.put(`https://nodejs-project-tj5s.onrender.com/car/${car.value.id}`, {
    ...car.value
  })
    .then(() => {
      visible.value = false
     getCars()
    })
    .catch(err => {
      console.log(err)
    })
}

const deleteCar = () => {
  axios.delete(`https://nodejs-project-tj5s.onrender.com/car/${idToDelete.value}`)
    .then(() => {
      visibleDelete.value = false
     getCars()
    })
    .catch(err => {
      console.log(err)
    })
}

const logout = () => {
  user.setUser(null as unknown as User);
  localStorage.removeItem('user');
  router.push('/');
}

onBeforeMount(() => {
  getCars()
})
</script>

<template>
  <div class="about">
    <header class="headerContainer">
      <h1>Gerenciamento de carros</h1>
      <div class="userContainer">
        <span>Bem vindo, <strong :title="user.user.nome">{{ user.user.nome }}</strong></span>
        <Button @click="logout" severity="warning">Sair</Button>
      </div>
    </header>
    <div class="content">
      <Button class="btn" @click="visible = true">Cadastrar carro</Button>
      <DataTable :value="cars" :pt="{
        root: { style: { width: '100%' } }
      }" :loading="loading" lazy>
        <Column field="placa" header="Placa"></Column>
        <Column field="modelo" header="Modelo"></Column>
        <Column field="ano" header="Ano"></Column>
        <Column header="Ações" style="width: 20%">
          <template #body="slotProps">
          <Button @click="isEditing = true, car = {...slotProps.data}, visible = true">Editar</Button>
          <Button @click="idToDelete = slotProps.data.id, visibleDelete = true" class="btn-delete" severity="danger">Deletar</Button>
        </template>
        </Column>
      </DataTable>
    </div>
  </div>
  
  <Dialog v-model:visible="visible" modal :header="isEditing ? 'Editar' : 'Cadastrar'" :style="{ width: '20rem' }" :pt="{
        content: { class: 'modalContent' } 
    }" v-on:hide="isEditing = false, car = {...carInitialValue}">
    <Input :pt="{ root: { class: 'input' } }" placeholder="Placa" type="text" v-model="car.placa" />
    <Input :pt="{ root: { class: 'input' } }" placeholder="Modelo" type="text" v-model="car.modelo" />
    <Input :pt="{ root: { class: 'input' } }" placeholder="Ano" type="number" v-model="car.ano" />
    <Button v-if="!isEditing" class="btn" @click="postNewCar">Cadastrar</Button>
    <Button v-if="isEditing" class="btn" @click="putCar">Editar</Button>
  </Dialog>

  <Dialog v-model:visible="visibleDelete" modal header="Deletar" :style="{ width: '20rem' }" :pt="{
        content: { class: 'modalContent' } 
    }" v-on:hide="visibleDelete = false, idToDelete = 0">
    <p :style="{ marginBottom: '1rem' }">Ao confirmar, esse veículo será deletado permanentemente.</p>
    <Button class="btn" @click="deleteCar" severity="danger">Deletar</Button>
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

.btn-delete {
  background-color: red;
  margin-left: 0.5rem;
}

.input {
  margin-bottom: 0.8rem;
}

.modalContent{
  display: flex;
  flex-direction: column;
}

.userContainer{
  display: flex;
  align-items: center;
  width: 15%;
  justify-content: flex-end;
}

.userContainer span{
  max-width: 21ch;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-right: 4px;
}
</style>
