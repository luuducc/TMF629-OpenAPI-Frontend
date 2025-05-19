import type { Customer } from "@/types"
import axios from "axios"

const API_URL = 'http://localhost:8080/customerManagement/v1/customer'

export const CustomerService = {
  async getCustomers(): Promise<Customer[]> {
    const response = await axios.get(API_URL)
    console.log('get all', response)
    return response.data.items
  },

  async getCustomerById(id: string): Promise<Customer> {
    const response = await axios.get(`${API_URL}/${id}`)
    return response.data
  },

  async createCustomer(customer: Customer): Promise<Customer> {
    const response = await axios.post(API_URL, customer)
    return response.data
  },

  async patchCustomer(id: string, customer: Customer): Promise<Customer> {
    const response = await axios.patch(`${API_URL}/${id}`, customer)
    return response.data
  },

  async deleteCustomer(id: string): Promise<void> {
    await axios.delete(`${API_URL}/${id}`)
  }
}
