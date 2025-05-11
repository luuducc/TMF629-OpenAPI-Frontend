import type { TimePeriod } from "./time-period";

export type CreditProfile = {
  creditProfileDate: string;     // Use ISO string for LocalDate
  creditRiskRating: number;
  creditScore: number;
  validFor: TimePeriod;
}