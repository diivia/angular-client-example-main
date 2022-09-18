import {Search} from "./search.model";

export interface TextKeySearch extends Search {
  code: string | null;
  company: string | null;
  description: string | null;
  networkTypes: string | null;
  documentTypes: string | null;
}
