<script setup lang="ts">
import { FormItem } from '../shared'

const description = defineModel<string>('description')
</script>
<template>
  <FormItem label="Description" id="customer-description" v-model:text="description" />
</template>
