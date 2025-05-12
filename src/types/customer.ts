import type { 
  ContactMedium, PartyRef, AccountRef, AgreementRef, Characteristic, CreditProfile, PaymentMethodRef, RelatedPartyOrPartyRoleRef
} from "@/types";


export interface Customer {
  name: string;
  description: string;
  role: string;
  engagedParty: PartyRef;
  account: AccountRef[],
  agreement: AgreementRef[],
  characteristic: Characteristic[],
  contactMedium: ContactMedium[],
  creditProfile: CreditProfile[],
  paymentMethod: PaymentMethodRef[],
  relatedParty: RelatedPartyOrPartyRoleRef[]
}