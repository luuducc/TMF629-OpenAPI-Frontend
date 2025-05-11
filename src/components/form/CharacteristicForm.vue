<script setup lang="ts">
import { InputText, Select } from 'primevue';
import { ValueType, RelationshipType } from '@/types/characteristic';

const relationOptions: { name: string, type: RelationshipType }[] = [
  { name: 'dependency', type: RelationshipType.dependency },
  { name: 'exclusion', type: RelationshipType.exclusion },
  { name: 'inclusion', type: RelationshipType.inclusion },
  { name: 'substitute', type: RelationshipType.substitute },
  { name: 'aggregation', type: RelationshipType.aggregation },
  { name: 'association', type: RelationshipType.association },
  { name: 'derivedFrom', type: RelationshipType.derivedFrom },
]
const typeOptions: { name: string, type: ValueType }[] = [
  { name: 'string', type: ValueType.string },
  { name: 'number', type: ValueType.number },
  { name: 'boolean', type: ValueType.boolean },
  { name: 'date', type: ValueType.date },
  { name: 'object', type: ValueType.object },
  { name: 'array', type: ValueType.array }
]
</script>

<template>
  <div class="grid grid-cols-2 gap-4">
    <div class="flex flex-col gap-2">
      <label class="text-sm font-medium" for="characteristicName">Name</label>
      <InputText
        size="small"
        placeholder="Name"
        id="characteristicName"
      />
    </div>

    <div class="flex flex-col gap-2">
      <label class="text-sm font-medium" for="characteristicType">Value type</label>
      <Select
        :options="typeOptions"
        option-label="name"
        option-value="type"
        size="small"
        placeholder="Select a type"
        id="characteristicType"
      />
    </div>

    <div class="flex flex-col gap-2">
      <label class="text-sm font-medium" for="characteristicRelationship">
        Characteristic relationship
      </label>
      <Select
        :options="relationOptions"
        option-label="name"
        option-value="type"
        size="small"
        placeholder="Select a relationship"
        id="characteristicRelationship"
      />
    </div>
  </div>
</template>