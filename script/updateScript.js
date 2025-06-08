import axios from 'axios'

const API_URL = 'http://localhost:8080/customerManagement/v1/customer'

// Allowed statuses
const statuses = [
  'Draft',
  'Created',
  'Pending',
  'Verified',
  'Active',
  'Suspended',
  'Inactive',
  'Archived',
  'Blacklisted',
  'Rejected',
  'Deleted',
]

const randomItem = (arr) => arr[Math.floor(Math.random() * arr.length)]

// Update customers
async function updateCustomerStatuses() {
  try {
    // 1. Fetch existing customers
    const { data: {items: customers} } = await axios.get(`${API_URL}?fields=id,status&limit=200`)
    console.log(`🔄 Found ${customers.length} customers to update`)

    // 2. Update each customer with a random status
    for (const [index, customer] of customers.entries()) {
      const newStatus = randomItem(statuses)

      // Optional: skip if already has that status
      if (customer.status === newStatus) continue

      // const updatedCustomer = { ...customer, status: newStatus }

      try {
        // Assuming PATCH replaces the whole object (if partial update is supported, use PATCH)
        await axios.patch(`${API_URL}/${customer.id}`, {
          '@type': 'Customer',
          status: newStatus,
        })
        console.log(`✅ Updated #${index + 1} (${customer.name}): status → ${newStatus}`)
      } catch (err) {
        console.error(`❌ Failed to update #${index + 1} (${customer.name}):`, err.response?.data || err.message)
      }
    }
  } catch (err) {
    console.error('❌ Failed to fetch customers:', err.response?.data || err.message)
  }
}

updateCustomerStatuses()
