import axios from "axios"


// const API_URL = 'https://your-api-endpoint.com/customers'; // 🔁 Replace with your real endpoint
const API_URL = 'http://localhost:8080/customerManagement/v1/customer'

// Word banks for names and descriptions
const adjectives = ['Global', 'Smart', 'Agile', 'Bright', 'Trusted', 'Future', 'Dynamic', 'Fast', 'Secure', 'Innovative'];
const nouns = ['Solutions', 'Technologies', 'Systems', 'Networks', 'Partners', 'Enterprises', 'Logistics', 'Holdings', 'Services', 'Labs'];
const descriptions = [
  'Leading provider of digital transformation services.',
  'Customer-focused organization with global reach.',
  'Expert in integrated IT solutions.',
  'Specialist in logistics and supply chain optimization.',
  'Provider of financial services and consulting.',
  'Delivering scalable cloud infrastructure.',
  'Dedicated to innovation and security.',
  'Supporting businesses with advanced analytics.',
  'Helping startups scale rapidly.',
  'Committed to quality and customer success.'
];

const usedNames = new Set();
// Helpers
const randomItem = arr => arr[Math.floor(Math.random() * arr.length)];
function generateUniqueName() {
  let name;
  let attempt = 0;
  do {
    const base = `${randomItem(adjectives)} ${randomItem(nouns)}`;
    name = attempt === 0 ? base : `${base} ${attempt}`;
    attempt++;
  } while (usedNames.has(name));

  usedNames.add(name);
  return name;
}
const randomReferredType = () => (Math.random() > 0.5 ? 'Individual' : 'Organization');

// Generate a valid date range
function generateDateRange() {
  const now = new Date();
  const start = new Date(now.getTime() - Math.random() * 365 * 24 * 60 * 60 * 1000); // up to 1 year in the past
  const end = new Date(start.getTime() + Math.random() * 180 * 24 * 60 * 60 * 1000 + 7 * 24 * 60 * 60 * 1000); // at least 1 week later, up to ~6 months
  return {
    startDateTime: start.toISOString(),
    endDateTime: end.toISOString()
  };
}

// Generate customer object
const generateCustomer = () => {
  const validFor = generateDateRange();
  return {
    "@type": "Customer",
    id: '',
    name: generateUniqueName(),
    role: '',
    description: randomItem(descriptions),
    status: undefined,
    statusReason: '',
  
    // Validity period
    validFor,

    // Engaged party
    engagedParty: {
      name: '',
      '@referredType': randomReferredType()
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
};

// Create and send 100 POST requests
async function createCustomers(count = 100) {
  for (let i = 0; i < count; i++) {
    const customer = generateCustomer();
    try {
      const response = await axios.post(API_URL, customer);
      console.log(`✅ Created customer ${i + 1}: ${customer.name}`);
    } catch (error) {
      console.error(`❌ Failed to create customer ${i + 1}:`, error.response?.data || error.message);
    }
  }
}

createCustomers();
