import type { TimePeriod } from "./time-period";

export type CreditProfile = {
  creditProfileDate: Date;     // Use ISO string for LocalDate
  creditRiskRating: number;
  creditScore: number;
  validFor: TimePeriod;
}