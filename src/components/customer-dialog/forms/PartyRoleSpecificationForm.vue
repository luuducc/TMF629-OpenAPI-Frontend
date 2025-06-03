<script setup lang="ts">
import { InputText, Select } from 'primevue'

import {
  partyRoleSpecificationOptions,
  type PartyRoleSpecificationRef,
} from '@/types'

defineProps<{ readonly: boolean }>()
const partyRoleSpecification = defineModel<PartyRoleSpecificationRef>({
  required: true,
})
</script>

<template>
  <div class="flex gap-4">
    <!-- Role Name -->
    <div class="flex flex-col gap-1 flex-1">
      <label class="text-sm font-medium" for="roleName">Name</label>

      <!-- Render plain text for readonly mode, input field for editing -->
      <p v-if="readonly" class="text-sm">{{ partyRoleSpecification.name }}</p>
      <InputText
        v-else
        v-model="partyRoleSpecification.name"
        size="small"
        placeholder="Enter role name"
        id="roleName"
      />
    </div>
    <!-- Specification Type -->
    <div class="flex flex-col gap-1 flex-1">
      <label class="text-sm font-medium" for="specificationType"
        >Referred type</label
      >

      <!-- Render plain text for readonly mode, input field for editing -->
      <p v-if="readonly" class="text-sm">
        {{ partyRoleSpecification['@referredType'] }}
      </p>
      <Select
        v-else
        v-model="partyRoleSpecification['@referredType']"
        :options="partyRoleSpecificationOptions"
        option-label="name"
        option-value="type"
        size="small"
        placeholder="Select a specification type"
        id="specificationType"
      />
    </div>
  </div>
</template>
