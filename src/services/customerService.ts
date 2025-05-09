import type { Customer } from "@/types"
import axios from "axios"

const API_URL = 'http://localhost:8080/customerManagement/v1/customer'

export const CustomerService = {
  async getCustomers(): Promise<Customer[]> {
    const response = await axios.get(API_URL + '?limit=100')
    const customers: Customer[] = response.data.items as Customer[]
    return customers.map(formatCustomerResponse)
  },

  async getCustomerById(id: string): Promise<Customer> {
    const response = await axios.get(`${API_URL}/${id}`)
    return formatCustomerResponse(response.data as Customer)
  },

  async createCustomer(customer: Customer): Promise<Customer> {
    const response = await axios.post(API_URL, formatCustomerRequest(customer))
    return formatCustomerResponse(response.data as Customer)
  },

  async patchCustomer(id: string, customer: Customer): Promise<Customer> {
    const response = await axios.patch(`${API_URL}/${id}`, formatCustomerRequest(customer))
    return formatCustomerResponse(response.data as Customer)
  },

  async deleteCustomer(id: string): Promise<void> {
    await axios.delete(`${API_URL}/${id}`)
  }
}

const formatCustomerRequest = (customer: Customer) => {
  const { startDateTime, endDateTime } = customer.validFor
  const newCreditProfile = customer.creditProfile.map(val => {
    const { creditProfileDate, validFor: { startDateTime: creditStartDate, endDateTime: creditEndDate }} = val
    return {
      ...val,
      creditProfileDate: creditProfileDate.toISOString(),
      validFor: {
        startDateTime: creditStartDate.toISOString(),
        endDateTime: creditEndDate.toISOString()
      }
    }
  })
  return {
    ...customer, 
    validFor: {
      startDateTime: startDateTime.toISOString(),
      endDateTime: endDateTime.toISOString()
    }, 
    creditProfile:  newCreditProfile
  }
}
const formatCustomerResponse = (customer: Customer) => {
  const { startDateTime, endDateTime } = customer.validFor
  const newCreditProfile = customer.creditProfile.map(val => {
    const { creditProfileDate, validFor: { startDateTime: creditStartDate, endDateTime: creditEndDate }} = val
    return {
      ...val,
      creditProfileDate: new Date(creditProfileDate),
      validFor: {
        startDateTime: new Date(creditStartDate),
        endDateTime: new Date(creditEndDate)
      }
    }
  })
  return {
    ...customer, 
    validFor: {
      startDateTime: new Date(startDateTime),
      endDateTime: new Date(endDateTime)
    },
    creditProfile: newCreditProfile
  }
}
