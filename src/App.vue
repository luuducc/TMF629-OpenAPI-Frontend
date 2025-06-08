<script setup lang="ts">
import { Toast } from 'primevue'

import { RouterView } from 'vue-router'

import PageHeader from './components/layout/PageHeader.vue'
</script>
<template>
  <!-- Header -->
  <header class="fixed top-0 left-0 w-full bg-white shadow z-1">
    <PageHeader />
  </header>

  <!-- Views -->
  <div class="mt-13">
    <RouterView />
  </div>
  <Toast />
</template>
