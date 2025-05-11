import type { ContactMedium } from "./contact-medium";
import type { PartyRef } from "./party-ref";

export interface Customer {
  name: string;
  description: string;
  role: string;
  engagedParty: PartyRef;
  contactMedium?: ContactMedium[]
}