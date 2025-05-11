export enum AgreementType {
  BaseType, SupplierAgreement, ServiceAgreement
}

export type AgreementRef = {
  name?: string,
  referredType: AgreementType
}