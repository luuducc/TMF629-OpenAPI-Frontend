import axios, { isAxiosError } from 'axios'

import { type Customer } from '@/types'

const API_URL = 'http://localhost:8080/customerManagement/v1/customer'

export const CustomerService = {
  async getCustomers(): Promise<Customer[]> {
    const response = await axios.get(
      API_URL +
        '?limit=200&fields=id,name,status,engagedParty,status,description'
    )
    return response.data.items as Customer[]
  },

  async getCustomerById(id: string): Promise<{
    success: boolean
    data?: Customer
    error?: string
  }> {
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

  async createCustomer(
    customer: Customer
  ): Promise<{ success: boolean; error?: string }> {
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

  async patchCustomer(
    id: string,
    customer: Customer
  ): Promise<{
    success: boolean
    data?: Customer
    error?: string
  }> {
    try {
      const response = await axios.patch(
        `${API_URL}/${id}`,
        formatCustomerRequest(customer)
      )
      return {
        success: true,
        data: formatCustomerResponse(response.data as Customer),
      }
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

  async deleteCustomer(
    id: string
  ): Promise<{ success: boolean; error?: string }> {
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
  const newCreditProfile = customer.creditProfile.map((val) => {
    const {
      creditProfileDate,
      validFor: { startDateTime: creditStartDate, endDateTime: creditEndDate },
    } = val
    return {
      ...val,
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
const formatCustomerResponse = (customer: Customer) => {
  const { startDateTime, endDateTime } = customer.validFor
  const newCreditProfile = customer.creditProfile.map((val) => {
    const {
      creditProfileDate,
      validFor: { startDateTime: creditStartDate, endDateTime: creditEndDate },
    } = val
    return {
      ...val,
      creditProfileDate: new Date(creditProfileDate),
      validFor: {
        startDateTime: new Date(creditStartDate),
        endDateTime: new Date(creditEndDate),
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
  }
}
