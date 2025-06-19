import { reactive, ref } from 'vue'
import { defineStore } from 'pinia'

import { CustomerService } from '@/services/customerService'

import type { Customer, PaginationMeta } from '@/types'

export const useCustomerStore = defineStore('customer', () => {
  // preserve table data
  const customers = reactive<Customer[]>([])
  // preserve data for edit and detail view
  const customer = ref<Customer>()

  const keyword = ref<string>('')
  const currentId = ref<string>()
  const tableMeta = reactive<PaginationMeta>({
    offset: 0,
    pageCount: 0,
    total: 0,
    limit: 10,
  })
  let loaded = false

  const fetchCustomers = async (force: boolean = false) => {
    // only fetch one
    if (!force && loaded) return
    const { offset, limit } = tableMeta
    console.log('live search', force, loaded)
    const result = await CustomerService.liveSearch(keyword.value, offset, limit)
    if (result.success) {
      const { paginationMeta, data } = result
      customers.splice(0, customers.length, ...data)
      Object.assign(tableMeta, paginationMeta)
      loaded = true
    }
  }

  const fetchCustomer = async (id: string) => {
    // only fetch if user viewing different record based on ID
    if (currentId.value === id) return
    const result = await CustomerService.getCustomerById(id)
    if (result.success) {
      currentId.value = id
      customer.value = result.data
    }
  }

  const updateCustomer = async (id: string) => {
    if (!customer.value)
      return {
        success: false,
        error: 'Undefined customer reactive value',
      }
    const result = await CustomerService.patchCustomer(id, customer.value)
    if (result.success) {
      customer.value = result.data
      return {
        success: true,
      }
    }
    return {
      success: false,
      error: result.error,
    }
  }

  return {
    customers,
    customer,
    fetchCustomers,
    fetchCustomer,
    updateCustomer,
    tableMeta,
    keyword,
    loaded,
  }
})
