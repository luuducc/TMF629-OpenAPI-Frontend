export enum PartyRoleSpecificationType {
  CustomerRoleSpecification = 'CustomerRoleSpecification', 
  SupplierRoleSpecification ='SupplierRoleSpecification', 
  PartnerRoleSpecification = 'PartnerRoleSpecification'
}
export type PartyRoleSpecificationRef = {
  name: string,
  '@referredType': PartyRoleSpecificationType | undefined
}