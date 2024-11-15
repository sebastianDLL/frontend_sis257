<script setup lang="ts">
import http from '../../plugins/axios'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import Select from 'primevue/select'
import { computed, onMounted, ref, watch } from 'vue'
import type { Interprete } from '../../models/interprete'
import type { Album } from '../../models/album'
import InputMask from 'primevue/inputmask'

const ENDPOINT = 'albumes'
const props = defineProps({
    mostrar: Boolean,
    album: {
        type: Object as () => Album,
        default: () => ({}) as Album
    },
    modoEdicion: Boolean
})
const emit = defineEmits(['guardar', 'close'])

const dialogVisible = computed({
    get: () => props.mostrar,
    set: (value) => {
        if (!value) emit('close')
    }
})

const interpretes = ref<Interprete[]>([])
const album = ref<Album>({ ...props.album })

watch(
    () => props.album,
    (newVal) => {
        album.value = { ...newVal }
    }
)

async function handleSave() {
    try {
        const body = {
            idAlbum: album.value.id,
            idInterprete: album.value.interprete.id,
            nombre: album.value.nombre,
            fechaLanzamiento: album.value.fechaLanzamiento,
        }
        if (props.modoEdicion) {
            await http.patch(`${ENDPOINT}/${album.value.id}`, body)
        } else {
            await http.post(ENDPOINT, body)
        }
        emit('guardar')
        album.value = {} as Album
        dialogVisible.value = false
    } catch (error: any) {
        alert(error?.response?.data?.message)
    }
}


async function obtenerInterpretes() {
    interpretes.value = await http.get('interpretes').then((res) => res.data)
}

onMounted(() => {
    obtenerInterpretes()
})

</script>

<template>
    <div class="card flex justify-center">
        <Dialog v-model:visible="dialogVisible" :header="props.modoEdicion ? 'Editar' : 'Crear'" style="width: 25rem">
            <div class="flex items-center gap-4 mb-4">
                <label for="nombre" class="font-semibold w-24">Nombre</label>
                <InputText id="nombre" v-model="album.nombre" class="flex-auto" autocomplete="off" />
            </div>
            <div class="flex items-center gap-4 mb-4">
                <label for="interprete" class="font-semibold w-24">Interpretes</label>
                <Select id="interprete" v-model="album.interprete" :options="interpretes" optionLabel="nombre"
                    class="flex-auto" />
            </div>
            <div class="flex items-center gap-4 mb-4">
                <label for="fechaLanzamiento" class="font-semibold w-24">Fecha de Lanzamiento</label>
                <InputMask id="fechaLanzamiento" v-model="album.fechaLanzamiento" class="flex-auto" mask="9999-99-99" placeholder="YYYY-MM-DD" />
            </div>
            <div class="flex justify-end gap-2">
                <Button type="button" label="Cancelar" icon="pi pi-times" severity="secondary"
                    @click="dialogVisible = false"></Button>
                <Button type="button" label="Guardar" icon="pi pi-save" @click="handleSave"></Button>
            </div>
        </Dialog>
    </div>
</template>

<style scoped></style>