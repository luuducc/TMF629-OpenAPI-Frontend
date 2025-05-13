import type { 
  AccountRef, 
  AgreementRef, 
  Characteristic, 
  ContactMedium, 
  CreditProfile, 
  PartyRef, 
  PaymentMethodRef, 
  RelatedPartyOrPartyRoleRef, 
  TimePeriod 
} from "./";
import { StatusType } from "./";

export type Customer = {
  // Identity & status
  id: string;
  name: string;
  role: string;
  status: StatusType;
  statusReason: string;
  description: string;

  // Time-bound validity
  validFor: TimePeriod;

  // Party reference
  engagedParty: PartyRef;

  // Associated resources
  account: AccountRef[];
  agreement: AgreementRef[];
  characteristic: Characteristic[];
  contactMedium: ContactMedium[];
  creditProfile: CreditProfile[];
  paymentMethod: PaymentMethodRef[];
  relatedParty: RelatedPartyOrPartyRoleRef[];
}