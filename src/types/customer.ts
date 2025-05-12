import type { 
  ContactMedium, PartyRef, AccountRef, AgreementRef, Characteristic 
} from "@/types";


export interface Customer {
  name: string;
  description: string;
  role: string;
  engagedParty: PartyRef;
  contactMedium?: ContactMedium[],
  account: AccountRef[],
  agreement: AgreementRef[],
  characteristic: Characteristic[]
}