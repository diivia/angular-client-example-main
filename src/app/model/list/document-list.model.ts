import {Document} from '../document.model'
import {DtoList} from "./dto-list.model";

export interface DocumentList extends DtoList{
  documents: Document[];
}
