import {
  StatusType,
  type AccountRef,
  type AgreementRef,
  type Characteristic,
  type ContactMedium,
  type CreditProfile,
  type PartyRef,
  type PartyRoleSpecificationRef,
  type PaymentMethodRef,
  type RelatedPartyOrPartyRoleRef,
  type TimePeriod,
} from './'

export type Customer = {
  // Identity & status
  '@type': 'Customer'
  id: string
  name: string
  role: string
  status: StatusType | undefined
  statusReason: string
  description: string

  // Time-bound validity
  validFor: TimePeriod

  // Party reference
  engagedParty: PartyRef
  partyRoleSpecification: PartyRoleSpecificationRef

  // Associated resources
  account: AccountRef[]
  agreement: AgreementRef[]
  characteristic: Characteristic[]
  contactMedium: ContactMedium[]
  creditProfile: CreditProfile[]
  paymentMethod: PaymentMethodRef[]
  relatedParty: RelatedPartyOrPartyRoleRef[]
}

export const defaultCustomer: Customer = {
  '@type': 'Customer',
  name: '',
  id: '',
  status: undefined,
  statusReason: '',
  validFor: {
    startDateTime: new Date(),
    endDateTime: new Date(),
  },
  engagedParty: {
    name: '',
    '@referredType': undefined,
  },
  role: '',
  description: '',
  partyRoleSpecification: {
    name: '',
    '@referredType': undefined,
  },
  account: [],
  agreement: [],
  characteristic: [],
  contactMedium: [],
  creditProfile: [],
  paymentMethod: [],
  relatedParty: [],
}
