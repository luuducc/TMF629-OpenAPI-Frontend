export enum PaymentMethodType {
  BankCard = 'BankCard',
  BankAccountTransfer = 'BankAccountTransfer', // Chuyển khoản ngân hàng 
  Check = 'Check', // Séc
  Voucher = 'Voucher', 
  Loyalty = 'Loyalty' // Điểm thưởng, thẻ thành viên 
}
export type PaymentMethodRef = {
  name: string,
  '@referredType': PaymentMethodType | undefined
}