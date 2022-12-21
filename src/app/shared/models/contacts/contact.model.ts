import { Company } from "@app/shared/models/company/company.model";

export class Contact {
  id?: string;
  first_name?: string;
  last_name?: string;
  name?: string;
  image_url?: string;
  logo_url?: string;
  headline?: string;
  company?: Company;
  email?: string;
  phone?: string;
  email_status?: string;
  phone_verified?: boolean;
  is_fresh?: boolean;
  li_updated_at?: string;
  updated_at?: string;
  linkedin_url?: string;
  facebook_url?: string;
  slack_url?: string;
  twitter_url?: string;
  current_companies_and_positions?: {};
  current_position?: {};
  past_positions?: any;
  company_name?: string;
  li_member_id?: string;
  is_from_pdl?: boolean;
  title?: string;
  lastUpdatedDate? : number;
  overall_verification_status?: string;

}
