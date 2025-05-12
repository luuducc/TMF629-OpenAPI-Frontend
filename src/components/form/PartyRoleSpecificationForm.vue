<script setup lang="ts">
import { Select, InputText } from 'primevue';
import { PartyRoleSpecificationType } from '@/types/party-role-specification-ref';

const options: { name: string, type: PartyRoleSpecificationType }[] = [
  { name: 'Customer', type: PartyRoleSpecificationType.CustomerRoleSpecification},
  { name: 'Supplier', type: PartyRoleSpecificationType.SupplierRoleSpecification},
  { name: 'Partner', type: PartyRoleSpecificationType.PartnerRoleSpecification}
]

const roleName = defineModel<string>("roleName")
const specificationType = defineModel<PartyRoleSpecificationType>("specificationType")
</script>

<template>
  <div class="flex gap-4">
    <div class="flex flex-col gap-1 flex-1">
      <label class="text-sm font-medium" for="roleName">Name</label>
      <InputText 
        v-model="roleName" 
        size="small" 
        placeholder="Enter role name"
        id="roleName" 
      />
    </div>
    <div class="flex flex-col gap-1 flex-1">
      <label class="text-sm font-medium" for="specificationType">Referred type</label>
      <Select 
        v-model="specificationType"
        :options
        option-label="name"
        option-value="type"
        size="small"
        placeholder="Select a specification type"
        id="specificationType" 
      />
    </div>
  </div>
</template>