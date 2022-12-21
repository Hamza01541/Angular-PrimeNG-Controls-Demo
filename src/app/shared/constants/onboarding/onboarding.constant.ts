export const QuestionnaireSchema = {
  step1: { // Teams and Roles Step
    questions: [
      // Teams
      {
        title: "Select your team",
        identifier: "q_team",
        questionType: "single_choice",
        dependedQuestion: '',
        dependedAnswer: '',
        questionId: 0,
        positionId: 1,
        selected: false,
        inputType: 'radio',
        answerQuestions: [
          {
            title: "Sales",
            identifier: "a_team_sales",
            answer_type: "text",
            selected: false,
            sequence: 1
          },
          {
            title: "Marketing",
            identifier: "a_team_marketing",
            answer_type: "text",
            selected: false,
            sequence: 2
          },
          {
            title: "Other",
            identifier: "a_team_other",
            answer_type: "text",
            selected: false,
            sequence: 3
          }
        ],
        answers: []
      },

      // Sales => Roles
      {
        title: "What is your role in Sales?",
        identifier: "q_role_sale",
        questionType: "single_choice",
        dependedQuestion: 0,
        dependedAnswer: 'a_team_sales',
        questionId: 1,
        positionId: 2,
        selected: false,
        inputType: 'radio',
        answerQuestions: [
          {
            title: "SDR/Inside Sales",
            identifier: "a_role_sale_inside_sales",
            answer_type: "text",
            selected: false,
            sequence: 1
          },
          {
            title: "Sales Operations",
            identifier: "a_role_sale_sales_operations",
            answer_type: "text",
            selected: false,
            sequence: 2
          },
          {
            title: "Sales Management",
            identifier: "a_role_sale_sales_management",
            answer_type: "text",
            selected: false,
            sequence: 3
          }
        ],
        extraQuestions: [
          {
            title: "Field Sales",
            identifier: "a_role_sale_field_sales",
            answer_type: "text",
            selected: false,
            sequence: 4
          },
          {
            title: "Sales Enablement",
            identifier: "a_role_sale_sales_enablement",
            answer_type: "text",
            selected: false,
            sequence: 5
          },
          {
            title: "Other",
            identifier: "a_role_sale_other",
            answer_type: "text",
            custom_answer: '',
            selected: false,
            sequence: 6
          }
        ],
        answers: []
      },

      /**
       * @todo Will use this in future
       */
      // marketing role
      // {
      //   title: "What is Your Role In Marketing",
      //   identifier: "q_marketing_role",
      //   questionType: "single_choice",
      //   dependedQuestion: 0,
      //   dependedAnswer: 'a_team_marketing',
      //   questionId: 1,
      //   positionId: 2,
      //   inputType: 'radio',
      //   selected:false,
      //   answerQuestions: [
      //     {
      //       title: "Demand Gen",
      //       identifier: "a_marketing_role_demand_gen",
      //       answer_type: "text",
      //       selected:false,
      //       sequence: 1
      //     },
      //     {
      //       title: "Marketing Operations",
      //       identifier: "a_marketing_role_marketing_operations",
      //       answer_type: "text",
      //       selected:false,
      //       sequence: 2
      //     },
      //     {
      //       title: "Marketing Generalist",
      //       identifier: "a_marketing_role_marketing_generalist",
      //       answer_type: "text",
      //       selected:false,
      //       sequence: 3
      //     },
      //   ],
      //   answers: []
      // }

    ]
  },
  step2: { // Use Cases Step
    questions: [
      //  Sales => SDR/Inside Sales
      {
        title: "Sales Use Cases",
        questionType: "multiple_choice",
        identifier: "q_usecases_inside_sales",
        dependedQuestion: '',
        dependedAnswer: 'a_role_sale_inside_sales',
        questionId: 0,
        positionId: 1,
        inputType: 'checkbox',
        selected: false,
        answerQuestions: [
          {
            title: "Search & Verify",
            identifier: "a_usecases_inside_sale_search_verify",
            answer_type: "text",
            selected: false,
            sequence: 1
          },
          {
            title: "Build Verified Prospect Lists",
            identifier: "a_usecases_inside_sale_prospect_list",
            answer_type: "text",
            selected: false,
            sequence: 2
          },
          {
            title: "Get Chrome Extension for Prospecting on Web & Social",
            identifier: "a_usecases_inside_sale_chrome_extension",
            answer_type: "text",
            selected: false,
            sequence: 3
          },

        ],
        extraQuestions: [
          {
            title: "Intent-based Accounts & Contacts",
            identifier: "a_usecases_inside_sale_accounts_contacts",
            answer_type: "text",
            selected: false,
            sequence: 4
          },
          {
            title: "Build Verified Account Lists",
            identifier: "a_usecases_inside_sale_account_list",
            answer_type: "text",
            selected: false,
            sequence: 5
          },
          {
            title: "Enrich Existing Lists of Accounts or Contacts",
            identifier: "a_usecases_inside_sale_accounting_contacts",
            answer_type: "text",
            selected: false,
            sequence: 6
          }
        ],
        answers: []
      },

      // Sales => Field Sales
      {
        title: "Sales Use Cases",
        questionType: "multiple_choice",
        identifier: "q_usecases_sale_field_sales",
        dependedQuestion: '',
        dependedAnswer: 'a_role_sale_field_sales',
        questionId: 0,
        positionId: 1,
        inputType: 'checkbox',
        selected: false,
        answerQuestions: [
          {
            title: "Search & Verify",
            identifier: "a_usecase_field_sales_search_verify",
            answer_type: "text",
            selected: false,
            sequence: 1
          },
          {
            title: "Intent-based Accounts & Contacts",
            identifier: "a_usecase_field_sales_accounts_contacts",
            answer_type: "text",
            selected: false,
            sequence: 2
          },
          {
            title: "Get Chrome Extension for Prospecting on Web & Social",
            identifier: "a_usecase_field_sales_chrome_extension",
            answer_type: "text",
            selected: false,
            sequence: 3
          }
        ],
        extraQuestions: [
          {
            title: "Build Verified Account Lists",
            identifier: "a_usecase_field_sales_build_verified_account_list",
            answer_type: "text",
            selected: false,
            sequence: 4
          },
          {
            title: "Build Verified Prospect Lists",
            identifier: "a_usecase_field_sales_build_verified_account_list",
            answer_type: "text",
            selected: false,
            sequence: 5
          },
          {
            title: "Enrich Existing Lists of Accounts or Contacts",
            identifier: "a_usecase_field_sales_enrich_existing_lists_of_accounting_or_contacts",
            answer_type: "text",
            selected: false,
            sequence: 6
          }
        ],
        answers: []
      },

      // Sales => Sales Management
      {
        title: "Sales Use Cases",
        questionType: "multiple_choice",
        identifier: "q_usecases_sale_managment",
        dependedQuestion: '',
        dependedAnswer: 'a_role_sale_sales_management',
        questionId: 0,
        positionId: 1,
        inputType: 'checkbox',
        selected: false,
        answerQuestions: [
          {
            title: "Search & Verify",
            identifier: "a_usecase_sales_managment_search_verify",
            answer_type: "text",
            selected: false,
            sequence: 1
          },
          {
            title: "Intent-based Accounts & Contacts",
            identifier: "a_usecase_sales_managment_accounts_contacts",
            answer_type: "text",
            selected: false,
            sequence: 2
          },
          {
            title: "Invite Sales Team / Users",
            identifier: "a_usecase_sales_managment_invite_sales_team",
            answer_type: "text",
            selected: false,
            sequence: 3
          }
        ],
        extraQuestions: [
          {
            title: "Build Verified Account Lists",
            identifier: "a_usecase_sales_managment_build_verified_account_lists",
            answer_type: "text",
            selected: false,
            sequence: 4
          },
          {
            title: "Build Verified Prospect Lists",
            identifier: "a_usecase_sales_managment_build_verified_prospect_lists",
            answer_type: "text",
            selected: false,
            sequence: 5
          },
          {
            title: "Get Chrome Extension for Prospecting on Web & Social",
            identifier: "a_usecase_sales_managment_chrome_extension",
            answer_type: "text",
            selected: false,
            sequence: 6
          }
        ],
        answers: []
      },

      // Sales => Operations
      {
        title: "Sales Use Cases",
        questionType: "multiple_choice",
        identifier: "q_usecases_sale_operation",
        dependedQuestion: '',
        dependedAnswer: 'a_role_sale_sales_operations',
        questionId: 0,
        positionId: 1,
        selected: false,
        inputType: 'checkbox',
        answerQuestions: [
          {
            title: "Search & Verify",
            identifier: "a_usecase_sales_operation_search_verify",
            answer_type: "text",
            selected: false,
            sequence: 1
          },
          {
            title: "Intent-based Accounts & Contacts",
            identifier: "a_usecase_sales_operation_accounts_contacts",
            answer_type: "text",
            selected: false,
            sequence: 2
          },
          {
            title: "Connect CRM and Refresh CRM Data",
            identifier: "a_usecase_sales_operation_contect_crm_and_refresh_crm_data",
            answer_type: "text",
            selected: false,
            sequence: 3
          },
        ],
        extraQuestions: [
          {
            title: "Enrich Existing Accounts or Contacts",
            identifier: "a_usecase_sales_operation_enrich_existing_accounts_or_contact",
            answer_type: "text",
            selected: false,
            sequence: 4
          },
          {
            title: "Build Verified Account Lists",
            identifier: "a_usecase_sales_operation_build_verified_account_lists",
            answer_type: "text",
            selected: false,
            sequence: 5
          },
          {
            title: "Build Verified Prospect Lists",
            identifier: "a_usecase_sales_managment_build_verified_prospect_lists",
            answer_type: "text",
            selected: false,
            sequence: 6
          },
          {
            title: "Get Chrome Extension for Prospecting on Web & Social",
            identifier: "a_usecase_sales_operation_chrome_extension",
            answer_type: "text",
            selected: false,
            sequence: 7
          },
          {
            title: "Invite Sales Team / Users",
            identifier: "a_usecase_sales_operation_invite_sale_team",
            answer_type: "text",
            selected: false,
            sequence: 8
          }
        ],
        answers: []
      },

      // Sales => Enablement
      {
        title: "Sales Use Cases",
        questionType: "multiple_choice",
        identifier: "q_usecases_sale_enablement",
        dependedQuestion: '',
        dependedAnswer: 'a_role_sale_sales_enablement',
        questionId: 0,
        positionId: 1,
        inputType: 'checkbox',
        selected: false,
        answerQuestions: [
          {
            title: "Search & Verify",
            identifier: "a_usecase_sales_enablement_search_verify",
            answer_type: "text",
            selected: false,
            sequence: 1
          },
          {
            title: "Intent-based Accounts & Contacts",
            identifier: "a_usecase_sales_enablement_accounts_contacts",
            answer_type: "text",
            selected: false,
            sequence: 2
          },
          {
            title: "Connect CRM and Refresh CRM Data",
            identifier: "a_usecase_sales_enablement_contect_crm_and_refresh_crm_data",
            answer_type: "text",
            selected: false,
            sequence: 3
          },
        ],
        extraQuestions: [
          {
            title: "Enrich Existing Accounts or Contacts",
            identifier: "a_usecase_sales_enablement_enrich_existing_accounts_or_contacts",
            answer_type: "text",
            selected: false,
            sequence: 4
          },
          {
            title: "Build Verified Account Lists",
            identifier: "a_usecase_sales_enablement_build_verified_account_lists",
            answer_type: "text",
            selected: false,
            sequence: 5
          },
          {
            title: "Build Verified Prospect Lists",
            identifier: "a_usecase_sales_enablement_build_verified_prospect_lists",
            answer_type: "text",
            selected: false,
            sequence: 6
          },
          {
            title: "Get Chrome Extension for Prospecting on Web & Social",
            identifier: "a_usecase_sales_enablement_chrome_extension",
            answer_type: "text",
            selected: false,
            sequence: 7
          },
          {
            title: "Invite Sales Team / Users",
            identifier: "a_usecase_sales_enablement_invite_sale_team",
            answer_type: "text",
            selected: false,
            sequence: 8
          }
        ],
        answers: []
      },

      // Sales => Other (generic) (Custom)
      {
        title: "Sales Use Cases",
        questionType: "multiple_choice",
        identifier: "q_usecases_sale_other",
        dependedQuestion: '',
        dependedAnswer: 'a_role_sale_other',
        questionId: 0,
        positionId: 1,
        inputType: 'checkbox',
        selected: false,
        answerQuestions: [
          {
            title: "Search & Verify",
            identifier: "a_usecase_sales_other_search_verify",
            answer_type: "text",
            selected: false,
            sequence: 1
          },
          {
            title: "Intent-based Accounts & Contacts",
            identifier: "a_usecase_sales_other_accounts_contacts",
            answer_type: "text",
            selected: false,
            sequence: 2
          },
          {
            title: "Get Chrome Extension for Prospecting on Web & Social",
            identifier: "a_usecase_sales_other_chorme_extension",
            answer_type: "text",
            selected: false,
            sequence: 3
          }
        ],
        extraQuestions: [
          {
            title: "Build Verified Account Lists",
            identifier: "a_usecase_sales_other_build_verified_account_lists",
            answer_type: "text",
            selected: false,
            sequence: 4
          },
          {
            title: "Build Verified Contact Lists",
            identifier: "a_usecase_sales_other_build_verified_contact_lists",
            answer_type: "text",
            selected: false,
            sequence: 5
          },
          {
            title: "Enrich Existing Lists of Accounts or Contacts",
            identifier: "a_usecase_sales_other_enrich_existing_accounts_or_contacts",
            answer_type: "text",
            selected: false,
            sequence: 6
          },
          {
            title: "Connect CRM and Enrich CRM Data",
            identifier: "a_usecase_sales_other_contect_crm_and_enrich_crm_data",
            answer_type: "text",
            selected: false,
            sequence: 7
          },
          {
            title: "Invite Teammates ",
            identifier: "a_usecase_other_invite_teammates",
            answer_type: "text",
            selected: false,
            sequence: 8
          }
        ],
        answers: []
      }
    ]
  },
  step3: { // Where to start
    questions: [
      {
        title: "Where you want to start?",
        identifier: "q_start_experience",
        questionType: "single_choice",
        dependedQuestion: '',
        dependedAnswer: '',
        positionId: 1,
        selected: false,
        inputType: 'radio',
        answerQuestions: [
          {
            title: "Go To My Dashboard",
            identifier: "a_start_experience_dashboard",
            answer_type: "text",
            selected: false,
            sequence: 1
          },
          {
            title: "Go To Search & Verify",
            identifier: "a_start_experience_serach_verify",
            answer_type: "text",
            selected: false,
            sequence: 2
          },
          {
            title: "Download Chrome Extension",
            identifier: "a_start_experience_chrome_extension",
            answer_type: "text",
            selected: false,
            sequence: 3
          }
        ],
        answers: []
      }
    ]
  }
};
