import { User } from '@app/shared/models';

export interface ILookupState {
  user: User[];
  api_key:string;
  email: string;
  currentUserDetail:any;
  isLoading: boolean
}

/** Initial state for Lookup store. */
export const initialLookupState: ILookupState = {
  isLoading: false,
  user: [],
  api_key: '',
  email: '',
  currentUserDetail:{},
};
