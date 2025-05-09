import type { ContactMedium } from "./contact-medium";
interface EngagedParty {
  id: string;
  name: string;
}
export interface Customer {
  name: string;
  description: string;
  role: string;
  engagedParty: EngagedParty;
  contactMedium?: ContactMedium[]
}