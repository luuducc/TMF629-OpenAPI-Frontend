<script setup lang="ts">
import { FormGroup, FormItem } from '../shared'

const name = defineModel<string>('name')
const id = defineModel<string>('id')
const { isEdit = false } = defineProps<{ isEdit?: boolean }>()
</script>
<template>
  <FormGroup v-if="isEdit">
    <FormItem label="Name" id="customer-name" v-model:text="name" />
    <FormItem label="Id" id="customer-id" disabled v-model:text="id" />
  </FormGroup>
  <FormItem v-else label="Name" id="customer-name" v-model:text="name" />
</template>
