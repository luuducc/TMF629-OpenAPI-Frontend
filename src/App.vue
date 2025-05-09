<script setup lang="ts">
import { Button } from 'primevue'
import { ref, onMounted, watch } from "vue"
import CustomerFormDialog from './components/dialog/CustomerFormDialog.vue'
import { CustomerFormMode, type Customer } from '@/types'
import CustomerTable from '@/components/table/CustomerTable.vue'
import { CustomerService } from './services/customerService'

const defaultCustomer: Customer = {
  // Basic info
  '@type': 'Customer',
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
    '@referredType': undefined
  },
  partyRoleSpecification: {
    name: '',
    '@referredType': undefined
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

const customers = ref<Customer[]>()
const customer = ref<Customer>(structuredClone(defaultCustomer))
const showDialog = ref<boolean>(false)
const mode = ref<CustomerFormMode>(CustomerFormMode.Create)
const isCreateSuccess = ref<boolean>(false)

const createCustomer = () => {
  mode.value = CustomerFormMode.Create
  showDialog.value = true
}
watch(isCreateSuccess, () => {
  if (isCreateSuccess.value && customers.value) {
    customers.value.push(customer.value)
    isCreateSuccess.value = false
    // reset customer ref
    customer.value = structuredClone(defaultCustomer)
  }
})
onMounted(async () => {
  const data = await CustomerService.getCustomers()
  customers.value = data
})

</script>
<template>
  <div class="flex justify-between items-center px-8 pt-3 mb-3">
    <Button label="Create new customer" @click="createCustomer"/>
    <header class="text-xl">
      TMF 629 API
    </header>
  </div>
  <div class="main-content px-8">
    <CustomerTable v-model="customers"/>
  </div>
  <CustomerFormDialog 
    :mode 
    v-model:customer="customer" 
    v-model:is-create-success="isCreateSuccess"
    v-model:visible="showDialog" 
  />
</template>