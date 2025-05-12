<script setup lang="ts">
import { InputText, Select } from 'primevue';
import { PartyType } from '@/types/party-type';

const options: { name: string, type: PartyType}[] = [
  { name: 'Individual', type: PartyType.Individual },
  { name: 'Organization', type: PartyType.Organization }
]
</script>


<template>
  <div class="grid grid-cols-2 gap-4">
    <div class="flex flex-col gap-2">
      <label class="text-sm font-medium" for="relatedName">Name</label>
      <InputText
        size="small"
        placeholder="Related name"
        id="relatedName"
      />
    </div>

    <div class="flex flex-col gap-2">
      <label class="text-sm font-medium" for="relatedRole">Role</label>
      <InputText
        size="small"
        placeholder="Related role"
        id="relatedRole"
      />
    </div>

    <div class="flex flex-col gap-2">
      <label class="text-sm font-medium" for="relatedType">Referred type</label>
      <Select
        :options
        option-label="name"
        option-value="type"
        size="small"
        placeholder="Select a related type"
        id="relatedType"
      />
    </div>
  </div>
</template>