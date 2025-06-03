<script setup lang="ts">
import { InputText, Select } from 'primevue'

import {
  partyRoleSpecificationOptions,
  type PartyRoleSpecificationRef,
} from '@/types'

const initialValue = defineModel<PartyRoleSpecificationRef>({ required: true })
defineProps<{ readonly: boolean }>()
</script>
<template>
  <div class="flex flex-col">
    <label class="font-medium" for="partyRoleSpecification"
      >Party role specification</label
    >
    <div class="flex gap-4">
      <div class="flex flex-col gap-1 flex-1">
        <label class="text-sm font-medium" for="roleName">Name</label>
        <!-- Render plain text for readonly mode, input field for editing -->
        <p v-if="readonly" class="text-sm">{{ initialValue.name }}</p>
        <InputText
          v-else
          v-model="initialValue.name"
          size="small"
          placeholder="Enter role name"
          id="roleName"
        />
      </div>
      <div class="flex flex-col gap-1 flex-1">
        <label class="text-sm font-medium" for="specificationType"
          >Referred type</label
        >
        <!-- Render plain text for readonly mode, input field for editing -->
        <p v-if="readonly" class="text-sm">
          {{ initialValue['@referredType'] }}
        </p>
        <Select
          v-else
          v-model="initialValue['@referredType']"
          :options="partyRoleSpecificationOptions"
          option-label="name"
          option-value="type"
          size="small"
          placeholder="Select a specification type"
          id="specificationType"
        />
      </div>
    </div>
  </div>
</template>
