<script setup lang="ts">
import { partyRoleSpecificationOptions, type PartyRoleSpecificationRef } from '@/types'

import { FormGroup, FormItem } from '../shared'

defineProps<{ partyRoleSpecification: PartyRoleSpecificationRef }>()
</script>
<template>
  <FormGroup label="Party role specification">
    <FormItem label="Name" id="party-role-specs-name" v-model:text="partyRoleSpecification.name" />
    <!-- prettier-ignore -->
    <FormItem type="select" label="Referred type"
          v-model:select="partyRoleSpecification['@referredType']"
          :select-options="partyRoleSpecificationOptions" />
  </FormGroup>
</template>
