<script setup lang="ts">
import { PartyType, partyTypeOptions, type RelatedPartyOrPartyRoleRef } from '@/types'

import { FormGenerator, FormItem } from '../shared'

const { list: party } = defineProps<{ list: RelatedPartyOrPartyRoleRef[] }>()
const onAdd = (): void => {
  party.push({
    partyOrPartyRole: {
      name: '',
      '@referredType': PartyType.Individual,
    },
    role: '',
  })
}
</script>
<template>
  <FormGenerator main-label="Related parties" sub-label="Party" :on-add="onAdd" :list="party">
    <template v-slot="{ index }">
      <div class="grid grid-cols-2 gap-2">
        <FormItem label="Name" :id="`related-party-name-${index}`" v-model:text="party[index].partyOrPartyRole.name" />
        <FormItem
          label="Referred type"
          type="select"
          v-model:select="party[index].partyOrPartyRole['@referredType']"
          :select-options="partyTypeOptions"
        />
        <FormItem label="Role" :id="`related-party-role-${index}`" v-model:text="party[index].role" />
      </div>
    </template>
  </FormGenerator>
</template>
