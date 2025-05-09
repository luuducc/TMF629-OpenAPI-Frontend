import type { 
  AccountRef, 
  AgreementRef, 
  Characteristic, 
  ContactMedium, 
  CreditProfile, 
  PartyRef, 
  PaymentMethodRef,
  PartyRoleSpecificationRef, 
  RelatedPartyOrPartyRoleRef, 
  TimePeriod 
} from "./";
import { StatusType } from "./";

export type Customer = {
  // Identity & status
  '@type': 'Customer';
  id: string;
  name: string;
  role: string;
  status: StatusType | undefined;
  statusReason: string;
  description: string;

  // Time-bound validity
  validFor: TimePeriod;

  // Party reference
  engagedParty: PartyRef;
  partyRoleSpecification: PartyRoleSpecificationRef,

  // Associated resources
  account: AccountRef[];
  agreement: AgreementRef[];
  characteristic: Characteristic[];
  contactMedium: ContactMedium[];
  creditProfile: CreditProfile[];
  paymentMethod: PaymentMethodRef[];
  relatedParty: RelatedPartyOrPartyRoleRef[];
}