<script setup lang="ts">
import { agreementOptions, AgreementType, type AgreementRef } from '@/types'

import { FormGenerator, FormItem } from '../shared'

const { list: agreement } = defineProps<{ list: AgreementRef[] }>()
const onAdd = (): void => {
  agreement.push({
    name: '',
    '@referredType': AgreementType.ServiceAgreement,
  })
}
</script>
<template>
  <FormGenerator main-label="Agreements" sub-label="Agreements" :on-add="onAdd" :list="agreement">
    <template v-slot="{ index }">
      <div class="flex gap-2">
        <FormItem label="Name" :id="`agreement-name-${index}`" v-model:text="agreement[index].name" />
        <!-- prettier-ignore -->
        <FormItem label="Referred type" type="select" :select-options="agreementOptions"
            v-model:select="agreement[index]['@referredType']" />
      </div>
    </template>
  </FormGenerator>
</template>
