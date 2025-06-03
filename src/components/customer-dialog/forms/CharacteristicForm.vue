<script setup lang="ts">
import { InputText, Select } from 'primevue'

import {
  relationshipOptions,
  relationshipValueOptions,
  type Characteristic,
} from '@/types'

defineProps<{ readonly: boolean }>()
const characteristic = defineModel<Characteristic>({ required: true })
</script>

<template>
  <div class="grid grid-cols-2 gap-4">
    <!-- Characteristic Name -->
    <div class="flex flex-col gap-2">
      <label class="text-sm font-medium" for="characteristicName">Name</label>

      <!-- Render plain text for readonly mode, input field for editing -->
      <p v-if="readonly" class="text-sm">{{ characteristic.name }}</p>
      <InputText
        v-else
        v-model="characteristic.name"
        size="small"
        placeholder="Name"
        id="characteristicName"
      />
    </div>
    <!-- Characteristic Type -->
    <div class="flex flex-col gap-2">
      <label class="text-sm font-medium" for="characteristicType"
        >Value type</label
      >

      <!-- Render plain text for readonly mode, input field for editing -->
      <p v-if="readonly" class="text-sm">{{ characteristic.valueType }}</p>
      <Select
        v-else
        v-model="characteristic.valueType"
        :options="relationshipValueOptions"
        option-label="name"
        option-value="type"
        size="small"
        placeholder="Select a type"
        id="characteristicType"
      />
    </div>
    <!-- Characteristic Relationship -->
    <div class="flex flex-col gap-2">
      <label class="text-sm font-medium" for="characteristicRelationship">
        Characteristic relationship
      </label>

      <p v-if="readonly" class="text-sm">
        {{ characteristic.characteristicRelationship.relationshipType }}
      </p>
      <Select
        v-else
        v-model="characteristic.characteristicRelationship.relationshipType"
        :options="relationshipOptions"
        option-label="name"
        option-value="type"
        size="small"
        placeholder="Select a relationship"
        id="characteristicRelationship"
      />
    </div>
  </div>
</template>
