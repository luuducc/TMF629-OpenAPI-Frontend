<script setup lang="ts">
import { InputText, Select } from 'primevue';
import { PartyType } from '@/types/party-type';
import type { RelatedPartyOrPartyRoleRef } from '@/types';

const relatedParty = defineModel<RelatedPartyOrPartyRoleRef>({ required: true });
defineProps<{ readonly: boolean }>()

const options: { name: string, type: PartyType}[] = 
  Object.values(PartyType).map(value => ({
    name:value, type: value
  }))
</script>


<template>
  <div class="grid grid-cols-2 gap-4">
    <div class="flex flex-col gap-2">
      <label class="text-sm font-medium" for="relatedName">Name</label>
      <InputText
        v-if="!readonly"
        v-model="relatedParty.partyOrPartyRole.name"
        size="small"
        placeholder="Related name"
        id="relatedName"
      />
      <p v-else class="text-sm">{{ relatedParty.partyOrPartyRole.name }}</p>
    </div>

    <div class="flex flex-col gap-2">
      <label class="text-sm font-medium" for="relatedType">Referred type</label>
      <Select
        v-if="!readonly"
        v-model="relatedParty.partyOrPartyRole['@referredType']"
        :options
        option-label="name"
        option-value="type"
        size="small"
        placeholder="Select a related type"
        id="relatedType"
      />
      <p v-else class="text-sm">{{ relatedParty.partyOrPartyRole['@referredType'] }}</p>
    </div>

    <div class="flex flex-col gap-2">
      <label class="text-sm font-medium" for="relatedRole">Role</label>
      <InputText
        v-if="!readonly"
        v-model="relatedParty.role"
        size="small"
        placeholder="Related role"
        id="relatedRole"
      />
      <p v-else class="text-sm">{{ relatedParty.role }}</p>
    </div>
  </div>
</template>