<script setup lang="ts">
import { computed, ref } from "vue";
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';

// constantes referenciadas
const titulo = ref<string>("Prueba");
const contador = ref<number>(0);
const colorIngles = ref<string>("");
const colorEspañol = ref<string>("");
const colores = ref([
    { clave:"red",valor: "Rojo" }, 
    {clave:"green", valor: "Verde" }, 
    {clave:"blue", valor: "Azul" },
    {clave:"black", valor: "Negro" }
]);

// funciones
function incrementar() {
    contador.value++;
}

function decrementar() {
    contador.value--;
}

function agregarcolor(){
    colores.value.push({clave:colorIngles.value,valor:colorEspañol.value})
    colorIngles.value='';
    colorEspañol.value='';
}

// propiedades computadas
const parImpar= computed(() => contador.value % 2 == 0 ? 'Par' : 'Impar' )

</script>


<template>
    <div>
        <!-- prop reactivas -->
        <h1>{{ titulo }} - {{ contador }} - {{ parImpar }}</h1>

        <!-- v-model -->
        Cambiar Titulo <InputText type="text" v-model="titulo" /><br>
        
        <!-- v-on --> 
        <Button label="Incrementar" @click="incrementar" />
        <Button label="Decrementar" @click="decrementar" />
        
        <!-- v-if !! v-else -->
        <h2 v-if="contador % 2 == 0">Es Par</h2>
        <h2 v-else>Es Impar</h2><br>

        Color en Ingles <InputText type="text" v-model="colorIngles"/><br>
        Color en Español <InputText type="text" v-model="colorEspañol"/><br>
        <Button label="Agregar Color" severity="success" icon="pi pi-plus" @click="agregarcolor" raised />


        
        <!-- v-for (objetos) --> 
        <ul>
            <li v-for="(color,index) in colores" :key="index" :style="'color:'+color.clave">
                {{ color.valor }}
            </li>
        </ul>

    </div>
</template>



<style scoped>


</style>