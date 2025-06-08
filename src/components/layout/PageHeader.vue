<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>
<template>
  <div class="flex items-center justify-between px-4 py-3">
    <h3 class="text-xl font-semibold">TMF 629 Customer Management</h3>
    <nav class="flex gap-4">
      <RouterLink to="/customers" class="text-gray-600 hover:text-gray-900">Home</RouterLink>
      <RouterLink to="/customers/create" class="text-gray-600 hover:text-gray-900">Add new customer</RouterLink>
    </nav>
  </div>
</template>
