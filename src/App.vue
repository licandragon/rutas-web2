<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="min-h-screen bg-linear-to-br from-slate-100 to-slate-300">
    <!-- NAVBAR -->
    <nav class="bg-white shadow-md">
      <div class="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 class="text-xl font-bold text-red-500">
          Pokédex Vue
        </h1>

        <!-- Links -->
        <div class="flex gap-6">
          <RouterLink
            to="/"
            class="text-gray-700 hover:text-red-500 font-medium transition"
            active-class="text-red-500 border-b-2 border-red-500"
          >
            Home
          </RouterLink>

          <RouterLink
            to="/about"
            class="text-gray-700 hover:text-red-500 font-medium transition"
            active-class="text-red-500 border-b-2 border-red-500"
          >
            About
          </RouterLink>

          <RouterLink
            to="/login"
            class="text-gray-700 hover:text-red-500 font-medium transition"
            active-class="text-red-500 border-b-2 border-red-500"
          >
            Login
          </RouterLink>

          <RouterLink
            to="/pokemon"
            class="text-gray-700 hover:text-red-500 font-medium transition"
            active-class="text-red-500 border-b-2 border-red-500"
          >
            Pokémon
          </RouterLink>
        </div>
      </div>
    </nav>

    <!-- CONTENIDO -->
    <main class="py-8 px-4">
      <RouterView />
    </main>
  </div>
</template>

<style scoped></style>