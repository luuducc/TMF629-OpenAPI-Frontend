<script setup lang="ts">
import { InputText, Select } from 'primevue'

import { partyTypeOptions, type PartyRef } from '@/types'

const party = defineModel<PartyRef>('party', { required: true })
const role = defineModel<string>('role')
defineProps<{ readonly: boolean }>()
</script>
<template>
  <!-- Engaged Party -->
  <div class="flex flex-col">
    <label class="font-medium">Engaged Party</label>
    <div class="flex gap-4">
      <!-- Party Name -->
      <div class="flex flex-col gap-1 flex-1">
        <label class="text-sm font-medium" for="engagedPartyName">Name</label>
        <!-- Render plain text for readonly mode, input field for editing -->
        <p v-if="readonly" class="text-sm">{{ party.name }}</p>
        <InputText
          v-else
          v-model="party.name"
          size="small"
          placeholder="Party name"
          id="engagedPartyName"
        />
      </div>
      <!-- Party Type -->
      <div class="flex flex-col gap-1 flex-1">
        <label class="text-sm font-medium" for="partyType">Referred type</label>
        <!-- Render plain text for readonly mode, input field for editing -->
        <p v-if="readonly" class="text-sm">{{ party['@referredType'] }}</p>
        <Select
          v-else
          v-model="party['@referredType']"
          :options="partyTypeOptions"
          option-label="name"
          option-value="type"
          size="small"
          placeholder="Select a party type"
          id="partyType"
        />
      </div>
    </div>
  </div>
  <!-- Role -->
  <div class="flex flex-col gap-1">
    <label class="font-medium" for="role">Role</label>
    <!-- Render plain text for readonly mode, input field for editing -->
    <p v-if="readonly" class="text-sm">{{ role }}</p>
    <InputText
      v-else
      v-model="role"
      size="small"
      placeholder="Role played by Engaged party"
      id="role"
    />
  </div>
</template>
