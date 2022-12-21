import { environment } from "@app/environments/environment";

/**
 * For API Requests
 */
export class ApiUrl {
    // Base URLs
    static backendUri = `${environment.backend_uri}`;
    static apiVersion = 'v0';
    static apiVersion1 = 'v1';
    static baseBackendUrl = `${ApiUrl.backendUri}/${ApiUrl.apiVersion}`;
    static baseBackendUrlV1 = `${ApiUrl.backendUri}/${ApiUrl.apiVersion1}`;

    static auth = 'auth';
    static signIn = 'sign_in';
    static signUp = 'sign_up';
    static forgotPassword = 'forgot_password';
    static users = 'users';
    static userProfile = `${ApiUrl.users}/profile`;
    static usersEmailVerification = `${ApiUrl.users}/email_verification`;
    static usersVerifyEmailVerificationToken = `${ApiUrl.users}/verify_email_verification_token`;
    static usersOnBoardingQuestions = `user_onboarding_questions`;
    static usersOnBoardingCredit = `${ApiUrl.users}/add_onboarding_credits`;
    static updateOnBoardingProgression = `${ApiUrl.users}/update_onboarding_progression`;
    static createMultiple = 'create_multiple';
    static contactSearch = 'contacts/search';
    static contacts = 'contacts';
    static profile = 'profile';
    static subscriptions = 'subscriptions';
    static annualPricingTiers = 'annual_pricing_tiers';
    static dashboardTabs = 'dashboard_tabs';
    static useCaseWidgets = 'use_case_widgets';
    static applicationUseCases = 'application_use_cases';
    static companySearch = 'companies/search';
    static companies = 'companies';
    static userEvents = 'user_events';
    static recentContactsEvents = 'recent_contacts_events';
    static recentAaccountsEvents = 'recent_accounts_events';
    static persona = 'personas';
    static advanceSearch = 'search/advance';
    static recentlyViewedCompanies = 'recently_viewed_companies';
    static defaultList = 'default_list';
    static infoDepartments = 'info/departments';
    static infoSeniorities = 'info/seniorities';
    static keywords = 'keywords';
    static contactSearches = 'contact_searches';
    static accountSearches = 'account_searches';
    static viewAccounts = 'view_accounts';
    static viewContacts = 'view_contacts';
    static verifyAccounts = 'verify_accounts';
    static verifyContacts = 'verify_contacts';
    static locations = 'locations';
    static default_locations = 'default_locations';
    static industries = 'industries';
    static accountSegments = 'account_segments';
    static technologies = 'technologies';
    static contactTpNameSearch = 'contacts/tp_name_search';
    static createPlaceholderContact = 'create_placeholder_contact';
    static saved_searches = 'saved_searches';
}
