<script setup lang="ts">
import { InputText, DatePicker } from 'primevue';
</script>

<template>
  <div class="grid grid-cols-2 gap-4">
    <div class="flex flex-col gap-2">
      <label class="text-sm font-medium" for="profileDate">Profile date</label>
      <DatePicker
        size="small"
        id="profileDate"
      />
    </div>
    <div></div>

    <div class="flex flex-col gap-2">
      <label class="text-sm font-medium" for="riskRating">Risk rating</label>
      <InputText
        size="small"
        id="riskRating"
      />
    </div>

    <div class="flex flex-col gap-2">
      <label class="text-sm font-medium" for="creditScore">Credit score</label>
      <InputText
        size="small"
        id="creditScore"
      />
    </div>

    <div class="flex flex-col gap-2">
      <label class="text-sm font-medium" for="startDate">Start date</label>
      <DatePicker
        size="small"
        id="startDate"
      />
    </div>

    <div class="flex flex-col gap-2">
      <label class="text-sm font-medium" for="endDate">End date</label>
      <DatePicker
        size="small"
        id="endDate"
      />
    </div>
  </div>
</template>