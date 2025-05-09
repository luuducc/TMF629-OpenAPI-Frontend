export enum AccountType {
  BillingAccount = 'BillingAccount', 
  SettlementAccount = 'SettlementAccount'
}
export type AccountRef = {
  name: string
  '@referredType': AccountType | undefined
}