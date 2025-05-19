<script setup lang="ts">
import { computed, toRaw, watch, ref } from 'vue'
import {
  CustomerFormMode,
  StatusType} from '@/types'
import type {
  Customer} from '@/types'
import { Button, DatePicker, Dialog, InputText, Tag, Textarea, Select, useToast } from 'primevue'
import { Form } from '@primevue/forms'
import {
  AccountForm,
  AgreementForm,
  CharacteristicForm,
  ContactMediumForm,
  CreditProfileForm,
  EngagedPartyForm,
  FormListGenerator,
  PartyRoleSpecificationForm,
  PaymentMethodForm,
  RelatedPartyOrPartyRoleForm
} from '@/components/form'
import { CustomerService } from '@/services/customerService'
import axios from 'axios'
import { getSeverity } from '@/utils/status-utils'

const toast = useToast()
// props
const props = defineProps<{ mode: CustomerFormMode }>()
const visible = defineModel<boolean>('visible')
const customer = defineModel<Customer>('customer', {
  default:{
    // Basic info
    id: '',
    name: '',
    role: '',
    description: '',
    status: undefined,
    statusReason: '',
  
    // Validity period
    validFor: {
      startDateTime: new Date(),
      endDateTime: new Date()
    },
  
    // Engaged party
    engagedParty: {
      name: '',
      referredType: undefined
    },
    partyRoleSpecification: {
      name: '',
      referredType: undefined
    },
  
    // Associated entities
    account: [],
    agreement: [],
    characteristic: [],
    contactMedium: [],
    creditProfile: [],
    paymentMethod: [],
    relatedParty: []
  }
})
const isUpdateSuccess = defineModel<boolean>('isUpdateSuccess', { default: false })
const isCreateSuccess = defineModel<boolean>('isCreateSuccess', { default: false })
const readonly = computed(() => props.mode === CustomerFormMode.View)
const dialogHeader = computed(() => {
  switch (props.mode) {
    case CustomerFormMode.Create:
      return 'Create new customer'
    case CustomerFormMode.View:
      return 'Customer information'
    case CustomerFormMode.Update:
      return 'Update customer'
    default:
      return ''
  }
})
// variables
const statusOptions: { name: string, type: StatusType }[] = 
  Object.values(StatusType).map(status => ({
    name: status, type: status
  }))
// HANDLERS
watch(customer, newVal => {
  console.log('new in child', newVal)
}, { deep: true})
const addAccount = (): void => {
  customer.value.account.push({
    name: '', '@referredType': undefined
  })
}
const addAgreement = (): void => {
  customer.value.agreement.push({
    name: '', '@referredType': undefined
  })
}
const addCharacteristic = (): void => {
  customer.value.characteristic.push({
    characteristicRelationship: {
      relationshipType: undefined
    },
    name: '', 
    valueType: undefined
  })
}
const addContactMedium = (): void => {
  customer.value.contactMedium.push({
    '@type': undefined, contactType: ''
  })
}
const addCreditProfile = (): void => {
  customer.value.creditProfile.push({
    creditProfileDate: new Date(),
    creditRiskRating: 0,
    creditScore: 0,
    validFor: {
      startDateTime: new Date(),
      endDateTime: new Date()
    }
  })
}
const addPaymentMethod = (): void => {
  customer.value.paymentMethod.push({
    name: '', '@referredType': undefined
  })
}
const addRelatedParty = (): void => {
  customer.value.relatedParty.push({
    partyOrPartyRole: {
      name: '',
      '@referredType': undefined
    },
    role: ''
  })
}
const updateCustomer = async () => {
  try {
    const result = await CustomerService.patchCustomer(customer.value.id, customer.value)
    
    // Show success toast
    toast.add({
      severity: 'success',
      summary: 'Update Successful',
      detail: 'Customer record has been updated.',
      life: 3000
    })

    // Close the dialog
    visible.value = false

    // Update the customer reference with the result from the server
    customer.value = result

    // Trigger success state
    isUpdateSuccess.value = true
  } catch (err) {
    if (axios.isAxiosError(err)) {
      const errData = err.response?.data

      toast.add({
        severity: 'error',
        summary: 'Update Failed',
        detail: errData?.message || 'Something went wrong.',
        life: 3000
      })
      return
    }
    console.error('Unexpected error:', err)
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'An unexpected error occurred.',
      life: 3000
    })
  }
}

const createCustomer = async () => {
  try {
    console.log('customer to create', customer.value)
    const result = await CustomerService.createCustomer(customer.value)

    // Show success toast
    toast.add({
      severity: 'success',
      summary: 'Customer Created',
      detail: 'New customer has been created!',
      life: 3000
    })

    // Close the dialog
    visible.value = false

    // Update the customer reference with the result from the server
    customer.value = result

    // Trigger success state
    isCreateSuccess.value = true
  } catch (err) {
    if (axios.isAxiosError(err)) {
      const errData = err.response?.data
      console.log('err create', errData)

      toast.add({
        severity: 'error',
        summary: 'Update Failed',
        detail: errData?.message || 'Something went wrong.',
        life: 3000
      })
      return
    }
    console.error('Unexpected error:', err)
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'An unexpected error occurred.',
      life: 3000
    })
  }
}
const handleSubmit = () => {
  switch (props.mode) {
    case CustomerFormMode.Update:
      updateCustomer()
      break
    case CustomerFormMode.Create:
      createCustomer()
      break
  }
}
</script>
<template>
  <Dialog v-model:visible="visible" :header="dialogHeader">
    <Form class="flex flex-col gap-y-6 w-[35rem]" @submit="handleSubmit">

      <!-- Customer Name and Id -->
      <div class="flex gap-4">
        <div class="flex flex-col flex-1 gap-1">
          <label class="font-medium" for="customerName">Name</label>
          <InputText 
            v-model="customer.name"
            :readonly
            size="small"
            placeholder="Customer name"
            id="customerName"
          />
        </div>
        <div v-if="mode !== CustomerFormMode.Create" class="flex flex-col flex-1 gap-1">
          <label class="font-medium" for="customerId">Id</label>
          <InputText 
            v-model="customer.id"
            readonly
            size="small"
            placeholder="Customer Id"
            id="customerId"
          />
        </div>
      </div>

      <!-- Status and Status Reason -->
      <div v-if="mode !== CustomerFormMode.Create" class="flex gap-4">
        <div class="flex flex-col flex-1 gap-1">
          <label class="font-medium" for="customerStatus">Status</label>
          <Select 
            v-if="!readonly"
            v-model="customer.status"
            :options="statusOptions"
            option-label="name"
            option-value="type"
            size="small"
            placeholder="Select a customer status"
            id="customerStatus"
          >
            <template #value="slotProps">
              <Tag 
                :value="slotProps.value" 
                :severity="getSeverity(slotProps.value)"
                class="text-red"
                style="height: 1.3rem; border: 0.2px solid var(--p-inputtext-border-color);"
              />
            </template>
            <template #option="slotProps">
              <Tag 
                :value="slotProps.option.name" 
                :severity="getSeverity(slotProps.option.name)"
                style="height: 1.5rem; border: 0.2px solid var(--p-inputtext-border-color);"
              />
            </template>
          </Select>
          <Tag
            v-else
            v-model="customer.status"
            :value="customer.status"
            :severity="getSeverity(customer.status)"
            style="width: 25%; height: 100%; border: 0.2px solid var(--p-inputtext-border-color);"
          />
        </div>
        <div class="flex flex-col flex-1 gap-1">
          <label class="font-medium" for="customerStatusReason">Status reason</label>
          <InputText 
            v-model="customer.statusReason"
            :readonly
            size="small"
            :placeholder="readonly ? '' : 'Reason for status'"
            id="customerStatusReason"
          />
        </div>
      </div>

      <!-- Valid For -->
      <div class="flex flex-col gap-2">
        <label class="font-medium">Valid for</label>
        <div class="flex gap-4">
          <div class="flex flex-col flex-1 gap-1">
            <label class="text-sm font-medium" for="startDate">Start date</label>
            <DatePicker 
              v-model="customer.validFor.startDateTime"
              :readonly
              size="small"
              id="startDate"
            />
          </div>
          <div class="flex flex-col flex-1 gap-1">
            <label class="text-sm font-medium" for="endDate">End date</label>
            <DatePicker 
              v-model="customer.validFor.endDateTime"
              :readonly
              size="small"
              id="endDate"
            />
          </div>
        </div>
      </div>

      <!-- Engaged Party -->
      <div class="flex flex-col gap-2">
        <label class="font-medium">Engaged Party</label>
        <EngagedPartyForm v-model="customer.engagedParty" :readonly/>
      </div>

      <!-- Role -->
      <div class="flex flex-col gap-1">
        <label class="font-medium" for="role">Role</label>
        <InputText 
          v-model="customer.role" 
          :readonly
          size="small" 
          :placeholder="readonly ? '' : 'Role played by Engaged party'" 
          id="role" 
        />
      </div>

      <!-- Description -->
      <div class="flex flex-col gap-1">
        <label class="font-medium" for="description">Description</label>
        <Textarea 
          v-model="customer.description"
          :readonly
          :placeholder="readonly ? '' : 'Write something about customer...'" 
          size="small" 
          id="description" 
        />
      </div>

      <!-- Party Role Specification -->
      <div class="flex flex-col gap-2">
        <label class="font-medium" for="partyRoleSpecification">Party role specification</label>
        <PartyRoleSpecificationForm v-model="customer.partyRoleSpecification" :readonly/>
      </div>

      <!-- Account -->
      <FormListGenerator
        main-label="Account"
        :list="customer.account"
        :readonly
        :on-add="addAccount"
        :form-component="AccountForm"
      />

      <!-- Agreement -->
      <FormListGenerator
        main-label="Agreement"
        :list="customer.agreement"
        :readonly
        :on-add="addAgreement"
        :form-component="AgreementForm"
      />

      <!-- Characteristic -->
      <FormListGenerator
        main-label="Characteristic"
        :list="customer.characteristic"
        :readonly
        :on-add="addCharacteristic"
        :form-component="CharacteristicForm"
      />

      <!-- Contact Medium -->
      <FormListGenerator
        main-label="Contact medium"
        sub-label="Medium"
        :list="customer.contactMedium"
        :readonly
        :on-add="addContactMedium"
        :form-component="ContactMediumForm"
      />

      <!-- Credit Profile -->
      <FormListGenerator
        main-label="Credit profile"
        sub-label="Profile"
        :list="customer.creditProfile"
        :readonly
        :on-add="addCreditProfile"
        :form-component="CreditProfileForm"
      />

      <!-- Payment Method -->
      <FormListGenerator
        main-label="Payment method"
        sub-label="Method"
        :list="customer.paymentMethod"
        :readonly
        :on-add="addPaymentMethod"
        :form-component="PaymentMethodForm"
      />

      <!-- Related Party Or Party Role -->
      <FormListGenerator
        main-label="Related party"
        sub-label="Party"
        :list="customer.relatedParty"
        :readonly
        :on-add="addRelatedParty"
        :form-component="RelatedPartyOrPartyRoleForm"
      />
      <Button type="submit" style="display: none;"/>
    </Form>
    <template #footer>
      <div class="flex justify-end gap-3">
        <Button 
          v-if="!readonly"
          @click="handleSubmit" 
          icon="pi pi-check" 
          size="small" 
          :label="props.mode === CustomerFormMode.Create ? 'Create' : 'Save'"
          severity="primary" 
        />
        <Button 
          label="Close" 
          icon="pi pi-times" 
          size="small" 
          severity="secondary" 
          @click="visible = false" 
          outlined
        />
      </div>
    </template>
  </Dialog>
</template>