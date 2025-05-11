<script setup lang="ts">
import { InputText, DatePicker } from 'primevue';
</script>

<template>
  <div class="grid grid-cols-2 gap-4">
    <div class="flex flex-col gap-2">
      <label class="text-sm font-medium" for="">Profile date</label>
      <DatePicker
        size="small"
      />
    </div>
    <div></div>

    <div class="flex flex-col gap-2">
      <label class="text-sm font-medium" for="">Risk rating</label>
      <InputText
        size="small"
      />
    </div>

    <div class="flex flex-col gap-2">
      <label class="text-sm font-medium" for="">Credit score</label>
      <InputText
        size="small"
      />
    </div>

    <div class="flex flex-col gap-2">
      <label class="text-sm font-medium" for="">Start date</label>
      <DatePicker
        size="small"
      />
    </div>

    <div class="flex flex-col gap-2">
      <label class="text-sm font-medium" for="">End date</label>
      <DatePicker
        size="small"
      />
    </div>
  </div>
</template>