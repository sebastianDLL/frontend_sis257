<script setup lang="ts">
import Button from 'primevue/button';
import { ref } from 'vue';
import CancionList from '../components/canciones/CancionList.vue'
import CancionSave from '../components/canciones/CancionSave.vue';

const mostrarDialog = ref<boolean>(false);
const CancionListRef = ref<typeof CancionList | null >(null);
const cancionEdit = ref<any>(null);

function handleCreate() {
  cancionEdit.value=null;
  mostrarDialog.value=true;
}

function handleEdit(cancion: any) {
  cancionEdit.value=cancion;
  mostrarDialog.value=true;
}

function handleCloseDialog() {
  mostrarDialog.value=false;
}

function handleGuardar() {
  CancionListRef.value?.obtenerLista();
}

</script>

<template>
  <div class="m-8">
    <h1>Canciones</h1>
    <Button label="Crear Nuevo" icon="pi pi-plus" @click="handleCreate" />
    <CancionList ref="CancionListRef" @edit="handleEdit"  />
    <CancionSave 
    :mostrar="mostrarDialog"
    :cancion="cancionEdit"
    :modoEdicion="!!cancionEdit"
    @guardar="handleGuardar"
    @close="handleCloseDialog"
    />
  </div>
</template>

<style scoped></style>