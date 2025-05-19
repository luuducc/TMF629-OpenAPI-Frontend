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
        v-model="relatedParty.partyOrPartyRole.name"
        :readonly
        size="small"
        :placeholder="readonly ? '' : 'Related name'"
        id="relatedName"
      />
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
      <InputText
        v-else
        v-model="relatedParty.partyOrPartyRole['@referredType']"
        readonly
        size="small"
      />
    </div>

    <div class="flex flex-col gap-2">
      <label class="text-sm font-medium" for="relatedRole">Role</label>
      <InputText
        v-model="relatedParty.role"
        :readonly
        size="small"
        :placeholder="readonly ? '' : 'Related role'"
        id="relatedRole"
      />
    </div>
  </div>
</template>