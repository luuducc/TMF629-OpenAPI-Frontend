import axios, { isAxiosError } from 'axios'

import { type Customer, type PaginationMeta } from '@/types'

const API_URL = 'http://localhost:8080/customerManagement/v1/customer'

type GetAllResult =
  | { success: true; data: Customer[]; paginationMeta: PaginationMeta }
  | { success: false; error: string }
type GetSingleResult = { success: true; data: Customer } | { success: false; error: string }
type GeneralResult = { success: boolean; error?: string }

export const CustomerService = {
  async getCustomers(keyword: string, offset: number, limit: number): Promise<GetAllResult> {
    const queryParams = `search=${keyword}&limit=${limit}&offset=${offset}`
    try {
      const response = await axios.get(`${API_URL}?${queryParams}`)
      const { items, paginationMeta } = response.data
      return { success: true, data: items as Customer[], paginationMeta: paginationMeta as PaginationMeta }
    } catch (err) {
      if (isAxiosError(err)) {
        const errData = err.response?.data
        console.warn('Axios error:', errData.message)
        return { success: false, error: errData?.message || 'Server error' }
      }
      console.error('Unexpected error:', err)
      return { success: false, error: 'Unexpected error' }
    }
  },

  async getCustomerById(id: string): Promise<GetSingleResult> {
    await new Promise((resolve) => setTimeout(resolve, 200))
    try {
      const response = await axios.get(`${API_URL}/${id}`)
      return {
        success: true,
        data: formatCustomerResponse(response.data as Customer),
      }
    } catch (err) {
      console.error('Error when get customer', err)
      return { success: false, error: 'Cannot get customer' }
    }
  },

  async createCustomer(customer: Customer): Promise<GeneralResult> {
    try {
      await axios.post(API_URL, formatCustomerRequest(customer))
      return { success: true }
    } catch (err) {
      if (isAxiosError(err)) {
        const errData = err.response?.data
        console.warn('Axios error:', errData.message)
        return { success: false, error: errData?.message || 'Server error' }
      }
      console.error('Unexpected error:', err)
      return { success: false, error: 'Unexpected error' }
    }
  },

  async patchCustomer(id: string, customer: Customer): Promise<GetSingleResult> {
    await new Promise((resolve) => setTimeout(resolve, 200))
    try {
      const response = await axios.patch(`${API_URL}/${id}`, formatCustomerRequest(customer))
      return { success: true, data: formatCustomerResponse(response.data as Customer) }
    } catch (err) {
      if (isAxiosError(err)) {
        const errData = err.response?.data
        console.warn('Axios error:', errData.message)
        return { success: false, error: errData?.message || 'Server error' }
      }
      console.error('Unexpected error:', err)
      return { success: false, error: 'Unexpected error' }
    }
  },

  async deleteCustomer(id: string): Promise<GeneralResult> {
    try {
      await axios.delete(`${API_URL}/${id}`)
      return { success: true }
    } catch (err) {
      console.error('Error delete customer', err)
      return { success: false, error: 'Something went wrong' }
    }
  },
}

const formatCustomerRequest = (customer: Customer) => {
  const { startDateTime, endDateTime } = customer.validFor
  const newCreditProfile = customer.creditProfile.map((oldVal) => {
    const {
      creditProfileDate,
      validFor: { startDateTime: creditStartDate, endDateTime: creditEndDate },
    } = oldVal
    return {
      ...oldVal,
      creditProfileDate: creditProfileDate.toISOString(),
      validFor: {
        startDateTime: creditStartDate.toISOString(),
        endDateTime: creditEndDate.toISOString(),
      },
    }
  })
  return {
    ...customer,
    validFor: {
      startDateTime: startDateTime.toISOString(),
      endDateTime: endDateTime.toISOString(),
    },
    creditProfile: newCreditProfile,
  }
}
const formatCustomerResponse = (customer: Customer): Customer => {
  const { startDateTime, endDateTime } = customer.validFor
  const newCreditProfile = customer.creditProfile.map((oldVal) => {
    const {
      creditProfileDate,
      validFor: { startDateTime: creditStartDate, endDateTime: creditEndDate },
    } = oldVal
    return {
      ...oldVal,
      creditProfileDate: new Date(creditProfileDate),
      validFor: {
        startDateTime: new Date(creditStartDate),
        endDateTime: new Date(creditEndDate),
      },
    }
  })
  const newContactMedium = customer.contactMedium.map((oldVal) => {
    const {
      validFor: { startDateTime: mediumStartDate, endDateTime: mediumEndDate },
    } = oldVal
    return {
      ...oldVal,
      validFor: {
        startDateTime: new Date(mediumStartDate),
        endDateTime: new Date(mediumEndDate),
      },
    }
  })
  return {
    ...customer,
    validFor: {
      startDateTime: new Date(startDateTime),
      endDateTime: new Date(endDateTime),
    },
    creditProfile: newCreditProfile,
    contactMedium: newContactMedium,
  }
}
