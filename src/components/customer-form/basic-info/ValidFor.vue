<script setup lang="ts">
import type { TimePeriod } from '@/types'

import { FormGroup, FormItem } from '../shared'

defineProps<{ validFor: TimePeriod }>()
</script>
<template>
  <FormGroup label="Validity period">
    <FormItem type="date" label="Start date" v-model:date="validFor.startDateTime" />
    <FormItem type="date" label="End date" v-model:date="validFor.endDateTime" />
  </FormGroup>
</template>
