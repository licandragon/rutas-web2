<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { RouterLink } from 'vue-router'

const search = ref('')
const page = ref(1)
const limit = ref(10)

const pokemon = ref([])
const total = ref(0)
const allPokemon = ref([])

const loading = ref(false)
const error = ref('')

const isSearching = computed(() => search.value.trim() !== '')

const totalPages = computed(() => {
    const pages = Math.ceil(total.value / limit.value)
    return pages > 0 ? pages : 1
})

/**
 * Fetch que btiene los Pokémon desde la PokeAPI.
 * - Si hay búsqueda: obtiene todos los pokemons y se filtran datos.
 * - Si no hay búsqueda: usa paginación con limit y offset propios de la PokeApi.
 */
const fetchPokemon = async () => {
    loading.value = true
    error.value = ''

    try {
        if (isSearching.value) {
            if (!allPokemon.value.length) {
                const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1350')
                const data = await res.json()
                allPokemon.value = data.results
            }

            const filtered = allPokemon.value.filter(p =>
                p.name.includes(search.value.toLowerCase())
            )

            total.value = filtered.length

            const start = (page.value - 1) * limit.value
            const end = start + limit.value

            pokemon.value = filtered.slice(start, end)
        } else {
            const offset = (page.value - 1) * limit.value
            const res = await fetch(
                `https://pokeapi.co/api/v2/pokemon?limit=${limit.value}&offset=${offset}`
            )
            const data = await res.json()

            pokemon.value = data.results
            total.value = data.count
        }
    } catch (e) {
        error.value = 'Error al cargar Pokémon'
    } finally {
        loading.value = false
    }
}

// Al cambiar el texto de búsqueda, regresa a la página 1
watch(search, () => {
    page.value = 1
    fetchPokemon()
})

// Al cambiar el límite, regresa a la página 1
watch(limit, () => {
    page.value = 1
    fetchPokemon()
})


// Controles de Paginacion

const nextPage = () => {
    if (page.value < totalPages.value) {
        page.value++
        fetchPokemon()
    }
}

const prevPage = () => {
    if (page.value > 1) {
        page.value--
        fetchPokemon()
    }
}
//Se cargan datos iniciales
onMounted(fetchPokemon)
</script>

<template>
    <section class="min-h-screen bg-linear-to-br from-slate-100 via-slate-200 to-slate-300 py-10 px-4">
        <div class="max-w-7xl mx-auto bg-white rounded-2xl shadow-xl p-6 md:p-10">
            <!-- Título -->
            <header class="mb-8 text-center">
                <h1 class="text-4xl font-extrabold text-gray-800 tracking-wide">
                    Pokédex
                </h1>
                <p class="text-gray-500 mt-2">
                    Explora y busca Pokémon
                </p>
            </header>

            <!-- Controles -->
            <div class="flex flex-col md:flex-row gap-4 mb-8 justify-between items-center">

                <!-- Buscador -->
                <input v-model="search" type="text" placeholder="Buscar Pokémon..."
                    class="w-full md:w-1/2 px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-red-400" />

                <!-- Select -->
                <div class="flex items-center gap-2">
                    <span class="text-sm text-gray-600">Mostrar:</span>
                    <select v-model="limit"
                        class="px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-red-400">
                        <option :value="5">5</option>
                        <option :value="10">10</option>
                        <option :value="25">25</option>
                        <option :value="50">50</option>
                    </select>
                </div>
            </div>

            <!-- Estados -->
            <p v-if="loading" class="text-center text-gray-600">
                Cargando Pokémon...
            </p>

            <p v-if="error" class="text-center text-red-500">
                {{ error }}
            </p>
            <div v-if="pokemon.length" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                <div v-for="p in pokemon" :key="p.name"
                    class="bg-gray-50 rounded-xl shadow hover:shadow-lg p-5 text-center transition transform hover:-translate-y-1">
                    <RouterLink :to="`/pokemon/${p.name}`"
                        class="capitalize font-semibold text-gray-700 hover:text-red-500">
                        {{ p.name }}
                    </RouterLink>
                </div>
            </div>

            <!-- Sin resultados -->
            <p v-else-if="!loading" class="text-center text-gray-500 mt-10">
                No se encontraron Pokémon
            </p>

            <!-- Paginación -->
            <div class="flex justify-center items-center gap-6 mt-10">
                <button @click="prevPage" :disabled="page === 1"
                    class="px-5 py-2 rounded-xl bg-red-500 text-white font-medium hover:bg-red-600 disabled:opacity-40">
                    Anterior
                </button>

                <span class="font-semibold text-gray-700">
                    Página {{ page }} de {{ totalPages }}
                </span>

                <button @click="nextPage" :disabled="page === totalPages"
                    class="px-5 py-2 rounded-xl bg-red-500 text-white font-medium hover:bg-red-600 disabled:opacity-40">
                    Siguiente
                </button>
            </div>

        </div>
    </section>
</template>