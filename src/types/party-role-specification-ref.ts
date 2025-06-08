export enum PartyRoleSpecificationType {
  CustomerRoleSpecification = 'CustomerRoleSpecification', 
  SupplierRoleSpecification ='SupplierRoleSpecification', 
  PartnerRoleSpecification = 'PartnerRoleSpecification'
}
export type PartyRoleSpecificationRef = {
  name: string,
  '@referredType': PartyRoleSpecificationType
}

export const partyRoleSpecificationOptions: { name: string, type: PartyRoleSpecificationType }[] = [
  { name: 'Customer', type: PartyRoleSpecificationType.CustomerRoleSpecification},
  { name: 'Supplier', type: PartyRoleSpecificationType.SupplierRoleSpecification},
  { name: 'Partner', type: PartyRoleSpecificationType.PartnerRoleSpecification}
]