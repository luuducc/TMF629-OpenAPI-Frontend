<script setup lang="ts">
import { ref } from 'vue';
import { PartyType } from '@/types/party-type';
import { InputText, Select } from 'primevue';

const options: { name: string, type: PartyType }[] = [
  { name: 'Individual', type: PartyType.Individual },
  { name: 'Organization', type: PartyType.Organization }
]

const partyName = defineModel<string>('partyName')
const partyType = defineModel<PartyType>('partyType')
</script>

<template>
  <div class="flex gap-4">
    <div class="flex flex-col gap-1 flex-1">
      <label class="text-sm font-medium" for="engagedPartyName">Name</label>
      <InputText 
        v-model="partyName" 
        size="small" 
        placeholder="Party name"
        id="engagedPartyName" 
      />
    </div>
    
    <div class="flex flex-col gap-1 flex-1">
      <label class="text-sm font-medium" for="partyType">Referred type</label>
      <Select 
        v-model="partyType"
        :options
        option-label="name"
        option-value="type"
        size="small"
        placeholder="Select a party type"
        id="partyType" 
      />
    </div>
  </div>
</template>