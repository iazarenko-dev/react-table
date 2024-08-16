import { CompanyInfo } from "./company-row";

export interface Filter {
  id: keyof CompanyInfo,
  value: string,
}
