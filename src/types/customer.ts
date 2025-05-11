import type { ContactMedium } from "./contact-medium";
import type { PartyRef } from "./party-ref";
import type { AccountRef } from "./account-ref";
import type { AgreementRef } from "./agreement-ref";

export interface Customer {
  name: string;
  description: string;
  role: string;
  engagedParty: PartyRef;
  contactMedium?: ContactMedium[],
  account: AccountRef,
  agreement: AgreementRef
}