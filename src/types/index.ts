// ─── Type Exports ──────────────────────────────────────────────
export type { AccountRef } from './account-ref'
export type { AgreementRef } from './agreement-ref'
export type { Characteristic } from './characteristic'
export type {
  ContactMedium,
  EmailContactMedium,
  FaxContactMedium,
  GeographicAddressContactMedium,
  PhoneContactMedium,
  SocialContactMedium,
} from './contact-medium'
export type { CreditProfile } from './credit-profile'
export type { Customer } from './customer'
export type { PaginationMeta } from './pagination-meta'
export type { PartyRef } from './party-ref'
export type { PartyRoleSpecificationRef } from './party-role-specification-ref'
export type { PaymentMethodRef } from './payment-method-ref'
export type { PrimeVueSeverity } from './prime-vue-severity'
export type { RelatedPartyOrPartyRoleRef } from './related-party-or-party-role-ref'
export type { TimePeriod } from './time-period'

// ─── Enum / Constant / Value Exports ───────────────────────────
export { accountOptions, AccountType } from './account-ref'
export { agreementOptions, AgreementType } from './agreement-ref'
export { relationshipOptions, RelationshipType, relationshipValueOptions, ValueType } from './characteristic'
export { contactMediumMapping, ContactMediumType, contactOptions } from './contact-medium'
export { defaultCustomer } from './customer'
export { CustomerFormMode } from './customer-form-mode'
export { partyRoleSpecificationOptions, PartyRoleSpecificationType } from './party-role-specification-ref'
export { PartyType, partyTypeOptions } from './party-type'
export { PaymentMethodType, paymentOptions } from './payment-method-ref'
export { getStatusSeverity, statusOptions, StatusType } from './status-type'
