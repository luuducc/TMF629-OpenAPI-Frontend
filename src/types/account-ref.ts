export enum AccountType {
  BaseType, BillingAccount, SettlementAccount
}
export type AccountRef = {
  name?: string
  referredType: AccountType
}