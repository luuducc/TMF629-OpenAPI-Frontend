<script setup lang="ts">
import { ref, watch } from 'vue';
import { PartyType } from '@/types/party-type';
import { InputText, Select, Message } from 'primevue';
import type { PartyRef } from '@/types';

const options: { name: string, type: PartyType }[] = 
  Object.values(PartyType).map((party) => ({
    name: party, type: party
  }))

defineProps<{ 
  readonly: boolean,
  form: Record<string, any>
}>()

const engagedParty = defineModel<PartyRef>({ required: true})
</script>

<template>
  <div class="flex gap-4">
    <div class="flex flex-col gap-1 flex-1">
      <label class="text-sm font-medium" for="engagedPartyName">Name</label>
      <InputText 
        v-if="!readonly"
        v-model="engagedParty.name" 
        size="small" 
        placeholder="Party name"
        id="engagedPartyName" 
      />
      <p v-else class="text-sm">{{ engagedParty.name }}</p>
    </div>
    
    <div class="flex flex-col gap-1 flex-1">
      <label class="text-sm font-medium" for="partyType">Referred type</label>
      <Select 
        v-if="!readonly"
        v-model="engagedParty['@referredType']"
        name="engagedPartyType"
        :options
        option-label="name"
        option-value="type"
        size="small"
        placeholder="Select a party type"
        id="partyType" 
      />
      <p v-else class="text-sm">{{ engagedParty['@referredType'] }}</p>
      <Message v-if="form.engagedPartyType?.invalid" size="small" severity="error" variant="simple">{{ form.engagedPartyType.error?.message }}</Message>
    </div>
  </div>
</template>