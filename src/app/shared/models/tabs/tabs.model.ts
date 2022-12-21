export class Tab {
    id?: number;
    sequence?: number;
    name: string;
    use_case_widgets?: UseCasesWidget[];
}
export class UseCasesWidget {
  id?:  number;
  dashboard_tab_id?:  number | string;
  application_use_case?: ApplicationUseCases;
  sequence?: number;
  application_use_case_id?: number;
}

export class  ApplicationUseCases {
  id?: number;
  identifier: string;
  title: string;
  name: string;
  description: string;
};
