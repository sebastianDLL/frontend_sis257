<script setup lang="ts">
import Button from 'primevue/button';
import { ref } from 'vue';
import AlbumList from '../components/albumes/AlbumList.vue'
import AlbumSave from '../components/albumes/AlbumSave.vue';

const mostrarDialog = ref<boolean>(false);
const AlbumListRef = ref<typeof AlbumList | null >(null);
const albumEdit = ref<any>(null);

function handleCreate() {
  albumEdit.value=null;
  mostrarDialog.value=true;
}

function handleEdit(album: any) {
  albumEdit.value=album;
  mostrarDialog.value=true;
}

function handleCloseDialog() {
  mostrarDialog.value=false;
}

function handleGuardar() {
  AlbumListRef.value?.obtenerLista();
}

</script>

<template>
  <div>
    <h1>Albumes</h1>
    <Button label="Crear Nuevo" icon="pi pi-plus" @click="handleCreate" />
    <AlbumList ref="AlbumListRef" @edit="handleEdit"  />
    <AlbumSave 
    :mostrar="mostrarDialog"
    :album="albumEdit"
    :modoEdicion="!!albumEdit"
    @guardar="handleGuardar"
    @close="handleCloseDialog"
    />
  </div>
</template>

<style scoped></style>