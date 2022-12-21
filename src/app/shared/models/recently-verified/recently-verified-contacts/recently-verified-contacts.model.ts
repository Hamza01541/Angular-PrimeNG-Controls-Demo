export class RecentlyVerifiedContact {
  type?: string;
  city_id?: null;
  company?: {
    annual_cost_of_revenue?: string;
    annual_gross_profit?: string;
    annual_net_income?: string
    annual_operating_income?: string,
    city_name?: string,
    company_location?: string,
    country_name?: string,
    date_founded?: string,
    employee_low?: number,
    employee_range?: string,
    employees_linkedin?: number,
  }
  company_name?:string;
  country_id?: number;
  email?: string;
  email_status?:string;
  email_status_order?: null;
  first_name?: string;
  headline?: string;
  id?: number;
  image_url?: string;
  industry?: string;
  is_fresh?: boolean;
  is_watchlisted?: boolean;
  last_name?: string
  li_updated_at?: string;
  linkedin_url?: string;
  location?: string;
  location_area?: string;
  logo_url?: string;
  middle_name?: null;
  name?: string;
  phone?: string;
  phone_verified?: boolean;
  popularity?: number;
  remark?: null;
  search_data?: string;
  search_on_name?: string;
  state_id?: number;
  updated_at?: string;
  valid_email?: boolean;
}
