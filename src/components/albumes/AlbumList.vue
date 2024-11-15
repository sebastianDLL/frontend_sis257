<script setup lang="ts">
import type { Album } from '../../models/album'
import http from '../../plugins/axios'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import { onMounted, ref } from 'vue'

const ENDPOINT = 'albumes'
let albumes = ref<Album[]>([])

const emit = defineEmits(['edit'])
const albumDelete = ref<Album | null>(null)
const mostrarConfirmDialog = ref<boolean>(false)

async function obtenerLista() {
  albumes.value = await http.get(ENDPOINT).then((response) => response.data)
}

function emitirEdicion(album: Album) {
  emit('edit', album)
}

function mostrarEliminarConfirm(album: Album) {
  albumDelete.value = album
  mostrarConfirmDialog.value = true
}

async function eliminar() {
  await http.delete(`${ENDPOINT}/${albumDelete.value?.id}`)
  obtenerLista()
  mostrarConfirmDialog.value = false
}

onMounted(() => {
  obtenerLista()
})

defineExpose({ obtenerLista })
</script>

<template>
  <div>
    <table>
      <thead>
        <tr>
          <th>Nro.</th>
          <th>Nombre</th>
          <th>Interprete</th>
          <th>Fecha de Lanzamiento</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(album, index) in albumes" :key="album.id">
          <td>{{ index + 1 }}</td>
          <td>{{ album.nombre }}</td>
          <td>{{ album.interprete.nombre }}</td>
          <td>{{ album.fechaLanzamiento }}</td>
            <Button icon="pi pi-pencil" aria-label="Editar" text @click="emitirEdicion(album)" />
            <Button icon="pi pi-trash" aria-label="Eliminar" text @click="mostrarEliminarConfirm(album)" />
        </tr>
      </tbody>
    </table>

    <Dialog v-model:visible="mostrarConfirmDialog" header="Confirmar Eliminación" :style="{ width: '25rem' }">
      <p>¿Estás seguro de que deseas eliminar este registro?</p>
      <div class="flex justify-end gap-2">
        <Button type="button" label="Cancelar" severity="secondary" @click="mostrarConfirmDialog = false" />
        <Button type="button" label="Eliminar" @click="eliminar" />
      </div>
    </Dialog>
  </div>
</template>

<style scoped></style>