<script setup lang="ts">
import { ref, watch } from 'vue';
import { PartyType } from '@/types/party-type';
import { InputText, Select } from 'primevue';
import type { PartyRef } from '@/types';

const options: { name: string, type: PartyType }[] = 
  Object.values(PartyType).map((party) => ({
    name: party, type: party
  }))

defineProps<{ readonly: boolean }>()

const engagedParty = defineModel<PartyRef>({ required: true})
</script>

<template>
  <div class="flex gap-4">
    <div class="flex flex-col gap-1 flex-1">
      <label class="text-sm font-medium" for="engagedPartyName">Name</label>
      <InputText 
        v-model="engagedParty.name" 
        :readonly
        size="small" 
        placeholder="Party name"
        id="engagedPartyName" 
      />
    </div>
    
    <div class="flex flex-col gap-1 flex-1">
      <label class="text-sm font-medium" for="partyType">Referred type</label>
      <Select 
        v-model="engagedParty['@referredType']"
        :readonly
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