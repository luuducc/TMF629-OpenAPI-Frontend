import { PartyType } from "./party-type"
export interface PartyRef {
  name: string,
  '@referredType': PartyType
}
export type RelatedPartyOrPartyRoleRef = {
  partyOrPartyRole: PartyRef,
  role: string
}