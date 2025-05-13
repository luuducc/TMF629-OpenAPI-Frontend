export enum AccountType {
  BillingAccount, SettlementAccount
}
export type AccountRef = {
  name: string
  referredType: AccountType | undefined
}