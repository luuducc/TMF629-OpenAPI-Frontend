export enum PartyType {
  BaseType, Individual, Organization
}

export type PartyRef = {
  name?: string,
  referredType: PartyType
}