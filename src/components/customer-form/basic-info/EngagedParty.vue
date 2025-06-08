<script setup lang="ts">
import { partyTypeOptions, type PartyRef } from '@/types'

import { FormGroup, FormItem } from '../shared'

defineProps<{ engagedParty: PartyRef }>()
const role = defineModel<string>('role')
</script>
<template>
  <!-- Engaged party -->
  <FormGroup label="Engaged party">
    <FormItem label="Name" id="engaged-party-name" v-model:text="engagedParty.name" />
    <!-- prettier-ignore -->
    <FormItem type="select" label="Referred type" v-model:select="engagedParty['@referredType']"
          :select-options="partyTypeOptions" />
  </FormGroup>

  <!-- Role -->
  <FormItem label="Role" id="customer-role" v-model:text="role" />
</template>
