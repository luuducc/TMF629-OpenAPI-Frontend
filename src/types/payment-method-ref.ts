export enum PaymentMethodType {
  BankCard = 'BankCard',
  BankAccountTransfer = 'BankAccountTransfer', // Chuyển khoản ngân hàng
  Check = 'Check', // Séc
  Voucher = 'Voucher',
  Loyalty = 'Loyalty', // Điểm thưởng, thẻ thành viên
}
export type PaymentMethodRef = {
  name: string
  '@referredType': PaymentMethodType | undefined
}

export const paymentOptions: { name: string; type: PaymentMethodType }[] = [
  {
    name: 'Bank account transfer',
    type: PaymentMethodType.BankAccountTransfer,
  },
  { name: 'Bank card', type: PaymentMethodType.BankCard },
  { name: 'Check', type: PaymentMethodType.Check },
  { name: 'Loyalty', type: PaymentMethodType.Loyalty },
  { name: 'Voucher', type: PaymentMethodType.Voucher },
]
