<script setup lang="ts">
import { Tag } from 'primevue'

import { getStatusSeverity, statusOptions, type StatusType } from '@/types'

import { FormGroup, FormItem } from '../shared'

const status = defineModel<StatusType>('status')
const statusReason = defineModel<string>('statusReason')
</script>
<template>
  <FormGroup>
    <FormItem label="Status" type="select" v-model:select="status" :select-options="statusOptions">
      <template #option="option">
        <Tag :value="option.name" :severity="getStatusSeverity(option.name)" style="height: 1.5rem" />
      </template>
      <template #value="value">
        <Tag :value="value" :severity="getStatusSeverity(value)" style="height: 1.3rem" />
      </template>
    </FormItem>
    <FormItem label="Status reason" id="customer-status-reason" v-model:text="statusReason" />
  </FormGroup>
</template>
