export enum AgreementType {
  SupplierAgreement = 'SupplierAgreement', 
  ServiceAgreement = 'ServiceAgreement'
}

export type AgreementRef = {
  name: string,
  '@referredType': AgreementType | undefined
}