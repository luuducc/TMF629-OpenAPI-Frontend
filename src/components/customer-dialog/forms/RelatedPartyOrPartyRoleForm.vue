<script setup lang="ts">
import { InputText, Select } from 'primevue'

import { partyTypeOptions, type RelatedPartyOrPartyRoleRef } from '@/types'

defineProps<{ readonly: boolean }>()
const relatedParty = defineModel<RelatedPartyOrPartyRoleRef>({ required: true })
</script>

<template>
  <div class="grid grid-cols-2 gap-4">
    <!-- Related Name -->
    <div class="flex flex-col gap-2">
      <label class="text-sm font-medium" for="relatedName">Name</label>

      <!-- Render plain text for readonly mode, input field for editing -->
      <p v-if="readonly" class="text-sm">
        {{ relatedParty.partyOrPartyRole.name }}
      </p>
      <InputText
        v-else
        v-model="relatedParty.partyOrPartyRole.name"
        size="small"
        placeholder="Related name"
        id="relatedName"
      />
    </div>
    <!-- Related Type -->
    <div class="flex flex-col gap-2">
      <label class="text-sm font-medium" for="relatedType">Referred type</label>

      <!-- Render plain text for readonly mode, input field for editing -->
      <p v-if="readonly" class="text-sm">
        {{ relatedParty.partyOrPartyRole['@referredType'] }}
      </p>
      <Select
        v-else
        v-model="relatedParty.partyOrPartyRole['@referredType']"
        :options="partyTypeOptions"
        option-label="name"
        option-value="type"
        size="small"
        placeholder="Select a related type"
        id="relatedType"
      />
    </div>
    <!-- Related Role -->
    <div class="flex flex-col gap-2">
      <label class="text-sm font-medium" for="relatedRole">Role</label>

      <!-- Render plain text for readonly mode, input field for editing -->
      <p v-if="readonly" class="text-sm">{{ relatedParty.role }}</p>
      <InputText
        v-else
        v-model="relatedParty.role"
        size="small"
        placeholder="Related role"
        id="relatedRole"
      />
    </div>
  </div>
</template>
