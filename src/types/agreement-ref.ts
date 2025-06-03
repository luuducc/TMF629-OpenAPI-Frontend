export enum AgreementType {
  SupplierAgreement = 'SupplierAgreement', 
  ServiceAgreement = 'ServiceAgreement'
}

export type AgreementRef = {
  name: string,
  '@referredType': AgreementType | undefined
}

export const agreementOptions: { name: string, type: AgreementType }[] = 
  Object.values(AgreementType).map(value => ({
    name: value, type: value
  }))