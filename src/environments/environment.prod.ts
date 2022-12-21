export const environment = {
  production: true,
  backend_uri: 'https://appstage.dealsignal.com/api',
  googleClientId:"960428238674-rngsrajbbf5nhrint7hosk9ikabgnuoq.apps.googleusercontent.com",
  googleClientSecret: "3lJn4d8lKpe9s2C8B4of4iuP",
  googleRedirectUri: "http://localhost:8081",
  // googleRedirectUri: 'https://app-staging.dealsignal.com',
  salesforceClientId:
    "3MVG9sG9Z3Q1RlbcMidIUg33vYDMS8ZTHTL0Ra6nQU67QSrzX1FekASaiU9MCv0vf97fNedcdKd0YsuuK3Zs.",
  salesforceClientSecret: "3257212330431146315",
  salesforceRedirectUri: "http://localhost:8081",
  salesforceRedirectStateConnectAccount: "app.connectaccount",
  salesforceRedirectStateProspect: "app.dashboard.prospect.companies",
  salesforceRedirectStateLead: "app.dashboard.lead.companies",
  // salesforceRedirectUri: 'https://app-staging.dealsignal.com',
  hubspotRedirectUrl: 'https://349f0644.ngrok.io',
  jsforceConnQuery: "SELECT Id, Name FROM Account limit 1"
};
