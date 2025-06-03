<script setup lang="ts">
import { Button, Dialog } from 'primevue'
import { Form, type FormResolverOptions } from '@primevue/forms'

import { computed, reactive, watch } from 'vue'

import { CustomerFormMode, defaultCustomer, type Customer } from '@/types'

import { useToastService } from '@/composables/useUIFeedback'
import { CustomerService } from '@/services/customerService'

import CustomerBasicInfo from './sections/CustomerBasicInfo.vue'
import CustomerDescription from './sections/CustomerDescription.vue'
import CustomerEngagedParty from './sections/CustomerEngagedParty.vue'
import CustomerFormList from './sections/CustomerFormList.vue'
import CustomerPartyRoleSpecification from './sections/CustomerPartyRoleSpecification.vue'
import CustomerStatus from './sections/CustomerStatus.vue'
import CustomerValidity from './sections/CustomerValidity.vue'

/* Composables */
const toast = useToastService()

/* Model, Props & Emits */
const visible = defineModel<boolean>('visible')
const { formMode, initialValue } = defineProps<{
  formMode: CustomerFormMode
  initialValue: Customer
}>()
const emit = defineEmits(['created', 'updated'])

/* Reactive State */
const customer = reactive<Customer>({ ...initialValue })

/* Computed Properties */
const readonly = computed(() => formMode === CustomerFormMode.View)
const header = computed(() => {
  switch (formMode) {
    case CustomerFormMode.Create:
      return 'Create new customer'
    case CustomerFormMode.View:
      return `Detail information of ${initialValue.name}`
    default: // Update mode
      return `Update details for ${initialValue.name}`
  }
})

/* Watchers */
watch(
  () => initialValue,
  (newVal) => {
    // update reactive customer when initial value change
    Object.assign(customer, newVal)
  },
  { deep: true }
)

/* Methods */
const createCustomer = async () => {
  // console.log('customer to create', customer)
  const { success, error } = await CustomerService.createCustomer(customer)
  if (success) {
    // show success toast
    toast.success('Success', 'New customer has been created!')
    // close the dialog
    visible.value = false
    // reset the customer value
    Object.assign(customer, defaultCustomer)
    // emit to the parent to refetch customers data
    emit('created')
    return
  }
  // else show error toast
  toast.danger('Error', error ?? 'An unknown error occurred')
}
const updateCustomer = async () => {
  // console.log('update herer', customer)
  const { success, error } = await CustomerService.patchCustomer(
    customer.id,
    customer
  )
  if (success) {
    // show success toast
    toast.success('Success', 'Update customer successfully')
    // close the dialog
    visible.value = false
    // reset the customer value
    Object.assign(customer, defaultCustomer)
    // emit to the parent to refetch customers data
    emit('updated')
    return
  }
  // else show error toast
  toast.danger('Error', error ?? 'An unknown error occurred')
}

/* Event Handlers */
const onFormSubmit = () => {
  switch (formMode) {
    case CustomerFormMode.Create:
      createCustomer()
      break
    case CustomerFormMode.Update:
      updateCustomer()
      break
    default: // View mode
      console.log('view')
  }
}
const handleClose = () => {
  visible.value = false
  Object.assign(customer, defaultCustomer)
}
</script>
<template>
  <Dialog v-model:visible="visible" @hide="handleClose" :header>
    <Form @submit="onFormSubmit">
      <!-- Form content -->
      <div class="flex flex-col gap-y-6 w-[35rem]">
        <CustomerBasicInfo
          :form-mode="formMode"
          :readonly
          v-model:customer-name="customer.name"
          v-model:customer-id="customer.id"
        />
        <CustomerStatus
          v-if="formMode !== CustomerFormMode.Create"
          :readonly
          v-model:status="customer.status"
          v-model:status-reason="customer.statusReason"
        />
        <CustomerValidity :readonly v-model="customer.validFor" />
        <CustomerEngagedParty
          :readonly
          v-model:party="customer.engagedParty"
          v-model:role="customer.role"
        />
        <CustomerDescription :readonly v-model="customer.description" />
        <CustomerPartyRoleSpecification
          :readonly
          v-model="customer.partyRoleSpecification"
        />
        <CustomerFormList
          :readonly
          v-bind:account="customer.account"
          v-bind:agreement="customer.agreement"
          v-bind:characteristic="customer.characteristic"
          v-bind:contact-medium="customer.contactMedium"
          v-bind:credit-profile="customer.creditProfile"
          v-bind:payment-method="customer.paymentMethod"
          v-bind:related-party="customer.relatedParty"
        />
      </div>

      <!-- Footer -->
      <div
        class="sticky bottom-0 flex justify-end gap-3 bg-[var(--p-overlay-modal-background)] py-3"
      >
        <Button
          v-if="!readonly"
          label="Save"
          type="submit"
          icon="pi pi-check"
          size="small"
          severity="primary"
        />
        <Button
          label="Close"
          icon="pi pi-times"
          size="small"
          severity="secondary"
          @click="handleClose"
          outlined
        />
      </div>
    </Form>
  </Dialog>
</template>
