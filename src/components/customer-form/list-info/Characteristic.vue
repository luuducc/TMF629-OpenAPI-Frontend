<script setup lang="ts">
import {
  relationshipOptions,
  RelationshipType,
  relationshipValueOptions,
  ValueType,
  type Characteristic,
} from '@/types'

import { FormGenerator, FormItem } from '../shared'

const { list: characteristic } = defineProps<{ list: Characteristic[] }>()
const onAdd = (): void => {
  characteristic.push({
    name: '',
    valueType: ValueType.string,
    characteristicRelationship: {
      relationshipType: RelationshipType.dependency,
    },
  })
}
</script>
<template>
  <FormGenerator main-label="Characteristics" sub-label="Characteristic" :on-add="onAdd" :list="characteristic">
    <template v-slot="{ index }">
      <div class="grid grid-cols-2 gap-2">
        <FormItem
          label="Name"
          :id="`customer-characteristic-name-${index}`"
          v-model:text="characteristic[index].name"
        />
        <FormItem
          label="Value type"
          type="select"
          :select-options="relationshipValueOptions"
          v-model:select="characteristic[index].valueType"
        />
        <FormItem
          label="Characteristic relationship"
          type="select"
          :select-options="relationshipOptions"
          v-model:select="characteristic[index].characteristicRelationship.relationshipType"
        />
      </div>
    </template>
  </FormGenerator>
</template>
