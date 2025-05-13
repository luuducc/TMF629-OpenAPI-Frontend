export enum PartyRoleSpecificationType {
  CustomerRoleSpecification, SupplierRoleSpecification, PartnerRoleSpecification
}
export type PartyRoleSpecificationRef = {
  name: string,
  referredType: PartyRoleSpecificationType | undefined
}