<script setup lang="ts">
import { InputText, Select } from 'primevue';
import { ValueType, RelationshipType } from '@/types';
import type { Characteristic } from '@/types';

const characteristic = defineModel<Characteristic>({ required: true })

defineProps<{ readonly: boolean }>()

const relationOptions: { name: string, type: RelationshipType }[] = 
  Object.values(RelationshipType).map(value => ({
    name: value, type: value
  }))
const typeOptions: { name: string, type: ValueType }[] = 
  Object.values(ValueType).map(value => ({
    name: value, type: value
  }))
</script>

<template>
  <div class="grid grid-cols-2 gap-4">
    <div class="flex flex-col gap-2">
      <label class="text-sm font-medium" for="characteristicName">Name</label>
      <InputText
        v-if="!readonly"
        v-model="characteristic.name"
        size="small"
        placeholder="Name"
        id="characteristicName"
      />
      <p v-else class="text-sm">{{ characteristic.name }}</p>
    </div>

    <div class="flex flex-col gap-2">
      <label class="text-sm font-medium" for="characteristicType">Value type</label>
      <Select
        v-if="!readonly"
        v-model="characteristic.valueType"
        :options="typeOptions"
        option-label="name"
        option-value="type"
        size="small"
        placeholder="Select a type"
        id="characteristicType"
      />
      <p v-else class="text-sm">{{ characteristic.valueType }}</p>
    </div>

    <div class="flex flex-col gap-2">
      <label class="text-sm font-medium" for="characteristicRelationship">
        Characteristic relationship
      </label>
      <Select
        v-if="!readonly"
        v-model="characteristic.characteristicRelationship.relationshipType"
        :options="relationOptions"
        option-label="name"
        option-value="type"
        size="small"
        placeholder="Select a relationship"
        id="characteristicRelationship"
      />
      <p v-else class="text-sm">{{ characteristic.characteristicRelationship.relationshipType }}</p>
    </div>
  </div>
</template>