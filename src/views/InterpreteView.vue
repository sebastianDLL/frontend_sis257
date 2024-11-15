<script setup lang="ts">
import Button from 'primevue/button';
import { ref } from 'vue';
import InterpreteList from '../components/interpretes/InterpreteList.vue'
import InterpreteSave from '../components/interpretes/InterpreteSave.vue';

const mostrarDialog = ref<boolean>(false);
const InterpreteListRef = ref<typeof InterpreteList | null >(null);
const interpreteEdit = ref<any>(null);

function handleCreate() {
  interpreteEdit.value=null;
  mostrarDialog.value=true;
}

function handleEdit(interprete: any) {
  interpreteEdit.value=interprete;
  mostrarDialog.value=true;
}

function handleCloseDialog() {
  mostrarDialog.value=false;
}

function handleGuardar() {
  InterpreteListRef.value?.obtenerLista();
}

</script>

<template>
  <div class="m-8">
    <h1>Intérpretes</h1>
    <Button label="Crear Nuevo" icon="pi pi-plus" @click="handleCreate" />
    <InterpreteList ref="InterpreteListRef" @edit="handleEdit"  />
    <InterpreteSave 
    :mostrar="mostrarDialog"
    :interprete="interpreteEdit"
    :modoEdicion="!!interpreteEdit"
    @guardar="handleGuardar"
    @close="handleCloseDialog"
    />
  </div>
</template>

<style scoped></style>