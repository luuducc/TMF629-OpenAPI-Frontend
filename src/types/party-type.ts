export enum PartyType {
  Individual = 'Individual',
  Organization = 'Organization',
}

export const partyTypeOptions: { name: string; type: PartyType }[] =
  Object.values(PartyType).map((value) => ({
    name: value,
    type: value,
  }))
