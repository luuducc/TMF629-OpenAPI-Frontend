<script setup lang="ts">
import { Button } from 'primevue'
import { ref, onMounted, watch } from "vue"
import CustomerFormDialog from './components/dialog/CustomerFormDialog.vue'
import { CustomerFormMode, type Customer } from '@/types'
import CustomerTable from '@/components/table/CustomerTable.vue'
import { CustomerService } from './services/customerService'

const customers = ref<Customer[]>()
const customer = ref<Customer>({
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
})
const showDialog = ref<boolean>(false)
const mode = ref<CustomerFormMode>(CustomerFormMode.Create)
const isCreateSuccess = ref<boolean>(false)
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

const createCustomer = () => {
  mode.value = CustomerFormMode.Create
  showDialog.value = true
}
watch(isCreateSuccess, () => {
  if (isCreateSuccess.value) {
    customers.value?.push(customer.value)
    isCreateSuccess.value = false
    // reset customer ref
    customer.value = defaultCustomer
  }
})
onMounted(async () => {
  const data = await CustomerService.getCustomers()
  // const data = products
  customers.value = data
  console.log('data', data)
  console.log('customers', customers.value)
})

</script>
<template>
  <div class="flex justify-between items-center px-4 pt-3">
    <header class="text-xl">
      TMF 629 API
    </header>
    <Button label="Create new customer" @click="createCustomer"/>
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