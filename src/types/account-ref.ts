export enum AccountType {
  BillingAccount = 'BillingAccount',
  SettlementAccount = 'SettlementAccount',
}
export type AccountRef = {
  name: string
  '@referredType': AccountType | undefined
}
export const accountOptions: { name: string; type: AccountType }[] =
  Object.values(AccountType).map((value) => ({
    name: value,
    type: value,
  }))
