<script setup lang="ts">
import { Button } from 'primevue'
import { computed, type Component } from 'vue'
import type {
  ContactMedium, AccountRef, AgreementRef, Characteristic, CreditProfile, PaymentMethodRef, RelatedPartyOrPartyRoleRef
} from "@/types"

type AvailableItem = ContactMedium | AccountRef | AgreementRef | Characteristic | CreditProfile | PaymentMethodRef | RelatedPartyOrPartyRoleRef

const props = defineProps<{
  mainLabel: string
  subLabel?: string
  readonly: boolean,
  list: AvailableItem[]
  onAdd: () => void
  formComponent: Component
}>()

const computedSubLabel = computed(() => {
  return props.subLabel || props.mainLabel
})
</script>

<template>
  <div v-if="!readonly || list.length > 0" class="flex flex-col gap-2">
    <div class="flex justify-between items-center">
      <label class="font-medium">{{ mainLabel }}</label>
      <Button 
        v-if="!readonly" 
        @click="onAdd" 
        label="New" 
        icon="pi pi-plus" 
        size="small" 
        outlined 
      />
    </div>

    <div
      v-for="(_, index) in list"
      :key="index"
      class="rounded-xl shadow-sm p-4 border border-gray-200 space-y-2"
    >
      <div class="flex justify-between items-center mb-2">
        <label class="text-sm font-medium">{{ computedSubLabel }} {{ index + 1 }}</label>
        <Button
          v-if="!readonly" 
          @click="list.splice(index, 1)"
          label="Delete"
          icon="pi pi-trash"
          severity="danger"
          size="small"
        />
      </div>
      <component :is="formComponent" :readonly v-model="list[index]" />
    </div>
  </div>
</template>
