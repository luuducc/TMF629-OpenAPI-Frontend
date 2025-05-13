<script setup lang="ts">
import { InputText, Select } from 'primevue';
import { PartyType } from '@/types/party-type';
import type { RelatedPartyOrPartyRoleRef } from '@/types';

const relatedParty = defineModel<RelatedPartyOrPartyRoleRef>({ required: true });
defineProps<{ disabled: boolean }>()

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
        v-model="relatedParty.partyOrPartyRole.name"
        :disabled
        size="small"
        placeholder="Related name"
        id="relatedName"
      />
    </div>

    <div class="flex flex-col gap-2">
      <label class="text-sm font-medium" for="relatedType">Referred type</label>
      <Select
        v-model="relatedParty.partyOrPartyRole.referredType"
        :disabled
        :options
        option-label="name"
        option-value="type"
        size="small"
        placeholder="Select a related type"
        id="relatedType"
      />
    </div>

    <div class="flex flex-col gap-2">
      <label class="text-sm font-medium" for="relatedRole">Role</label>
      <InputText
        v-model="relatedParty.role"
        :disabled
        size="small"
        placeholder="Related role"
        id="relatedRole"
      />
    </div>
  </div>
</template>