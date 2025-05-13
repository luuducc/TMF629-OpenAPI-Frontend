export enum PaymentMethodType {
  BankCard,
  BankAccountTransfer, // Chuyển khoản ngân hàng 
  Check, // Séc
  Voucher, 
  Loyalty // Điểm thưởng, thẻ thành viên 
}
export type PaymentMethodRef = {
  name: string,
  referredType: PaymentMethodType | undefined
}