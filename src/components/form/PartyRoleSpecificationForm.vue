<script setup lang="ts">
import { Select, InputText } from 'primevue';
import { PartyRoleSpecificationType, type PartyRoleSpecificationRef } from '@/types/party-role-specification-ref';

const options: { name: string, type: PartyRoleSpecificationType }[] = [
  { name: 'Customer', type: PartyRoleSpecificationType.CustomerRoleSpecification},
  { name: 'Supplier', type: PartyRoleSpecificationType.SupplierRoleSpecification},
  { name: 'Partner', type: PartyRoleSpecificationType.PartnerRoleSpecification}
]

defineProps<{ readonly: boolean }>()
const partyRoleSpecification = defineModel<PartyRoleSpecificationRef>({ required: true })
</script>

<template>
  <div class="flex gap-4">
    <div class="flex flex-col gap-1 flex-1">
      <label class="text-sm font-medium" for="roleName">Name</label>
      <InputText 
        v-model="partyRoleSpecification.name" 
        :readonly
        size="small" 
        :placeholder="readonly ? '' : 'Enter role name'"
        id="roleName" 
      />
    </div>
    <div class="flex flex-col gap-1 flex-1">
      <label class="text-sm font-medium" for="specificationType">Referred type</label>
      <Select 
        v-if="!readonly"
        v-model="partyRoleSpecification['@referredType']"
        :options
        option-label="name"
        option-value="type"
        size="small"
        placeholder="Select a specification type"
        id="specificationType" 
      />
      <InputText
        v-else
        v-model="partyRoleSpecification['@referredType']"
        readonly
        size="small"
      />
    </div>
  </div>
</template>