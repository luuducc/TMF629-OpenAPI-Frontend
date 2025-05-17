import type { Customer } from "@/types";
import axios from "axios"

const API_URL = 'http://localhost:8080/customerManagement/v1/customer'


export const CustomerService = {
  async getCustomers() {
    const response = await axios.get(API_URL);
    return response.data.items;
  },

  async getCustomerById(id: string) {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  },

  async createCustomer(customer: Customer) {
    return axios.post(API_URL, customer);
  },

  async patchCustomer(id: string, customer: Customer) {
    return axios.patch(`${API_URL}/${id}`, customer);
  }
};
