export enum AgreementType {
  SupplierAgreement, ServiceAgreement
}

export type AgreementRef = {
  name?: string,
  referredType: AgreementType
}