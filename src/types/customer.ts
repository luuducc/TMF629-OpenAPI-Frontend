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
import { PartyRoleSpecificationType } from './party-role-specification-ref'
import { PartyType } from './party-type'

export type Customer = {
  // Identity & status
  '@type': 'Customer'
  id: string
  name: string
  role: string
  status: StatusType
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
    '@referredType': PartyType.Individual,
  },
  role: '',
  description: '',
  partyRoleSpecification: {
    name: '',
    '@referredType': PartyRoleSpecificationType.CustomerRoleSpecification,
  },
  account: [],
  agreement: [],
  characteristic: [],
  contactMedium: [],
  creditProfile: [],
  paymentMethod: [],
  relatedParty: [],
}
