import { PartyType } from "./party-type"

export type PartyRef = {
  name: string,
  '@referredType': PartyType | undefined
}