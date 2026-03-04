<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { typeColors } from '@/utils/typeColors'

const route = useRoute()
const router = useRouter()
const pokemon = ref(null)

const getTypeColor = (type) =>
    typeColors[type] || typeColors.unknown


const getStatWidth = (value) => {
    const maxStat = 255
    return `${Math.min((value / maxStat) * 100, 100)}%`
}

const back = () => {
    router.push('/pokemon')
}

onMounted(async () => {
    const { data } = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${route.params.name}`
    )
    pokemon.value = data
})
</script>

<template>
    <div class="min-h-screen bg-linear-to-br from-gray-100 to-gray-200 flex items-center justify-center p-4">
        <div v-if="pokemon" class="w-full max-w-md lg:max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden">
            <div class="h-2" :style="{ backgroundColor: getTypeColor(pokemon.types[0].type.name) }"></div>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
                <!-- Imagen -->
                <div class="flex items-center justify-center">
                    <img :src="pokemon.sprites.other['official-artwork'].front_default" class="w-48 lg:w-72" />
                </div>

                <!-- Información -->
                <div>
                    <h2 class="text-3xl font-bold capitalize text-center lg:text-left">
                        {{ pokemon.name }}
                    </h2>

                    <!-- Tipos -->
                    <div class="flex justify-center lg:justify-start gap-2 mt-2">
                        <span v-for="t in pokemon.types" :key="t.type.name"
                            class="px-4 py-1 text-sm rounded-full text-white capitalize shadow"
                            :style="{ backgroundColor: getTypeColor(t.type.name) }">
                            {{ t.type.name }}
                        </span>
                    </div>

                    <!-- Datos -->
                    <div class="mt-4 grid grid-cols-2 gap-4 text-sm">
                        <p><strong>Altura:</strong> {{ pokemon.height / 10 }} m</p>
                        <p><strong>Peso:</strong> {{ pokemon.weight / 10 }} kg</p>
                    </div>

                    <!-- Stats -->
                    <div class="mt-6">
                        <h3 class="font-semibold mb-3">Estadísticas</h3>

                        <div v-for="s in pokemon.stats" :key="s.stat.name" class="mb-3">
                            <div class="flex justify-between text-xs mb-1">
                                <span class="capitalize">{{ s.stat.name }}</span>
                                <span>{{ s.base_stat }}</span>
                            </div>

                            <div class="w-full bg-gray-200 rounded h-3 overflow-hidden">
                                <div class="h-3 rounded transition-all duration-300" :style="{
                                    width: getStatWidth(s.base_stat),
                                    backgroundColor: getTypeColor(pokemon.types[0].type.name)
                                }"></div>
                            </div>
                        </div>
                    </div>

                    <button @click="back" class="mt-6 w-full bg-gray-300 py-2 rounded hover:bg-gray-400">
                        Volver
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>